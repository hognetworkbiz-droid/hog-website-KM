import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';

function AdminSecurityTab({ appState, showToast, onLogout }) {
  const [username, setUsername] = useState(appState.adminCredentials?.username || '');
  const [password, setPassword] = useState(appState.adminCredentials?.password || '');
  const { updateSettings } = useAppState();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Updates frontend state
    updateSettings({
      adminCredentials: { username, password }
    });

    // CRITICAL: Update local storage so the login page knows the new password immediately
    localStorage.setItem('hog_admin_creds', JSON.stringify({ username, password }));
    
    showToast('Credentials updated! You will be logged out for security.');
    setTimeout(() => onLogout(), 2000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Change Admin Credentials</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-300">New Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-5 py-3 border border-transparent font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 mt-2"
        >
          Update Security
        </button>
      </form>
    </div>
  );
}

export default AdminSecurityTab;
