import Screen from './Screen.tsx';
import '../styles/App.css';

function App() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <Screen rowCount={5} />
        </div>
      </div>
    </>
  );
}
export default App;
