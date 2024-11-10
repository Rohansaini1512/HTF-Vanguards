import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_URL = 'https://api.gemini.com/v1';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

const getGeminiHeaders = (payload) => {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha384', GEMINI_API_SECRET).update(encodedPayload).digest('hex');

  return {
    'Content-Type': 'text/plain',
    'X-GEMINI-APIKEY': GEMINI_API_KEY,
    'X-GEMINI-PAYLOAD': encodedPayload,
    'X-GEMINI-SIGNATURE': signature,
  };
};

const getAccountBalance = async () => {
  const payload = {
    request: '/v1/balances',
    nonce: Date.now(),
  };

  const headers = getGeminiHeaders(payload);

  try {
    const response = await axios.post(`${GEMINI_API_URL}/balances`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
};

const getMarketData = async (symbol) => {
  try {
    const response = await axios.get(`${GEMINI_API_URL}/pubticker/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

export { getAccountBalance, getMarketData };