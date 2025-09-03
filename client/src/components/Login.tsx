import '../styles/App.css';
import Discord from './icons/Discord';

export default function Login() {
  // Function to handle login button click
  const handleLoginButtonClick = () => {
    //Should open a web page with the Discord login
    window.location.href =
      'https://discord.com/oauth2/authorize?client_id=1400113678044364820&response_type=code&redirect_uri=https%3A%2F%2Fgg.helldive.site%2Fauth%2Fdiscord%2Fcallback&scope=identify+email';
  };
  return (
    <>
      <div className='content has-text-centered is-flex is-flex-direction-column is-align-items-center'>
        <div className='icon-wrapper'>
          <Discord
            width={100}
            height={100}
            className='discord-icon'
          />
        </div>

        <button
          style={{
            backgroundColor: '#5865F2',
            color: 'white',
            marginTop: '1rem',
          }}
          className='button is-info is-large'
          onClick={handleLoginButtonClick}
        >
          Login with Discord
        </button>
      </div>
    </>
  );
}
