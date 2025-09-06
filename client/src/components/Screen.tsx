import '../styles/Screen.css';
import About from './About';
import Gallery from './Gallery';
import Game from './Game';
import GameHistory from './GameHistory';
import Login from './Login';

export default function Screen({
  currentPage,
  userId,
  isLoggedIn,
}: {
  currentPage: string;
  userId: number;
  isLoggedIn: boolean | null;
}) {
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Game isLoggedIn={isLoggedIn} />;
      case 'login':
        return <Login />;
      case 'about':
        return <About />;
      case 'history':
        return <GameHistory userId={userId} isLoggedIn={isLoggedIn} />;
      case 'gallery':
        return <Gallery/>;
      default:
        return <Game isLoggedIn={isLoggedIn} />; //Fallback
    }
  };

  return (
    <>
      <div className='screen-container'>{renderContent()}</div>
    </>
  );
}
