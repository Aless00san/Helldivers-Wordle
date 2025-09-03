import { useState, useEffect } from 'react';
import '../styles/App.css';
import '../styles/GameHistory.css';
import type { Game } from '../types';

function GameHistoryEntry({ game }: { game: Game }) {
  const [stratagemName, setStratagemName] = useState<string>('Loading...');

  // Fetch stratagem name by ID
  useEffect(() => {
    if (!game.stratagemId) return; // skip fetch if ID is not ready

    const fetchStratagemName = async () => {
      try {
        const response = await fetch(
          `https://gg.helldive.site/api/stratagems/${game.stratagemId}`
        );
        if (!response.ok) {
          setStratagemName('Unknown');
          return;
        }
        const data = await response.json();
        setStratagemName(data.name);
      } catch (err) {
        console.error(err);
        setStratagemName('Error');
      }
    };

    fetchStratagemName();
  }, [game.stratagemId]);

  const dateMapper = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options).split('T')[0];
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'WON':
        return 'tag is-success';
      case 'LOST':
        return 'tag is-danger';
      case 'ABANDONED':
        return 'tag is-custom-warning';
      default:
        return 'tag is-light';
    }
  };

  return (
    <div className='game-history-entry'>
      <div className='mr-4'>
        <p>
          {game.status !== 'IN_PROGRESS' && (
            <strong>Stratagem: {stratagemName}</strong>
          )}
        </p>
      </div>
      <div className='mr-4'>
        <p>
          <strong>Date:</strong> {dateMapper(game.createdAt)}
        </p>
      </div>
      <div className='mr-4'>
        <span className={getStatusClass(game.status)}>{game.status}</span>
      </div>
    </div>
  );
}

export default GameHistoryEntry;
