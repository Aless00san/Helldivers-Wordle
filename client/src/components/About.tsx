import '../styles/App.css';

export default function About() {
  return (
    <>
      <div className='content has-text-centered'>
        <h2>About:</h2>
        <p>This is a Wordle-inspired game built with <strong>React</strong> for the frontend and <strong>Prisma</strong> for database management.</p>
        <p>It was designed for fans of Helldivers and anyone curious about web development and game mechanics.</p>
        <p>The game features a responsive UI, real-time feedback on guesses, and a scalable backend structure.</p>
        <p>You can explore the source code and contribute on <a href="https://github.com/aless00san/Helldivers-Wordle">GitHub</a>.</p>
      </div>
    </>
  );
}
