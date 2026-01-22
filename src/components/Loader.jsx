import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 border-4 border-electric-purple/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner spinning ring */}
        <motion.div
          className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-electric-purple rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-neon-cyan rounded-full" />
        </motion.div>
      </div>
      
      {/* Loading text */}
      <motion.p
        className="absolute mt-32 text-secondary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
