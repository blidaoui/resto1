// frontend/pages/api/chatgpt.js

import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/backend/chatgpt', req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
