import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tagsData = [
  { text: "Kanmani 💜", emojis: ["💜"] },
  { text: "Baby girl", emojis: ["🎀", "💖"] },
  { text: "Muthakanee 👀", emojis: ["👀", "✨"] },
  { text: "Oii", emojis: ["👋", "✨"] },
  { text: "Darling", emojis: ["😘", "💋"] },
  { text: "Sunshine ☀️", emojis: ["☀️", "✨"] },
  { text: "Sunflower 🌻", emojis: ["🌻"] },
  { text: "Love you", emojis: ["❤️", "💕"] }
];

export default function SweetWords() {
  const [particles, setParticles] = useState([]);

  const handleTap = (e, emojis) => {
    const rect = e.target.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: startX,
      y: startY,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 80 + 50,
      rotation: Math.random() * 360,
    }));

    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1500);
  };

  return (
    <section 
      className="section" 
      style={{ 
        backgroundImage: "url('/media/kanmini.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 31, 63, 0.82)',
        zIndex: 0
      }} />

      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.5, rotate: 0 }}
            animate={{ 
              x: p.x + Math.cos(p.angle) * p.speed * 1.5, 
              y: p.y + Math.sin(p.angle) * p.speed * 1.5,
              opacity: 0,
              scale: 1.5,
              rotate: p.rotation
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ 
              position: 'fixed', 
              zIndex: 100, 
              fontSize: '1.8rem', 
              pointerEvents: 'none',
              top: 0,
              left: 0
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '500px',
          width: '90%',
          padding: '30px 20px',
          zIndex: 1,
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: 'var(--color-moonlight)', fontSize: '1.5rem', marginBottom: '5px' }}>
          What Kanna calls you... 💜
        </h2>
        <p style={{ color: 'var(--color-seashell)', opacity: 0.7, fontSize: '0.9rem', marginBottom: '10px' }}>
          (Tap on them for a little surprise)
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          width: '100%'
        }}>
          {tagsData.map((tag, index) => (
            <motion.div
              key={index}
              drag
              dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
              whileHover={{ scale: 1.08, y: -2, boxShadow: '0 8px 16px rgba(216, 180, 226, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onPointerDown={(e) => handleTap(e, tag.emojis)}
              className="glass-panel"
              style={{
                padding: '12px 20px',
                fontSize: '1.1rem',
                fontWeight: 500,
                cursor: 'pointer',
                userSelect: 'none',
                color: 'var(--color-lavender-light)',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)'
              }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
