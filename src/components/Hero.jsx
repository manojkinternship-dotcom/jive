import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [swarm, setSwarm] = useState([]);

  // Generate random positions for floating background elements
  const floatingElements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: i % 2 === 0 ? '💜' : '🦋', // Mix of hearts and butterflies
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDuration: (Math.random() * 10 + 10) + 's',
    animationDelay: (Math.random() * 5) + 's',
  }));

  useEffect(() => {
    // Generate a dense swarm of butterflies clustered in the center for the initial load
    const newSwarm = Array.from({ length: 40 }).map((_, i) => ({
      id: `swarm-${i}`,
      x: (Math.random() - 0.5) * 80, // clustered tightly around the text area
      y: (Math.random() - 0.5) * 50,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 100 + 80, // smooth flutter speed
      rotation: Math.random() * 90 - 45, // slight angle for flying outward
      flapSpeed: Math.random() * 0.15 + 0.15 // individual wing flap speed
    }));
    setSwarm(newSwarm);

    // Trigger the reveal animation after 1.5 seconds
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section hero-section">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        {/* Mobile-friendly background image fallback */}
        <img 
          src="/media/kanmini.webp" 
          alt="Dreamy Ocean Background" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2,
            mixBlendMode: 'luminosity',
            zIndex: -1
          }}
        />
        <iframe 
          src="/media/🥴.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
          title="Background texture"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            opacity: 0.15,
            pointerEvents: 'none',
            mixBlendMode: 'soft-light',
            zIndex: 0
          }}
        />
      </div>

      {/* Background Floating Elements */}
      {floatingElements.map((b) => (
        <div
          key={b.id}
          className="butterfly"
          style={{
            left: b.left,
            top: b.top,
            animationDuration: b.animationDuration,
            animationDelay: b.animationDelay,
          }}
        >
          <span className={b.type === '🦋' ? 'flap' : ''}>{b.type}</span>
        </div>
      ))}

      <div className="hero-content" style={{ position: 'relative' }}>
        
        {/* The Reveal Swarm */}
        <AnimatePresence>
          {!revealed && swarm.map(b => (
            <motion.div
              key={b.id}
              initial={{ x: b.x, y: b.y, opacity: 1, scale: 1, rotate: b.rotation }}
              exit={{ 
                x: b.x + Math.cos(b.angle) * b.speed * 4, 
                y: b.y + Math.sin(b.angle) * b.speed * 4,
                opacity: 0,
                scale: 1.5
              }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%',
                fontSize: '2.5rem', 
                pointerEvents: 'none',
                marginTop: '-20px',
                marginLeft: '-20px',
                zIndex: 60
              }}
            >
              <motion.div
                animate={{ scaleX: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: b.flapSpeed }}
              >
                🦋
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.h1 
          className="glow-text"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ 
            opacity: revealed ? 1 : 0, 
            scale: revealed ? 1 : 0.9,
            filter: revealed ? 'blur(0px)' : 'blur(10px)'
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          Happy Birthday, Jivee 🌙💜
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 0.9 : 0, y: revealed ? 0 : 20 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          My beautiful sunshine ☀️, deep as the ocean, and charming as moonlight.
        </motion.p>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
