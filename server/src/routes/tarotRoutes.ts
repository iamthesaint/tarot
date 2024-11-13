// server/src/routes/tarotRoutes.ts

import express from 'express';
import TarotCard from '../models/TarotCard';

const router = express.Router();

// route to fetch all tarot cards
router.get('/cards', async (_req, res) => {
  try {
    const cards = await TarotCard.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tarot cards' });
  }
});

export default router;
