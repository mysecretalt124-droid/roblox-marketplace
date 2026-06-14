import { useState, useEffect } from 'react';
import AccountCard from '../components/AccountCard';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      setAccounts(data);
      setFilteredAccounts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setLoading(false);
    }
  };

  const handleFilter = (searchTerm, priceRange) => {
    let filtered = accounts;
    
    if (searchTerm) {
      filtered = filtered.filter(account => 
        account.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (priceRange) {
      filtered = filtered.filter(account => 
        account.price >= priceRange.min && account.price <= priceRange.max
      );
    }
    
    setFilteredAccounts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Roblox Account Marketplace</h1>
          <p className="mt-2 text-gray-600">Premium Blox Fruits accounts</p>
          <div className="mt-4">
            <a href="/admin" className="text-blue-600 hover:underline">Admin Panel</a>
          </div>
        </div>
        
        <FilterBar onFilter={handleFilter} />
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredAccounts.map(account => (
              <AccountCard key={account.id} account={account} onUpdate={fetchAccounts} />
            ))}
          </div>
        )}
        
        {filteredAccounts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No accounts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
