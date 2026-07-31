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
    <section className="section" style={{ background: 'var(--color-ocean-dark)' }}>
      
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
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          maxWidth: '800px',
          padding: '20px'
        }}
      >
        {tagsData.map((tag, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.1, y: -5, boxShadow: '0 10px 20px rgba(216, 180, 226, 0.4)' }}
            whileTap={{ scale: 0.9 }}
            onPointerDown={(e) => handleTap(e, tag.emojis)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{
              padding: '15px 25px',
              fontSize: '1.2rem',
              fontWeight: 500,
              cursor: 'pointer',
              userSelect: 'none',
              color: 'var(--color-lavender-light)',
            }}
          >
            {tag.text}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
