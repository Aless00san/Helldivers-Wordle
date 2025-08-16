import '../styles/Screen.css';
import ColorFeedbackComponent from './color-feedback-component';

export default function Screen() {
  return (
    <>
      <div className='screen-container'>
        <div className='crt-effect'>
          <ColorFeedbackComponent />
        </div>
      </div>
    </>
  );
}
