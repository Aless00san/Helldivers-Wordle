import { useState } from 'react';
import '../styles/Screen.css';
import Game from './Game';
import WelcomeUser from './WelcomeUser';

export default function Screen({ rowCount }: { rowCount: number }) {
  const [activeContent, setActiveContent] = useState<string>('home');

  //Todo: Move this to App Component
  // Function to handle dropdown item clicks
  const handleMenuItemClick = (contentName: string) => {
    setActiveContent(contentName);
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && dropdown.classList.contains('is-active')) {
      dropdown.classList.remove('is-active');
    }
  };

  // 3. Conditional Rendering: Determine which content to show
  const renderContent = () => {
    switch (activeContent) {
      case 'home':
        return <Game />;
      case 'login':
        return <WelcomeUser user={'Test'} />;
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
