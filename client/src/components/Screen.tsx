import "../styles/Screen.css";
import About from "./About";
import Game from "./Game";
import Login from "./Login";
import WelcomeUser from "./Login";

export default function Screen({
  currentPage,
}: {
  currentPage: string;
}) {
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <Game />;
      case "login":
        return <Login/>;
      case "about":
        return <About />;
      default:
        return <Game />; // Fallback
    }
  };

  return (
    <>
      <div className="screen-container">{renderContent()}</div>
    </>
  );
}
