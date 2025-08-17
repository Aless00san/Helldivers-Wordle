import { CiMenuBurger } from "react-icons/ci";
import "../styles/App.css";

interface NavbarProps {
  itemClickHandler: (route: string) => void;
}

function Navbar({ itemClickHandler }: NavbarProps) {
  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: string
  ) => {
    e.preventDefault();
    itemClickHandler(route);
  };
  return (
    <>
      <nav>
        <div className="dropdown is-hoverable menu-dropdown">
          <div className="dropdown-trigger">
            <button
              style={{ backgroundColor: "transparent", marginLeft: "10px" }}
            >
              <CiMenuBurger
                style={{ padding: "5px", scale: "125%" }}
              ></CiMenuBurger>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content">
              <a
                className="dropdown-item"
                onClick={(e) => handleItemClick(e, "home")}
              >
                Home
              </a>
              <a
                className="dropdown-item"
                onClick={(e) => handleItemClick(e, "login")}
              >
                Login
              </a>
              <a
                className="dropdown-item"
                onClick={(e) => handleItemClick(e, "about")}
              >
                About
              </a>
            </div>
          </div>
        </div>

        <p style={{ margin: "5px", padding: "35px" }}>Helldivers Wordle</p>
      </nav>
    </>
  );
}

export default Navbar;
