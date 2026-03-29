import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AdminVouchersTab({ appState, showToast }) {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Grab Vouchers from the OC300 (Via Backend)
  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/vouchers');
      setVouchers(response.data || []);
      showToast('Vouchers synced directly from OC300!');
    } catch (error) {
      showToast('Backend Error: Could not sync with OC300.');
    }
    setLoading(false);
  };

  // Delete Voucher from OC300
  const handleDelete = async (voucherId) => {
    if(window.confirm('Are you sure you want to delete this voucher permanently?')) {
      try {
        await api.delete(`/admin/vouchers/${voucherId}`);
        setVouchers(vouchers.filter(v => v.id !== voucherId));
        showToast('Voucher deleted from OC300!');
      } catch (error) {
        showToast('Failed to delete voucher.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Manage OC300 Vouchers</h2>
        <button onClick={fetchVouchers} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          {loading ? 'Syncing...' : 'Sync from OC300'}
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        {vouchers.length === 0 ? (
          <p className="text-gray-400">No vouchers grabbed yet. Click Sync.</p>
        ) : (
          <div className="space-y-4">
             {vouchers.map((voucher, index) => (
              <div key={index} className="p-4 bg-gray-900 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-blue-400">Code: {voucher.code}</p>
                  <p className="text-sm text-gray-400">Plan: {voucher.dataLimit} | Status: {voucher.status}</p>
                </div>
                <button onClick={() => handleDelete(voucher.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminVouchersTab;
