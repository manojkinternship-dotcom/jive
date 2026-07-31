import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function QuizGame({ onSongChange }) {
  const [answered, setAnswered] = useState(false);
  const [errorText, setErrorText] = useState('');
  const controls = useAnimation();

  const handleWrong = async () => {
    setErrorText('Haha, nope! Try again kanmani 😏');
    await controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    });
  };

  const handleCorrect = () => {
    setAnswered(true);
    onSongChange();
  };

  return (
    <section className="section" style={{ background: 'linear-gradient(to bottom, var(--color-ocean-dark), var(--color-ocean))' }}>
      <motion.div
        className="glass-panel"
        animate={controls}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          padding: '40px 20px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {!answered ? (
          <>
            <h2 style={{ marginBottom: '20px', color: 'var(--color-moonlight)' }}>Guess what, Kanmani?</h2>
            <p style={{ marginBottom: '30px', color: 'var(--color-seashell)', opacity: 0.9 }}>
              Who is the most beautiful girl in the universe?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button className="quiz-btn" onClick={handleWrong}>Miss Universe 👑</button>
              <button className="quiz-btn" onClick={handleWrong}>The Moon 🌙</button>
              <button className="quiz-btn" onClick={handleCorrect}>Jivee 💜</button>
            </div>
            {errorText && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '20px', color: '#ffb3b3', fontSize: '0.9rem' }}
              >
                {errorText}
              </motion.p>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ color: 'var(--color-lavender-light)', marginBottom: '15px' }}>Obviously! ✨</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--color-moonlight)' }}>
              Because you are the best in the world, and everything is beautiful when you are there.
              <br /><br />
              <i style={{ opacity: 0.8 }}>– Kanna, your stup-id</i>
            </p>
          </motion.div>
        )}
      </motion.div>
      <style>{`
        .quiz-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(216, 180, 226, 0.3);
          padding: 12px;
          border-radius: 12px;
          color: var(--color-moonlight);
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .quiz-btn:hover {
          background: rgba(216, 180, 226, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
