import express from 'express';
import { recordRequests } from 'replayit';

const app = express();
app.use(express.json());

// ✅ Zero config - just add this line!
app.use(recordRequests());

// Your normal routes
app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] });
});

app.post('/api/users', (req, res) => {
  res.json({ created: req.body });
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📼 Recording all requests to requests.json');
});