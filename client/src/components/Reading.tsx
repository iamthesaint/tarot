// client/src/components/Reading.tsx

import React, { useState, useEffect } from 'react';
import { fetchTarotCards } from '../utils/api';

const TarotReading = () => {
    const [cards, setCards] = useState<TarotCard[]>([]);
    const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
}