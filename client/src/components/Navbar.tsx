import { CiMenuBurger } from "react-icons/ci";
import "../styles/App.css";
import HelldiveWordleLogo from "./icons/HelldiveWordleLogo";

interface NavbarProps {
  itemClickHandler: (route: string) => void;
  user: {
    username: string;
    id: number;
  };
}

function Navbar({ itemClickHandler, user }: NavbarProps) {
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
                onClick={(e) => handleItemClick(e, "history")}
              >
                History
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

        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "5px"}}>{user.username}</p>
          <HelldiveWordleLogo width={48} height={48} style={{ margin: "15px" }} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
