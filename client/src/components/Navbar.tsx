import { CiMenuBurger } from 'react-icons/ci';
import '../styles/App.css';

function Navbar() {
  return (
    <>
      <nav>
        <button style={{ backgroundColor: 'transparent', marginLeft: '10px' }}>
          <CiMenuBurger
            style={{ padding: '5px', scale: '125%' }}
          ></CiMenuBurger>
        </button>
        <p style={{ margin: '5px', padding: '35px' }}>Helldivers Wordle</p>
      </nav>
    </>
  );
}

export default Navbar;
