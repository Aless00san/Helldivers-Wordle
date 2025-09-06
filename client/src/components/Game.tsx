import { useEffect, useState, type JSX } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from './Arrows';
import '../styles/Game.css';
import CheckMark from './icons/CheckMark';
import Undo from './icons/Undo';

export default function Game({ isLoggedIn }: { isLoggedIn: boolean | null }) {
  // Types
  type FeedbackType = 'correct' | 'misplaced' | 'wrong' | 'initial';
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[][]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [solution, setSolution] = useState<string[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [stratagemId, setStratagemId] = useState<string | null>(null);
  const [stratagemName, setStratagemName] = useState<string | null>(null);

  const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  const fetchStratagem = async () => {
    if (isLoggedIn) {
      try {
        const playedToday = await fetch('https://gg.helldive.site/game/today', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await playedToday.json();
        console.debug(data);
        if (
          (data.game !== null &&
            data.game != undefined &&
            data.game.status === 'IN_PROGRESS') ||
          data.message === 'No game found for today.'
        ) {
          console.debug('Fetching daily stratagem');
          const res = await fetch(
            'https://gg.helldive.site/api/stratagems/daily'
          );
          const game = await res.json();

          const arrowKeyCode = game.code.map((symbol: string) =>
            symbolToArrowKey(symbol)
          );

          // setIsDaily(true);
          setSolution(arrowKeyCode);
          updateStratagem(game);
        } else {
          console.log('Fetch random because of no daily game');
          await fetchRandomStratagem();
        }
      } catch (err) {
        console.error('Failed to fetch daily stratagem:', err);
      }
    } else {
      await fetchRandomStratagem();
    }
  };

  useEffect(() => {
    if (isLoggedIn === null) return;
    fetchStratagem();
  }, [isLoggedIn]);

  // Create game only when solution is loaded
  useEffect(() => {
    if (solution.length > 0 && stratagemId && !currentGameId) {
      const createGame = async () => {
        try {
          const gameRes = await fetch(
            'https://gg.helldive.site/game/guess/create',
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

  const arrowKeyToComponent = (key: string): JSX.Element | null => {
    switch (key) {
      case 'ArrowUp':
        return (
          <ArrowUp
            width={24}
            height={24}
          />
        );
      case 'ArrowDown':
        return (
          <ArrowDown
            width={24}
            height={24}
          />
        );
      case 'ArrowLeft':
        return (
          <ArrowLeft
            width={24}
            height={24}
          />
        );
      case 'ArrowRight':
        return (
          <ArrowRight
            width={24}
            height={24}
          />
        );
      default:
        return null;
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

    const response = await fetch('https://gg.helldive.site/game/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guess: currentGuess,
        solution: solution,
      }),
    });

    if (!response.ok) {
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
    const response = await fetch('https://gg.helldive.site/game/guess/update', {
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
    console.debug('Fetching random stratagem');
    try {
      // setIsDaily(false);
      const res = await fetch('https://gg.helldive.site/api/stratagems/random');
      const game = await res.json();

      const arrowKeyCode = game.code.map((symbol: string) =>
        symbolToArrowKey(symbol)
      );
      setSolution(arrowKeyCode);
      updateStratagem(game);
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
    // setStratagemCode(data.code);
  }

  if (solution.length === 0 || guesses.length === 0) {
    return <div>Loading...</div>;
  }

  function getStratagemIconUrl(name: string | null) {
    if (!name) return '';
    return `/stratagems/${name}.svg`;
  }

  const handleArrow = (key: string) => {
    if (gameOver || guesses.length === 0) return;

    const currentGuess = guesses[currentRow];
    const firstEmptyIndex = currentGuess.findIndex(val => val === '');
    if (firstEmptyIndex === -1) return;

    const updatedGuesses = [...guesses];
    updatedGuesses[currentRow][firstEmptyIndex] = key;
    setGuesses(updatedGuesses);
  };

  const handleUndo = () => {
    if (gameOver || guesses.length === 0) return;

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
  };

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
                <div
                  key={index}
                  className='game-box input-box'
                  style={{
                    backgroundColor: getColorForFeedback(
                      feedbacks[i]?.[index] || 'initial'
                    ),
                  }}
                >
                  <span className='hide-mobile'>{arrowKeyToSymbol(value)}</span>
                  <span className='hide-desktop'>
                    {arrowKeyToComponent(value)}
                  </span>
                </div>
              ))}
            </div>
          ))}

        {!status && (
          <div className='mobile-controls-row'>
            <div className='side-buttons left'>
              <button
                onClick={handleUndo}
                className='button is-warning'
              >
                 <Undo fill='white' width={18} height={18} className='mobile-button' />
              </button>
            </div>

            <div className='mobile-arrow-controls'>
              <div className='row top-row'>
                <button className='arrow-button' onClick={() => handleArrow('ArrowUp')}><ArrowUp width={18} height={18} /></button>
              </div>
              <div className='row bottom-row'>
                <button className='arrow-button' onClick={() => handleArrow('ArrowLeft')}><ArrowLeft width={18} height={18} /></button>
                <button className='arrow-button' onClick={() => handleArrow('ArrowDown')}><ArrowDown width={18} height={18} /></button>
                <button className='arrow-button' onClick={() => handleArrow('ArrowRight')}><ArrowRight width={18} height={18} /></button>
              </div>
            </div>

            <div className='side-buttons right'>
              <button
                onClick={submitGuess}
                className='button is-select'
              >
                <CheckMark fill='white' width={18} height={18} className='mobile-button' />
              </button>
            </div>
          </div>
        )}

        {status && (
          <div className='status-message mobile-content'>
            <div>{status}</div>
            <div className='stats'>
              <div className='stratagem-icon mb-2'>
                <img
                  src={getStratagemIconUrl(stratagemName)}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div>The stratagem was {stratagemName}</div>
              <div>
                The solution was
                <span className='arrowbox is-inline-block py-1 px-2 ml-4'>
                  {solution.map((symbol: string, index: number) => (
                    <span
                      key={index}
                      style={{ display: 'inline-flex', marginRight: '6px' }}
                    >
                      <span className='hide-mobile'>
                        {arrowKeyToSymbol(symbol)}
                      </span>
                      <span className='hide-desktop'>
                        {arrowKeyToComponent(symbol)}
                      </span>
                    </span>
                  ))}
                </span>
              <div> 
                You took {guesses.length} guesses
              </div>
              </div>
            </div>
          </div>
        )}
        {status && (
          <div className='mobile-content'>
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
