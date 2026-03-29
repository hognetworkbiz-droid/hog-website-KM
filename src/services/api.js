import axios from 'axios';

// Point this to your backend server
const API_BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({ baseURL: API_BASE_URL });

export const checkVoucherBalance = (voucherCode) => api.get(`/vouchers/balance/${voucherCode}`);
export const verifyAndGenerateVoucher = (paymentData) => api.post('/vouchers/generate', paymentData);

// Admin endpoints
export const getAdminPayments = (status) => api.get(`/admin/payments${status ? `?status=${status}` : ''}`);
export const approveAdminPayment = (id, planData) => api.post(`/admin/payments/${id}/approve`, planData);
export const rejectAdminPayment = (id) => api.post(`/admin/payments/${id}/reject`);
// ... (keep your other existing api exports) ...

export default api;
