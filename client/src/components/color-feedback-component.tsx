import React, { useState, useEffect } from 'react';
import '../styles/App.css';

// Types
type FeedbackType = 'correct' | 'misplaced' | 'wrong' | 'initial';
type FeedbackArray = [FeedbackType, FeedbackType, FeedbackType];

const ColorFeedbackComponent: React.FC = () => {
  const [userGuess, setUserGuess] = useState<string[]>(['', '', '']);
  const [feedback, setFeedback] = useState<FeedbackArray>(['initial', 'initial', 'initial']);
  const [status, setStatus] = useState<string | null>(null);

  const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  // Map arrow keys to symbols
  const arrowKeyToSymbol = (key: string): string => {
    switch (key) {
      case 'ArrowUp':
        return '↑';
      case 'ArrowDown':
        return '↓';
      case 'ArrowLeft':
        return '←';
      case 'ArrowRight':
        return '→';
      default:
        return '';
    }
  };

  // Map symbols back to key strings if needed (e.g., for reset or user display)
  const symbolToArrowKey = (symbol: string): string => {
    switch (symbol) {
      case '↑':
        return 'ArrowUp';
      case '↓':
        return 'ArrowDown';
      case '←':
        return 'ArrowLeft';
      case '→':
        return 'ArrowRight';
      default:
        return '';
    }
  };

  // Handle keypresses to fill boxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!allowedKeys.includes(e.key)) return;

      const firstEmptyIndex = userGuess.findIndex(val => val === '');
      if (firstEmptyIndex === -1) return;

      const updatedGuess = [...userGuess];
      updatedGuess[firstEmptyIndex] = e.key;
      setUserGuess(updatedGuess);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userGuess]);

  const getColorForFeedback = (feedbackType: FeedbackType): string => {
    switch (feedbackType) {
      case 'correct':
        return 'var(--correct-color)';
      case 'misplaced':
        return 'var(--misplaced-color)';
      case 'wrong':
        return 'var(--dark-gray)';
      case 'initial':
        return 'var(--initial-color)';
      default:
        return '#6b7280';
    }
  };

  // Submit guess to backend
  const submitGuess = async () => {
    if (userGuess.includes('')) {
      alert('Please fill all 3 directions using arrow keys.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/game/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guess: userGuess,
          solution: ['ArrowUp', 'ArrowRight', 'ArrowDown'], // Replace with real solution if needed
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const validatedFeedback = data.guesses as FeedbackArray;

      setFeedback(validatedFeedback);
      setStatus(data.status);
    } catch (error) {
      console.error('Error submitting guess:', error);
    }
  };

  const resetGame = () => {
    setUserGuess(['', '', '']);
    setFeedback(['initial', 'initial', 'initial']);
    setStatus(null);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Arrow Key Guess Game</h2>

      <div className="flex gap-4 mb-6">
        {userGuess.map((value, index) => (
          <input
            key={index}
            type="text"
            value={arrowKeyToSymbol(value)}
            readOnly
            className="w-20 h-20 rounded-lg border-2 border-gray-300 text-center font-bold"
            style={{
              backgroundColor: getColorForFeedback(feedback[index]),
              color: feedback[index] === 'initial' ? '#6b7280' : 'white',
              fontSize: '2rem',
              textTransform: 'none',
            }}
            placeholder="?"
          />
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={submitGuess}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Guess
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold">Your Guess:</h4>
        <code className="text-sm">
          [{userGuess.map(k => `"${arrowKeyToSymbol(k)}"`).join(', ')}]
        </code>
        {status && (
          <p className="mt-2 font-semibold">
            Status: <span className="text-green-600">{status}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ColorFeedbackComponent;
