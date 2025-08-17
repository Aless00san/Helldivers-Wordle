//CSS
import "../styles/App.css";
//Components
import Screen from "./Screen.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
//External
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("Game");

  // Function to handle dropdown item clicks
  const handleMenuItemClick = (contentName: string) => {
    console.log(contentName);
    setCurrentPage(contentName);
    const dropdown = document.querySelector(".dropdown");
    if (dropdown && dropdown.classList.contains("is-active")) {
      dropdown.classList.remove("is-active");
    }
  };

  return (
    <>
      <Navbar itemClickHandler={handleMenuItemClick} />
      <Screen currentPage={currentPage} />
      <Footer />
    </>
  );
}
export default App;
