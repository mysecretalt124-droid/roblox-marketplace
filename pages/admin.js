import { useState, useEffect } from 'react';

export default function Admin() {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    level: '',
    fruits: '',
    belis: '',
    price: '',
    description: ''
  });
  
  useEffect(() => {
    fetchAccounts();
  }, []);
  
  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/add-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          fruits: formData.fruits.split(',').map(fruit => fruit.trim()),
          level: parseInt(formData.level),
          belis: parseInt(formData.belis),
          price: parseFloat(formData.price)
        }),
      });
      
      if (response.ok) {
        setFormData({
          username: '',
          level: '',
          fruits: '',
          belis: '',
          price: '',
          description: ''
        });
        fetchAccounts();
      }
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };
  
  const updateAccountStatus = async (id, status) => {
    try {
      await fetch('/api/update-account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
      
      fetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };
  
  const deleteAccount = async (id) => {
    if (confirm('Are you sure you want to delete this account?')) {
      try {
        await fetch(`/api/delete-account?id=\${id}`, {
          method: 'DELETE',
        });
        
        fetchAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-600">Manage your Roblox account listings</p>
          <div className="mt-4">
            <a href="/" className="text-blue-600 hover:underline">Back to Marketplace</a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blox Fruits (comma-separated)</label>
                <input
                  type="text"
                  name="fruits"
                  value={formData.fruits}
                  onChange={handleChange}
                  placeholder="Dragon, Leopard, Spirit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Belis</label>
                <input
                  type="number"
                  name="belis"
                  value={formData.belis}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (\$)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:
