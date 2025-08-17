import '../styles/App.css';

export default function About() {
  return (
    <>
      <div className='content has-text-centered'>
        <h2>About:</h2>
        <p>This is a Wordle inspired game made with React and Prisma.</p>
        <p>The main inspiration for this game came from Stratagem Hero from the game "Helldivers 2".</p>
        <p>You can find the source code on <a href="https://github.com/aless00san/Helldivers-Wordle">Github</a>.</p>
      </div>
    </>
  );
}
