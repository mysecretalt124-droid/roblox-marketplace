export default function AccountModal({ account, onClose, onUpdate }) {
  const [status, setStatus] = useState(account.status);
  
  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    
    try {
      await fetch('/api/update-account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: account.id, status: newStatus }),
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error updating account status:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{account.username}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === 'available' ? 'bg-green-100 text-green-800' :
                status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Account Details</h3>
                <ul className="space-y-1">
                  <li className="text-gray-600">Level: {account.level}</li>
                  <li className="text-gray-600">Belis: {account.belis}</li>
                  <li className="text-gray-600">Price: ${account.price}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Blox Fruits</h3>
                <ul className="space-y-1">
                  {account.fruits.map((fruit, index) => (
                    <li key={index} className="text-gray-600">{fruit}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {account.description && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{account.description}</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {status !== 'available' && (
              <button
                onClick={() => handleStatusChange('available')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Mark as Available
              </button>
            )}
            
            {status !== 'reserved' && (
              <button
                onClick={() => handleStatusChange('reserved')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Mark as Reserved
              </button>
            )}
            
            {status !== 'sold' && (
              <button
                onClick={() => handleStatusChange('sold')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Mark as Sold
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
