const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

// OC300 Credentials (In production, use environment variables)
const OMADA_URL = 'https://192.168.1.253:443';
const OMADA_USER = 'hog_api_user'; // Replace with your Omada API username
const OMADA_PASS = 'Trustnoone@komu26'; // Your Omada password
const OMADA_SITE = 'Default'; // Replace with your actual Omada Site ID if different

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Helper function to login to OC300 and get Token
async function getOmadaToken() {
    const loginRes = await axios.post(`${OMADA_URL}/api/v2/login`, {
        username: OMADA_USER,
        password: OMADA_PASS
    }, { httpsAgent });
    
    return {
        token: loginRes.data.result.token,
        omadacId: loginRes.data.result.omadacId,
        cookie: loginRes.headers['set-cookie']
    };
}

// 1. ENDPOINT: Check Voucher Balance
app.get('/api/vouchers/balance/:code', async (req, res) => {
    try {
        const { token, omadacId, cookie } = await getOmadaToken();
        const voucherCode = req.params.code;

        const response = await axios.get(`${OMADA_URL}/${omadacId}/api/v2/sites/${OMADA_SITE}/hotspot/vouchers?code=${voucherCode}`, {
            headers: { 'Csrf-Token': token, 'Cookie': cookie },
            httpsAgent
        });

        const vouchers = response.data.result.data;
        if (!vouchers || vouchers.length === 0) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        const myVoucher = vouchers[0];
        const totalGB = (myVoucher.byteQuota / 1024).toFixed(2);
        const usedMB = myVoucher.trafficDown + myVoucher.trafficUp;
        const remainingGB = ((myVoucher.byteQuota - usedMB) / 1024).toFixed(2);

        res.json({ totalGB, remainingGB, status: myVoucher.status === 1 ? 'Active' : 'Expired/Unused' });
    } catch (error) {
        res.status(500).json({ message: 'Error communicating with OC300' });
    }
});

// 2. ENDPOINT: Generate Voucher (For Automated Payments)
app.post('/api/vouchers/generate', async (req, res) => {
    try {
        const { planLimitMB, durationMinutes } = req.body;
        const { token, omadacId, cookie } = await getOmadaToken();

        const payload = {
            amount: 1, codeLength: 8, maxUsers: 1,
            duration: durationMinutes, byteQuota: planLimitMB,
            upRateLimit: 0, downRateLimit: 0
        };

        const response = await axios.post(`${OMADA_URL}/${omadacId}/api/v2/sites/${OMADA_SITE}/hotspot/vouchers`, payload, {
            headers: { 'Csrf-Token': token, 'Cookie': cookie },
            httpsAgent
        });

        res.json({ success: true, voucherCode: response.data.result.data[0].code });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate voucher on OC300' });
    }
});

// 3. ENDPOINT: Manual Payment Approval (Admin)
app.post('/api/admin/payments/:id/approve', async (req, res) => {
    try {
        // Here you would typically look up the payment in your database
        // For now, we simulate grabbing the requested plan details from the request body
        const { planLimitMB, durationMinutes } = req.body; 
        
        const { token, omadacId, cookie } = await getOmadaToken();
        const payload = {
            amount: 1, codeLength: 8, maxUsers: 1,
            duration: durationMinutes, byteQuota: planLimitMB,
            upRateLimit: 0, downRateLimit: 0
        };

        const response = await axios.post(`${OMADA_URL}/${omadacId}/api/v2/sites/${OMADA_SITE}/hotspot/vouchers`, payload, {
            headers: { 'Csrf-Token': token, 'Cookie': cookie },
            httpsAgent
        });

        res.json({ success: true, voucherCode: response.data.result.data[0].code });
    } catch (error) {
        res.status(500).json({ message: 'Failed to approve payment and generate voucher' });
    }
});

app.listen(5000, () => console.log('HOG Network Backend running on port 5000'));
