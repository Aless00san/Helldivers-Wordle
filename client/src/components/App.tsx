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
        <div style={{ width: '100%', height: '100%' }}>
          <Screen />
        </div>
      </div>
    </>
  );
}
export default App;
