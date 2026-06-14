import { useState } from 'react';
import AccountModal from './AccountModal';

export default function AccountCard({ account, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    reserved: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800'
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{account.username}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[account.status]}`}>
              {account.status}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">Level: {account.level}</p>
            <p className="text-gray-600">Blox Fruits: {account.fruits.join(', ')}</p>
            <p className="text-gray-600">Belis: {account.belis}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">${account.price}</span>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      
      {showModal && (
        <AccountModal 
          account={account} 
          onClose={() => setShowModal(false)} 
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
