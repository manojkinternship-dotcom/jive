import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dateOptions = [
  { id: 'ride', title: 'Long Ride 🏍️', image: '/media/long ride.jpg' },
  { id: 'cafe', title: 'Café Date ☕', image: '/media/Screenshot 2026-07-31 223837.png' },
  { id: 'movie', title: 'Movie / Lounge 🍿', image: '/media/spider man movei.jpg' }
];

export default function AskHerOut({ choices, setChoices }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNoPopup, setShowNoPopup] = useState(false);

  const handleNext = (choice) => {
    if (choice) {
      setChoices([...choices, dateOptions[currentIndex].title]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowNoPopup(true);
      setTimeout(() => {
        setShowNoPopup(false);
        setCurrentIndex(currentIndex + 1);
      }, 2000);
    }
  };

  return (
    <section className="section" style={{ background: 'var(--color-ocean)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', textAlign: 'center' }}>
        
        {currentIndex < dateOptions.length && (
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ color: 'var(--color-moonlight)', marginBottom: '20px', fontSize: '1.8rem' }}
          >
            One more thing, today's yours to choose 🌊
          </motion.h2>
        )}

        <div style={{ position: 'relative', height: '400px' }}>
          <AnimatePresence mode="wait">
            {currentIndex < dateOptions.length ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  {/* Blurred background to fill empty space */}
                  <div style={{
                    position: 'absolute',
                    inset: '-20px',
                    backgroundImage: `url('${dateOptions[currentIndex].image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(15px)',
                    opacity: 0.5,
                    zIndex: 0
                  }} />
                  {/* Actual uncropped image */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${dateOptions[currentIndex].image}')`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1
                  }} />
                </div>
                
                <div style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', zIndex: 2 }}>
                  <h3 style={{ color: 'var(--color-moonlight)', marginBottom: '15px' }}>
                    {dateOptions[currentIndex].title}
                  </h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="date-btn yes-btn" onClick={() => handleNext(true)}>
                      Yes! 💖
                    </button>
                    <button className="date-btn no-btn" onClick={() => handleNext(false)}>
                      Nah
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '30px'
                }}
              >
                {choices.length === 0 ? (
                  <>
                    <h3 style={{ color: 'var(--color-lavender-light)', marginBottom: '15px' }}>
                      Aww, playing hard to get? 🥺
                    </h3>
                    <p style={{ color: 'var(--color-moonlight)', marginBottom: '20px', lineHeight: 1.5 }}>
                      Fine! You get to plan the whole day, and I'll just follow along (and pay for everything) 💜
                    </p>
                  </>
                ) : (
                  <>
                    <h3 style={{ color: 'var(--color-lavender-light)', marginBottom: '15px' }}>
                      Yay! It's a date! 🥰
                    </h3>
                    <p style={{ color: 'var(--color-moonlight)', marginBottom: '20px', lineHeight: 1.5 }}>
                      You picked: {choices.join(', ')}
                    </p>
                  </>
                )}
                
                <div style={{ color: 'var(--color-moonlight)', marginTop: '10px', fontWeight: 600 }}>
                  Scroll down for one last thing... 👇
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showNoPopup && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '10%',
                  right: '10%',
                  background: 'var(--color-lavender-dark)',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '15px',
                  zIndex: 10,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
              >
                Nice try, kanmani 😏 pick another one!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .date-btn {
          flex: 1;
          padding: 12px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          transition: transform 0.2s;
        }
        .date-btn:active {
          transform: scale(0.95);
        }
        .yes-btn {
          background: var(--color-lavender-light);
          color: var(--color-ocean-dark);
        }
        .no-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.4);
        }
      `}</style>
    </section>
  );
}
