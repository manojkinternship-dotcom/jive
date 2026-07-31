import { motion } from 'framer-motion';

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-ocean-dark)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--color-moonlight)',
      }}
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}
      >
        A special surprise awaits you...
      </motion.h1>
      <motion.button
        onClick={onStart}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          padding: '12px 32px',
          fontSize: '1.2rem',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: 'var(--color-lavender)',
          color: 'var(--color-ocean-dark)',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(216, 180, 226, 0.4)',
        }}
      >
        Tap to Open 🌙
      </motion.button>
    </motion.div>
  );
}
