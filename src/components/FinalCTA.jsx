import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const phrases = [
  "No is not an option! 😜",
  "Are you sure? Try again! 😏",
  "Nice try, kanmani! Click Yes! 💜"
];

export default function FinalCTA({ choices }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [success, setSuccess] = useState(false);
  const [popupText, setPopupText] = useState('');

  const getWhatsAppLink = () => {
    const phoneNumber = "YOUR_NUMBER_HERE"; // User can replace this
    let text = "";
    if (!choices || choices.length === 0) {
      text = "Kanna, you're paying today, and I'm deciding what we do! 😏💜 Also... I SAID YES! 🥰";
    } else {
      text = `Kanna, I said YES! 🥰 And I'm ready for our date! I picked: ${choices.join(', ')}`;
    }
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const handleInteraction = () => {
    setPopupText(phrases[dodgeCount % phrases.length]);
    setDodgeCount(prev => prev + 1);
    setPosition({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300
    });
    
    setTimeout(() => setPopupText(''), 1500);
  };

  const triggerSuccess = () => {
    setSuccess(true);
    // Confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#d8b4e2', '#ffffff', '#20b2aa', '#003366']
      });
    }, 250);
  };

  return (
    <section className="section" style={{ background: 'var(--color-ocean-dark)' }}>
      {!success ? (
        <div style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
          
          <AnimatePresence>
            {popupText && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'absolute',
                  top: '15%',
                  color: 'var(--color-lavender-light)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {popupText}
              </motion.div>
            )}
          </AnimatePresence>

          <h2 style={{ color: 'var(--color-moonlight)', marginBottom: '10px', fontSize: '1.8rem', textAlign: 'center', padding: '0 20px' }}>
            Will you be mine, Kanmani? 💜
          </h2>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative', height: '100px' }}>
            <motion.button
              onClick={triggerSuccess}
              className="glow-text"
              style={{
                padding: '15px 35px',
                fontSize: '1.3rem',
                borderRadius: '50px',
                backgroundColor: 'var(--color-lavender-light)',
                color: 'var(--color-ocean-dark)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 5px 20px rgba(216, 180, 226, 0.4)',
                zIndex: 10
              }}
            >
              Say Yes, Babe 💖
            </motion.button>

            <motion.button
              animate={{ x: position.x, y: position.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              onHoverStart={handleInteraction}
              onClick={handleInteraction}
              style={{
                padding: '15px 35px',
                fontSize: '1.3rem',
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--color-moonlight)',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              No 😢
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h1 className="glow-text" style={{ fontSize: '2.5rem', color: 'var(--color-moonlight)', marginBottom: '20px' }}>
            I love you, Kanmani (Jivee) 💜
          </h1>
          <h2 style={{ color: 'var(--color-lavender-light)', fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px' }}>
            You are my greatest blessing and the most beautiful part of my life. I promise to cherish you today, tomorrow, and forever. Happy Birthday, Kanmani ✨
          </h2>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
              transition: 'transform 0.2s',
              fontSize: '1.2rem'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Tell Kanna 💌
          </motion.a>
        </motion.div>
      )}
    </section>
  );
}
