//CSS
import '../styles/App.css';
//Components
import Screen from './Screen.tsx';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';
//External
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Game');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const [user, setUser] = useState({
    username: 'Guest',
    id: 0,
  });

  async function fetchWithRefresh(url: string, options: RequestInit = {}) {
    const res = await fetch(url, { ...options, credentials: 'include' });

    if (res.status === 401) {
      // If the acces token is expired
      const refreshRes = await fetch(
        'http://localhost:3000/auth/discord/refresh', //Refresh the access token
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!refreshRes.ok) throw new Error('Unable to refresh token');

      // Retry original request after refreshing token
      return fetch(url, { ...options, credentials: 'include' });
    }

    return res;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user') || 'Guest';

    if (username) {
      fetchWithRefresh('http://localhost:3000/auth/discord/user')
        .then(res => {
          if (!res.ok) throw new Error('Not logged in');
          return res.json();
        })
        .then(data => {
          setUser({ username: data.user.name, id: data.user.id });
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUser({ username: 'Guest', id: 0 });
        });
    } else {
      setUser({ username: 'Guest', id: 0 });
    }
  }, []);

  // Function to handle dropdown item clicks
  const handleMenuItemClick = (contentName: string) => {
    setCurrentPage(contentName);
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && dropdown.classList.contains('is-active')) {
      dropdown.classList.remove('is-active');
    }
  };

  return (
    <>
      <Navbar
        itemClickHandler={handleMenuItemClick}
        user={user}
      />
      <Screen
        currentPage={currentPage}
        userId={user.id}
        isLoggedIn={isLoggedIn}
      />
      <Footer />
    </>
  );
}
export default App;
