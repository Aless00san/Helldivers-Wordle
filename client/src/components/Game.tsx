import { useEffect, useState } from 'react';
import '../styles/Game.css';

export default function Game() {
  // Types
  type FeedbackType = 'correct' | 'misplaced' | 'wrong' | 'initial';

  const [currentRow, setCurrentRow] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[][]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [solution, setSolution] = useState<string[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [stratagemCode, setStratagemCode] = useState<string | null>(null);
  const [stratagemId, setStratagemId] = useState<string | null>(null);
  const [stratagemName, setStratagemName] = useState<string | null>(null);
  const [playedToday, setPlayedToday] = useState(false);

  const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  useEffect(() => {
    const fetchDailyStratagem = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/stratagems/daily');
        const data = await res.json();

        const arrowKeyCode = data.code.map((symbol: string) =>
          symbolToArrowKey(symbol)
        );

        setSolution(arrowKeyCode);
        updateStratagem(data);
      } catch (err) {
        console.error('Failed to fetch daily stratagem:', err);
      }
    };

    fetchDailyStratagem();
  }, []);

  // Create game only when solution is loaded
  useEffect(() => {
    if (solution.length > 0 && stratagemId && !currentGameId) {
      const createGame = async () => {
        try {
          const gameRes = await fetch(
            'http://localhost:3000/game/guess/create',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ stratagemId }),
            }
          );
          const game = await gameRes.json();
          setCurrentGameId(game.id);
        } catch (error) {
          console.error('Failed to create game:', error);
        }
      };

      createGame();
    }
  }, [solution, stratagemId, currentGameId]);

  // Initialize game arrays when solution is loaded
  useEffect(() => {
    if (solution.length > 0) {
      let numberOfRows = getNumberOfRows();

      // Create guesses array with dynamic rows, each with solution.length columns
      const initialGuesses = Array.from({ length: numberOfRows }, () =>
        Array.from({ length: solution.length }, () => '')
      );
      setGuesses(initialGuesses);

      // Create feedbacks array with dynamic rows, each with solution.length columns
      const initialFeedbacks = Array.from({ length: numberOfRows }, () =>
        Array.from({ length: solution.length }, () => 'initial' as FeedbackType)
      );
      setFeedbacks(initialFeedbacks);
    }
  }, [solution]);

  //Check if the user has played today
  // Updates the state to true if the user has played today
  // This state is used to skip the daily game if the user has played today
  useEffect(() => {
    const fetchToday = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/stratagems/random');
        const data = await res.json();
        setPlayedToday(data.game !== null);
      } catch (err) {
        console.error('Failed to fetch today game:', err);
      }
    };

    fetchToday();
  }, [solution]);

  // if the user has played today, restart the game
  useEffect(() => {
    if (playedToday) {
      resetGame();
    }
  }, [playedToday]);

  // Map arrow keys to symbols
  const arrowKeyToSymbol = (key: string): string => {
    switch (key) {
      case 'ArrowUp':
        return '🠩';
      case 'ArrowDown':
        return '🠫';
      case 'ArrowLeft':
        return '🠨';
      case 'ArrowRight':
        return '🠪';
      default:
        return '';
    }
  };

  // Map symbols back to key strings
  const symbolToArrowKey = (symbol: string): string => {
    switch (symbol) {
      case '🠩':
        return 'ArrowUp';
      case '🠫':
        return 'ArrowDown';
      case '🠨':
        return 'ArrowLeft';
      case '🠪':
        return 'ArrowRight';
      default:
        return '';
    }
  };

  // Handle keypresses to fill boxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || guesses.length === 0) return;

      if (e.key === 'Enter') {
        submitGuess();
        return;
      }

      if (e.key === 'Backspace') {
        const currentGuess = guesses[currentRow];

        let lastFilledIndex = -1;
        for (let i = currentGuess.length - 1; i >= 0; i--) {
          if (currentGuess[i] !== '') {
            lastFilledIndex = i;
            break;
          }
        }
        if (lastFilledIndex !== -1) {
          const updatedGuesses = [...guesses];
          updatedGuesses[currentRow][lastFilledIndex] = '';
          setGuesses(updatedGuesses);
        }
        return;
      }

      if (!allowedKeys.includes(e.key)) return;

      const currentGuess = guesses[currentRow];
      const firstEmptyIndex = currentGuess.findIndex(val => val === '');
      if (firstEmptyIndex === -1) return;

      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow][firstEmptyIndex] = e.key;
      setGuesses(updatedGuesses);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guesses, currentRow, gameOver]);

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

  const submitGuess = async () => {
    if (gameOver || guesses.length === 0) return;
    if (solution.length === 0) {
      alert('Game is still loading...');
      return;
    }

    const currentGuess = guesses[currentRow];
    if (currentGuess.includes('')) {
      alert(`Please fill all ${solution.length} directions using arrow keys.`);
      return;
    }

    const response = await fetch('http://localhost:3000/game/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guess: currentGuess,
        solution: solution,
      }),
    });

    if (!response.ok) {
      alert('Failed to submit guess');
      return;
    }

    const data = await response.json();

    setFeedbacks(prev => {
      const updated = [...prev];
      updated[currentRow] = data.guesses;
      return updated;
    });

    // Check if guess is fully correct
    // We use this to determine if the game is over
    const isCorrect = data.guesses.every(
      (feedback: FeedbackType) => feedback === 'correct'
    );

    if (isCorrect) {
      setGameOver(true);
      setStatus('Congratulations! You guessed correctly.');
      // Update the game status in the database
      if (!currentGameId) return;
      updateGameStatus(currentGameId, 'WON');
      return;
    }

    if (currentRow >= guesses.length - 1) {
      setGameOver(true);
      setStatus('Game Over! Better luck next time.');
      if (!currentGameId) return;
      updateGameStatus(currentGameId, 'LOST');
      return;
    }

    setCurrentRow(prev => prev + 1);
  };

  const updateGameStatus = async (gameId: string, status: string) => {
    const response = await fetch('http://localhost:3000/game/guess/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId,
        status,
      }),
    });

    if (!response.ok) {
      return;
    }
  };

  //Rows number is based on solution length
  // 4 arrows was TOO easy with 5 rows
  // 6 arrows was TOO hard with 5 rows
  const getNumberOfRows = () => {
    if (solution.length === 4) return 3;
    else if (solution.length === 5) return 4;
    else if (solution.length === 6) return 5;
    else return 5; // Default fallback
  };

  const fetchRandomStratagem = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/stratagems/random');
      const data = await res.json();

      const arrowKeyCode = data.code.map((symbol: string) =>
        symbolToArrowKey(symbol)
      );

      setSolution(arrowKeyCode);
      updateStratagem(data);
    } catch (err) {
      console.error('Failed to fetch random stratagem:', err);
    }
  };

  const resetGame = () => {
    setCurrentRow(0);

    if (solution.length > 0) {
      let numberOfRows = getNumberOfRows();

      // Reset with proper dimensions based on solution
      const initialGuesses = Array.from({ length: numberOfRows }, () =>
        Array.from({ length: solution.length }, () => '')
      );
      setGuesses(initialGuesses);

      const initialFeedbacks = Array.from({ length: numberOfRows }, () =>
        Array.from({ length: solution.length }, () => 'initial' as FeedbackType)
      );
      setFeedbacks(initialFeedbacks);
    }

    setStatus(null);
    setGameOver(false);
    fetchRandomStratagem();
  };

  function updateStratagem(data: any) {
    setStratagemId(data.id);
    setStratagemName(data.name);
    setStratagemCode(data.code);
  }

  if (solution.length === 0 || guesses.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='game-container'>
        {!status &&
          guesses.map((_, i) => (
            <div
              key={i}
              className='box-row'
            >
              {guesses[i]?.map((value, index) => (
                <input
                  key={index}
                  type='text'
                  className='game-box input-box'
                  value={arrowKeyToSymbol(value)}
                  readOnly
                  style={{
                    backgroundColor: getColorForFeedback(
                      feedbacks[i]?.[index] || 'initial'
                    ),
                  }}
                />
              ))}
            </div>
          ))}

        <div className='field mb-6 mobile-controls'>
          <div className='control'>
            <button
              onClick={submitGuess}
              className='button is-primary submit-button'
              disabled={gameOver}
            >
              Submit Guess
            </button>
            <button
              onClick={resetGame}
              className='button is-danger submit-button'
            >
              Reset Game
            </button>
          </div>
        </div>

        {status && (
          <div className='status-message'>
            <div>{status}</div>
            <div className='stats'>
              <div>The stratagem was {stratagemName}</div>
              <div>
                The solution was
                <span className='arrowbox is-inline-block py-1 px-2 ml-4'>
                  🠫 🠫 🠩 🠪
                </span>
              </div>
            </div>
          </div>
        )}
        {status && (
          <div>
            <button
              className='newgame_button button'
              onClick={resetGame}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </>
  );
}
