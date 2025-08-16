import '../styles/Screen.css';
import Game from './Game';

export default function Screen({ rowCount }: { rowCount: number }) {
  return (
    <>
      <div className='screen-container'>
        <Game />
      </div>
    </>
  );
}
