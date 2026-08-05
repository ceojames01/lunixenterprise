const axios = require('axios');
const { Order } = require('../models/Order');

// Sandbox Environment URLs
const OAUTH_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
const STK_PUSH_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

// Middleware to generate OAuth Token
const generateToken = async (req, res, next) => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      // If not configured, we just proceed without a token (it will fail later if we actually try to hit the API, 
      // but allows us to mock if needed)
      req.mpesaToken = null;
      return next();
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const response = await axios.get(OAUTH_URL, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    req.mpesaToken = response.data.access_token;
    next();
  } catch (error) {
    console.error('M-PESA Token Generation Error:', error?.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to authenticate with M-PESA' });
  }
};

// Function to trigger STK Push
const initiateSTKPush = async (req, res) => {
  try {
    const { orderId, phone, amount } = req.body;
    
    const shortCode = process.env.MPESA_SHORTCODE || '174379'; // Default Sandbox Till
    const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; 
    const callbackUrl = process.env.MPESA_CALLBACK_URL || 'https://example.com/api/mpesa/callback';

    // Format phone number to 254...
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = '254' + formattedPhone;
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    if (!req.mpesaToken) {
      // Mock mode if no credentials provided
      console.log(`[MOCK] STK Push initiated for Order: ${orderId}, Phone: ${formattedPhone}, Amount: ${amount}`);
      return res.status(200).json({
        success: true,
        message: 'Mock STK Push initiated successfully. Please complete payment.',
        data: { CheckoutRequestID: `ws_CO_${Date.now()}` }
      });
    }

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount), // Safaricom expects integers
      PartyA: formattedPhone,
      PartyB: shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: `Order ${orderId}`,
      TransactionDesc: 'Ticket Purchase'
    };

    const response = await axios.post(STK_PUSH_URL, payload, {
      headers: {
        Authorization: `Bearer ${req.mpesaToken}`
      }
    });

    res.status(200).json({
      success: true,
      message: 'STK Push initiated successfully. Please enter your M-PESA PIN.',
      data: response.data
    });

  } catch (error) {
    console.error('STK Push Error:', error?.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to initiate STK Push', details: error?.response?.data });
  }
};

// Webhook Callback from Safaricom
const mpesaCallback = async (req, res) => {
  console.log('M-PESA Callback received:', JSON.stringify(req.body, null, 2));

  try {
    const callbackData = req.body?.Body?.stkCallback;
    
    if (!callbackData) {
      return res.status(400).json({ success: false, message: 'Invalid callback payload' });
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData;

    // We can use the CheckoutRequestID to find the corresponding order if we saved it in DB.
    // For this implementation, we will assume we update order based on phone number and amount, 
    // or by storing the CheckoutRequestID when we initiate the push.

    if (ResultCode === 0) {
      // Payment Successful
      console.log(`Payment successful for CheckoutRequestID: ${CheckoutRequestID}`);
      // Find the pending order and mark it as COMPLETED
      // Note: A robust implementation would store the CheckoutRequestID in the Order model.
      const amountPaidItem = CallbackMetadata?.Item.find(item => item.Name === 'Amount');
      const mpesaReceiptItem = CallbackMetadata?.Item.find(item => item.Name === 'MpesaReceiptNumber');
      
      const receiptNumber = mpesaReceiptItem?.Value;
      
      // We are just simulating success here. You would do:
      // await Order.findOneAndUpdate({ checkoutRequestId: CheckoutRequestID }, { status: 'COMPLETED', paymentDetails: { receiptNumber } });
    } else {
      // Payment Failed or Cancelled
      console.log(`Payment failed for CheckoutRequestID: ${CheckoutRequestID}. Reason: ${ResultDesc}`);
      // await Order.findOneAndUpdate({ checkoutRequestId: CheckoutRequestID }, { status: 'FAILED' });
    }

    // Safaricom expects a success response so they don't retry
    res.status(200).json({ success: true, message: 'Callback received and processed' });
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  generateToken,
  initiateSTKPush,
  mpesaCallback
};
