import kv from '../../lib/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const accounts = await kv.get('accounts');
      res.status(200).json(accounts || []);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
  } else if (req.method === 'POST') {
    try {
      const newAccount = req.body;
      const accounts = await kv.get('accounts') || [];
      newAccount.id = Date.now().toString();
      newAccount.status = 'available';
      newAccount.createdAt = new Date().toISOString();
      
      accounts.push(newAccount);
      await kv.set('accounts', accounts);
      
      res.status(201).json(newAccount);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add account' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
