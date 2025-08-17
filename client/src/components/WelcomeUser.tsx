import '../styles/App.css';

export default function WelcomeUser({ user }: { user: String }) {
  return (
    <>
      <div className='content has-text-centered'>
        <h1> WELCOME: </h1>
        <h2> {user} </h2>
      </div>
    </>
  );
}
