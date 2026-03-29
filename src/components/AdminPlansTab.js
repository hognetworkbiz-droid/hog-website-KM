import React, { useState } from 'react';
import DataPlansGrid from './DataPlansGrid';

function AdminPlansTab({ appState, showToast }) {
  const [plans, setPlans] = useState(appState.dataPlans || []);
  const [formData, setFormData] = useState({ data: '', price: '', originalPrice: '', validity: '', devices: '1', upload: '5', download: '8', showSpeed: false });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Add/Edit Data Plan</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="data" placeholder="Data (e.g., 20GB)" value={formData.data} onChange={handleInputChange} className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white" />
          <div className="flex gap-2">
            <input type="number" name="price" placeholder="Current Price" value={formData.price} onChange={handleInputChange} className="w-1/2 px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white" />
            <input type="number" name="originalPrice" placeholder="Old Price (Discount)" value={formData.originalPrice} onChange={handleInputChange} className="w-1/2 px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white" />
          </div>
          {/* Speed settings */}
          <input type="number" name="download" placeholder="Download (Mbps)" value={formData.download} onChange={handleInputChange} className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white" />
          <input type="number" name="upload" placeholder="Upload (Mbps)" value={formData.upload} onChange={handleInputChange} className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white" />
          
          <label className="col-span-full flex items-center space-x-3 text-gray-300 p-2 bg-gray-900 rounded-lg cursor-pointer">
            <input type="checkbox" name="showSpeed" checked={formData.showSpeed} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="font-medium">Show Upload/Download Speeds to Users</span>
          </label>
        </form>
      </div>
      
      {/* Live Preview */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-800">
        <h2 className="text-xl font-bold mb-6 text-white text-center">Live Website Preview</h2>
        <DataPlansGrid plans={[...plans, formData]} onBuyPlan={() => showToast("Preview Mode")} />
      </div>
    </div>
  );
}

export default AdminPlansTab;
