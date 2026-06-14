// Sample data - replace with actual API call
const accounts = [
    {
        id: 1,
        username: "CoolPlayer123",
        level: 2450,
        fruits: ["Dragon", "Leopard"],
        belis: 50000000,
        price: 150,
        status: "available"
    },
    {
        id: 2,
        username: "ProGamer456",
        level: 1800,
        fruits: ["Spirit", "Control"],
        belis: 30000000,
        price: 100,
        status: "available"
    }
];

function renderAccounts() {
    const container = document.getElementById('accounts-container');
    container.innerHTML = '';
    
    accounts.forEach(account => {
        const statusColor = account.status === 'available' ? 'bg-green-100 text-green-800' : 
                           account.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : 
                           'bg-red-100 text-red-800';
        
        const accountCard = `
            <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${account.username}</h3>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColor}">${account.status}</span>
                </div>
                <div class="space-y-2 mb-4">
                    <p class="text-gray-600">Level: ${account.level}</p>
                    <p class="text-gray-600">Blox Fruits: ${account.fruits.join(', ')}</p>
                    <p class="text-gray-600">Belis: ${account.belis.toLocaleString()}</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-blue-600">$${account.price}</span>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View Details</button>
                </div>
            </div>
        `;
        
        container.innerHTML += accountCard;
    });
}

document.addEventListener('DOMContentLoaded', renderAccounts);
