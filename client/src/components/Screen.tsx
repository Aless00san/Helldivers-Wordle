import '../styles/Screen.css';

export default function Screen() {
  return (
    <>
      <div className='screen-container'>
        <div className='crt-effect'>
          <h1> GAME OVER</h1>
          <h2 className='high-score'> HIGH SCORE </h2>
          <h4>1. Jhon Doe | 99999</h4>
          <h4>1. Jane Doe | 99999</h4>
          <h4>1. Jake Doe | 99999</h4>
          <h2 className='info-finalscore'> YOUR FINAL SCORE </h2>
          <h1 className='final-score'> 999999 </h1>
        </div>
      </div>
    </>
  );
}
