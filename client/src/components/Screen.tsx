import '../styles/Screen.css';
import BoxRow from './BoxRow';
import GameOver from './GameOver';

export default function Screen({ rowCount }: { rowCount: number }) {
  return (
    <>
      <div className='screen-container'>
        {Array.from({ length: rowCount }, (_, i) => (
          <BoxRow
            key={i}
            boxCount={5}
          />
        ))}
      </div>
    </>
  );
}
