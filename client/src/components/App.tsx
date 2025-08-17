import Screen from './Screen.tsx';
import '../styles/App.css';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Screen rowCount={5} />
      <Footer />
    </>
  );
}
export default App;
