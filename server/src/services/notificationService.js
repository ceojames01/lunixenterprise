const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

// Configure Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. yourmail@gmail.com
    pass: process.env.EMAIL_PASS, // e.g. App password
  }
});

const whatsappService = require('./whatsappService');

/**
 * Send an email with ticket details and QR code.
 */
const sendTicketEmail = async (email, order, event) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Skipping email send: EMAIL_USER or EMAIL_PASS not set in .env');
    return;
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(order.qrCodeData);
    const base64Data = qrCodeDataURL.split("base64,")[1];
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Ticket for ${event.title}</h2>
        <p>Hi,</p>
        <p>Thank you for your purchase! Below are your ticket details.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Ticket Code:</strong> ${order.ticketCode}</p>
          <p><strong>Date:</strong> ${event.dateRange || 'TBA'}</p>
          <p><strong>Location:</strong> ${event.location || 'TBA'}</p>
        </div>
        <p>Please present the QR code below at the entrance.</p>
        <img src="cid:qrcode" alt="Ticket QR Code" style="width: 250px; height: 250px;" />
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Ticket for ${event.title}`,
      html: htmlContent,
      attachments: [
        {
          filename: 'qrcode.png',
          content: base64Data,
          encoding: 'base64',
          cid: 'qrcode'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending ticket email:', error);
  }
};

/**
 * Send a WhatsApp message via Baileys with ticket details.
 */
const sendTicketWhatsApp = async (phone, order, event) => {
  try {
    const message = `*Ticket for ${event.title}*\n\nThank you for your purchase!\n\n*Ticket Code:* ${order.ticketCode}\n*Date:* ${event.dateRange || 'TBA'}\n*Location:* ${event.location || 'TBA'}\n\nPlease keep this code handy to be scanned at the entrance.`;
    
    // Generate QR Code data URL and extract base64 part
    const qrCodeDataURL = await QRCode.toDataURL(order.ticketCode);
    const base64Data = qrCodeDataURL.split("base64,")[1];

    await whatsappService.sendMessage(phone, message, base64Data);
  } catch (error) {
    console.error('Error sending ticket via WhatsApp:', error);
  }
};

/**
 * Notify admin of a pending cash order.
 */
const notifyAdminCashOrder = async (scannerName, order, event) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #DA1A21;">Pending Cash Order Alert</h2>
        <p><strong>Scanner:</strong> ${scannerName}</p>
        <p>A new cash order has been placed and is currently pending approval.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Ticket Code:</strong> ${order.ticketCode || order._id}</p>
          <p><strong>Amount:</strong> KES ${order.totalAmount}</p>
        </div>
        <p>Please log in to the admin dashboard to complete this transaction.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Lunix Admin Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sending to the admin email itself
      subject: `Pending Cash Order - ${scannerName}`,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Error sending admin notification email:', error);
  }
};

module.exports = {
  sendTicketEmail,
  sendTicketWhatsApp,
  notifyAdminCashOrder
};
