import React, { useState } from 'react';
import { approveAdminPayment } from '../services/api';

function AdminPaymentTab({ appState, showToast }) {
  const [payments, setPayments] = useState(appState.pendingPayments || []);
  const [loadingId, setLoadingId] = useState(null);

  const handleApprove = async (payment, index) => {
    setLoadingId(index);
    try {
      // Send plan data so the backend knows what kind of voucher to generate
      const planData = { planLimitMB: 20480, durationMinutes: 43200 }; // Example: 20GB, 30 days. You should map this to the actual plan selected.
      
      const response = await approveAdminPayment(payment.id, planData);
      
      showToast(`Success! Generated OC300 Voucher: ${response.data.voucherCode}`);
      
      // Remove from pending list
      setPayments(payments.filter((_, i) => i !== index));
    } catch (error) {
      showToast('Error approving payment or connecting to OC300.');
    }
    setLoadingId(null);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Pending Manual Payments</h2>
      {payments.length === 0 ? <p className="text-gray-400">No pending payments.</p> : (
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <div key={index} className="p-4 bg-gray-900 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-white">{payment.customerName} - ₦{payment.amount}</p>
                <p className="text-sm text-gray-400">Plan: {payment.planName}</p>
              </div>
              <button 
                onClick={() => handleApprove(payment, index)} 
                disabled={loadingId === index}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loadingId === index ? 'Generating...' : 'Approve & Generate Voucher'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPaymentTab;
