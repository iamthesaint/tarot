
// client/src/utils/api.ts
export async function fetchTarotCards() {
    const response = await fetch('http://localhost:3000/api/cards');
    if (!response.ok) {
      throw new Error('Failed to fetch tarot cards');
    }
    return response.json();
  }

