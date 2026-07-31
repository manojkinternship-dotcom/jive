import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ currentSong }) {
  const [isMuted, setIsMuted] = useState(false);
  const heroAudioRef = useRef(null);
  const quizAudioRef = useRef(null);

  useEffect(() => {
    if (heroAudioRef.current) {
      heroAudioRef.current.volume = 0.3;
      heroAudioRef.current.loop = true;
    }
    if (quizAudioRef.current) {
      quizAudioRef.current.volume = 0.3;
      quizAudioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (currentSong === 'hero') {
      quizAudioRef.current?.pause();
      heroAudioRef.current?.play().catch(e => console.log('Audio play error:', e));
    } else if (currentSong === 'quiz') {
      heroAudioRef.current?.pause();
      quizAudioRef.current?.play().catch(e => console.log('Audio play error:', e));
    }
  }, [currentSong]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (heroAudioRef.current) heroAudioRef.current.muted = !isMuted;
    if (quizAudioRef.current) quizAudioRef.current.muted = !isMuted;
  };

  return (
    <>
      <audio ref={heroAudioRef} src="/media/Remo Birthday Bgm Mp3 Download.mp3" />
      <audio ref={quizAudioRef} src="/media/The-Love-Bug-Has-Bitten.mp3" />
      
      <button
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--color-moonlight)',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </>
  );
}
