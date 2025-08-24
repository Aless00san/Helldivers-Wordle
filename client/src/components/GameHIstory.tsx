import { useState, useEffect } from 'react';
import '../styles/App.css';
import GameHistoryEntry from './GameHistoryEntry';
import type { Game } from '../types';

function GameHistory({ userId }: { userId: number }) {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      if (!hasMore) return; // stop if no more pages

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/game/history?userId=${userId}&page=${page}&pageSize=5`
        );

        if (!response.ok) {
          console.error('Failed to fetch games:', response.statusText);
          setLoading(false);
          return;
        }

        const data = await response.json();

        // Prevent duplicates
        setGames(prevGames => {
          const newGames = data.games.filter(
            (g: { id: string }) => !prevGames.some(prev => prev.id === g.id)
          );
          return [...prevGames, ...newGames];
        });

        if (data.games.length < 10) setHasMore(false); // no more pages
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchGames();
  }, [page]);

  return (
    <div className='max-w-xl mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Game History</h2>
      {games.map(game => (
        <GameHistoryEntry
          key={game.id}
          game={game}
        />
      ))}
      {loading && <p>Loading...</p>}
      {!loading && hasMore && (
        <button
          onClick={() => setPage(prev => prev + 1)}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Load More
        </button>
      )}
      {!hasMore && (
        <p className='mt-4 notification is-warning '>No more games</p>
      )}
    </div>
  );
}

export default GameHistory;
