import "../styles/App.css";
import "../styles/BoxRow.css"; // Import the new CSS file

function BoxRow({ boxCount }: { boxCount: number }) {
  return (
    <>
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
    </>
  );
}

export default BoxRow;
