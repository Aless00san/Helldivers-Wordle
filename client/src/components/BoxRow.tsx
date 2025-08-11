import "../styles/App.css";
import "../styles/BoxRow.css"; // Import the new CSS file

function BoxRow({ boxCount }: { boxCount: number }) {
  return (
    <>
      <div className="row-container">
        {Array.from({ length: boxCount }, (_, i) => (
          <div key={i} className="box">
            <p className="box-number"></p>
          </div>
        ))}
      </div>
    </>
  );
}

export default BoxRow;