import '../styles/Screen.css';
import About from './About';
import Game from './Game';
import GameHistory from './GameHistory';
import Login from './Login';

export default function Screen({
  currentPage,
  userId,
}: {
  currentPage: string;
  userId: number;
}) {
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Game />;
      case 'login':
        return <Login />;
      case 'about':
        return <About />;
      case 'history':
        return <GameHistory userId={userId} />;
      default:
        return <Game />; // Fallback
    }
  };

  return (
    <>
      <div className='screen-container'>{renderContent()}</div>
    </>
  );
}
