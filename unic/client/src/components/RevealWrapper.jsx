import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

const RevealWrapper = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default RevealWrapper;
