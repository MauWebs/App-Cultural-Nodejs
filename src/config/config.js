import dotenv from 'dotenv';

dotenv.config();

// App
export const PORT = 3000;
export const HOST = `http://localhost:`;

// PayPal
export const PAYPAL_API = `https://api-m.sandbox.paypal.com`;
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
export { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY };
