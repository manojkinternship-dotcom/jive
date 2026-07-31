import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Hero from './components/Hero';
import SweetWords from './components/SweetWords';
import QuizGame from './components/QuizGame';
import AskHerOut from './components/AskHerOut';
import FinalCTA from './components/FinalCTA';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [started, setStarted] = useState(false);
  const [currentSong, setCurrentSong] = useState('hero'); // 'hero' or 'quiz'
  const [choices, setChoices] = useState([]);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <>
      <AnimatePresence>
        {!started && <IntroScreen onStart={handleStart} />}
      </AnimatePresence>

      {started && (
        <>
          <AudioPlayer currentSong={currentSong} />
          <div className="scroll-container">
            <Hero />
            <SweetWords />
            <QuizGame onSongChange={() => setCurrentSong('quiz')} />
            <AskHerOut choices={choices} setChoices={setChoices} />
            <FinalCTA choices={choices} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
