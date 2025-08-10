import { CiMenuBurger } from "react-icons/ci";
function Navbar() {
  return (
    <>
      <nav
        style={{
          backgroundColor: "#001F3F",
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: "0",
          left: "0",
          padding: "5px",
          zIndex:"1"
        }}
      >
        <button style={{backgroundColor: "transparent"}}>
          <CiMenuBurger
            style={{ padding: "5px", scale: "125%" }}
          ></CiMenuBurger>
        </button>
        <p style={{ margin: "5px", padding: "5px" }}>Helldivers Wordle</p>
      </nav>
    </>
  );
}

export default Navbar;
