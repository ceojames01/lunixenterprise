const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const path = require('path');

let client = null;
let currentQR = null;
let isConnected = false;

const AUTH_FOLDER = path.join(__dirname, '../../.wwebjs_auth');

const initWhatsApp = async () => {
  try {
    if (client) {
      console.log('Destroying existing WhatsApp client...');
      try { await client.destroy(); } catch (e) {}
      client = null;
    }

    client = new Client({
      authStrategy: new LocalAuth({ dataPath: AUTH_FOLDER }),
      webVersionCache: { type: 'none' },
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      }
    });

    client.on('qr', async (qr) => {
      console.log('WhatsApp QR generated.');
      try {
        currentQR = await QRCode.toDataURL(qr);
        isConnected = false;
      } catch (err) {
        console.error("Error generating QR code data URL", err);
      }
    });

    client.on('ready', () => {
      console.log('WhatsApp connected successfully!');
      isConnected = true;
      currentQR = null;
    });

    client.on('authenticated', () => {
      console.log('WhatsApp authenticated successfully!');
      isConnected = true;
    });

    client.on('auth_failure', msg => {
      console.error('WhatsApp authentication failed:', msg);
      isConnected = false;
      currentQR = null;
    });

    client.on('disconnected', (reason) => {
      console.log('WhatsApp client disconnected:', reason);
      isConnected = false;
      currentQR = null;
      setTimeout(() => {
        initWhatsApp();
      }, 2000);
    });

    await client.initialize();

  } catch (error) {
    console.error("Failed to initialize WhatsApp service:", error);
  }
};

const getStatus = () => {
  return {
    connected: isConnected,
    qr: currentQR
  };
};

const logout = async () => {
  if (client) {
    try {
      console.log('Logging out WhatsApp client...');
      await client.logout();
    } catch (err) {
      console.error("Error logging out:", err);
      try {
        await client.destroy();
      } catch (e) {}
    }
  }
  isConnected = false;
  currentQR = null;
};

const sendMessage = async (phone, text, mediaBase64 = null) => {
  if (!isConnected || !client) {
    console.log("WhatsApp is not connected. Message not sent.");
    return;
  }

  try {
    let formattedPhone = phone.replace(/\D/g, ''); 
    
    if (formattedPhone.startsWith('0') && formattedPhone.length === 10) {
      formattedPhone = '254' + formattedPhone.slice(1);
    } else if (formattedPhone.length === 9) {
      formattedPhone = '254' + formattedPhone;
    }

    const jid = `${formattedPhone}@c.us`;
    
    if (mediaBase64) {
      const media = new MessageMedia('image/png', mediaBase64, 'ticket-qr.png');
      await client.sendMessage(jid, media, { caption: text });
    } else {
      await client.sendMessage(jid, text);
    }
    
    console.log(`Successfully sent WhatsApp message to ${formattedPhone}`);
  } catch (error) {
    const fs = require('fs');
    fs.appendFileSync('wa_error.log', new Date().toISOString() + ' - ' + error.stack + '\n');
    console.error(`Failed to send WhatsApp message to ${phone}:`, error);
  }
};

initWhatsApp();

module.exports = {
  getStatus,
  logout,
  sendMessage,
  initWhatsApp
};
