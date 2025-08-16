import { useEffect, useState } from "react";
import "../styles/Game.css";

export default function Game() {
  // Types
  type FeedbackType = "correct" | "misplaced" | "wrong" | "initial";
  type FeedbackArray = [
    FeedbackType,
    FeedbackType,
    FeedbackType,
    FeedbackType,
    FeedbackType
  ];

  const [currentRow, setCurrentRow] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[][]>(
    Array.from({ length: 5 }, () => ["", "", "", "", ""])
  );
  const [feedbacks, setFeedbacks] = useState<FeedbackArray[]>(
    Array.from({ length: 6 }, () => [
      "initial",
      "initial",
      "initial",
      "initial",
      "initial",
    ])
  );
  const [status, setStatus] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [solution, setSolution] = useState<string[]>([]);

  const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  useEffect(() => {
    const fetchDailyStratagem = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/stratagems/daily");
        const data = await res.json();

        const arrowKeyCode = data.code.map((symbol: string) =>
          symbolToArrowKey(symbol)
        );

        setSolution(arrowKeyCode);
      } catch (err) {
        console.error("Failed to fetch daily stratagem:", err);
      }
    };

    fetchDailyStratagem();
  }, []);

  // Map arrow keys to symbols
  const arrowKeyToSymbol = (key: string): string => {
    switch (key) {
      case "ArrowUp":
        return "↑";
      case "ArrowDown":
        return "↓";
      case "ArrowLeft":
        return "←";
      case "ArrowRight":
        return "→";
      default:
        return "";
    }
  };

  // Map symbols back to key strings
  const symbolToArrowKey = (symbol: string): string => {
    switch (symbol) {
      case "↑":
        return "ArrowUp";
      case "↓":
        return "ArrowDown";
      case "←":
        return "ArrowLeft";
      case "→":
        return "ArrowRight";
      default:
        return "";
    }
  };

  // Handle keypresses to fill boxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        submitGuess();
        return;
      }

      if (e.key === "Backspace") {
        const currentGuess = guesses[currentRow];

        let lastFilledIndex = -1;
        for (let i = currentGuess.length - 1; i >= 0; i--) {
          if (currentGuess[i] !== "") {
            // If the current index is not empty
            lastFilledIndex = i;
            break;
          }
        }
        if (lastFilledIndex !== -1) {
          const updatedGuesses = [...guesses];
          updatedGuesses[currentRow][lastFilledIndex] = "";
          setGuesses(updatedGuesses);
        }
        return;
      }

      if (!allowedKeys.includes(e.key)) return;

      const currentGuess = guesses[currentRow];
      const firstEmptyIndex = currentGuess.findIndex((val) => val === "");
      if (firstEmptyIndex === -1) return;

      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow][firstEmptyIndex] = e.key;
      setGuesses(updatedGuesses);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guesses, currentRow, gameOver]);

  const getColorForFeedback = (feedbackType: FeedbackType): string => {
    switch (feedbackType) {
      case "correct":
        return "var(--correct-color)";
      case "misplaced":
        return "var(--misplaced-color)";
      case "wrong":
        return "var(--dark-gray)";
      case "initial":
        return "var(--initial-color)";
      default:
        return "#6b7280";
    }
  };

  // Makes a POST request to the server to check the guess
  // Returns an array of feedback types
  const submitGuess = async () => {
    if (gameOver) return;
    if (!solution) {
      alert("Game is still loading...");
      return;
    }

    const currentGuess = guesses[currentRow];
    if (currentGuess.includes("")) {
      alert("Please fill all 5 directions using arrow keys.");
      return;
    }

    const response = await fetch("http://localhost:3000/game/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guess: currentGuess,
        solution: solution,
      }),
    });

    if (!response.ok) {
      alert("Failed to submit guess");
      return;
    }

    const data = await response.json();

    setFeedbacks((prev) => {
      const updated = [...prev];
      updated[currentRow] = data.guesses;
      return updated;
    });

    // Check if guess is fully correct
    const isCorrect = data.guesses.every(
      (feedback: FeedbackType) => feedback === "correct"
    );

    if (isCorrect) {
      setGameOver(true);
      setStatus("Congratulations! You guessed correctly.");
      return;
    }

    setCurrentRow((prev) => prev + 1);
  };

  const resetGame = () => {
    setCurrentRow(0);

    setGuesses(Array.from({ length: 5 }, () => ["", "", "", "", ""]));

    setFeedbacks(
      Array.from({ length: 6 }, () => [
        "initial",
        "initial",
        "initial",
        "initial",
        "initial",
      ])
    );

    setStatus(null);
    setGameOver(false);
  };

  return (
    <>
      <div className="game-container">
        {Array.from({ length: 5 }, (_, i) => (
          <div className="box-row">
            {guesses[i].map((value, index) => (
              <input
                type="text"
                className="game-box input-box"
                value={arrowKeyToSymbol(value)}
                style={{
                  backgroundColor: getColorForFeedback(feedbacks[i][index]),
                }}
              />
            ))}
          </div>
        ))}

        <div className="field mb-6 mobile-controls">
          <div className="control">
            <button
              onClick={submitGuess}
              className="button is-primary submit-button"
            >
              Submit Guess
            </button>
            <button
              onClick={resetGame}
              className="button is-danger submit-button"
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
