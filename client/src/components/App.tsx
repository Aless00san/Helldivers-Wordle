//CSS
import "../styles/App.css";
//Components
import Screen from "./Screen.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
//External
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("Game");

  const [user, setUser] = useState({
    username: "Guest",
    id: 0,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("user") || "Guest";

    if (username === "Guest") {
    fetch("http://localhost:3000/auth/discord/user", {
      credentials: "include", // send HttpOnly cookie automatically
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser({ username: data.user.name, id: data.user.id });
      })
      .catch(() => {
        // fallback if request fails (not authenticated)
        setUser({ username: "Guest", id: 0 });
      });

    return;
  }

  // Fallback if URL param has user
  setUser({ username, id: 0 });
}, [setUser]);

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
      <Navbar itemClickHandler={handleMenuItemClick} user={user} />
      <Screen currentPage={currentPage} userId={user.id}/>
      <Footer />
    </>
  );
}
export default App;
