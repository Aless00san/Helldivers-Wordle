import { CiMenuBurger } from 'react-icons/ci';
import '../styles/App.css';

function Navbar() {
  return (
    <>
      <nav>
        <div className='dropdown is-hoverable menu-dropdown'>
          <div className='dropdown-trigger'>
            <button
              style={{ backgroundColor: 'transparent', marginLeft: '10px' }}
            >
              <CiMenuBurger
                style={{ padding: '5px', scale: '125%' }}
              ></CiMenuBurger>
            </button>
          </div>
          <div
            className='dropdown-menu'
            id='dropdown-menu2'
            role='menu'
          >
            <div className='dropdown-content'>
              <a
                href='#'
                className='dropdown-item'
              >
                Home
              </a>
              <a
                href='#'
                className='dropdown-item'
              >
                Login
              </a>
              <a
                href='#'
                className='dropdown-item'
              >
                About
              </a>
            </div>
          </div>
        </div>

        <p style={{ margin: '5px', padding: '35px' }}>Helldivers Wordle</p>
      </nav>
    </>
  );
}

export default Navbar;
