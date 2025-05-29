
import React from 'react';
import { motion } from 'framer-motion';

interface ModernStepCardProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
  isActive?: boolean;
}

const ModernStepCard = ({ number, title, description, delay = 0, isActive = false }: ModernStepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Connecting Line (for desktop) */}
      {number < 3 && (
        <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-ascom/30 to-transparent z-0" />
      )}

      {/* Card Container */}
      <div className="relative z-10 flex flex-col items-center p-8 max-w-sm mx-auto">
        
        {/* Number Circle */}
        <motion.div 
          className={`relative mb-6 ${isActive ? 'scale-110' : ''}`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ascom to-ascom-light opacity-20 animate-pulse" />
          
          {/* Main Circle */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-ascom to-ascom-light rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <span className="text-white font-bold text-xl">{number}</span>
            
            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Progress Ring */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-ascom-light"
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          )}
        </motion.div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-ascom-700 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-ascom-light rounded-full opacity-60"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: delay + 0.5
          }}
        />
        
        <motion.div
          className="absolute -bottom-2 -left-2 w-2 h-2 bg-ascom rounded-full opacity-40"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: delay + 1
          }}
        />
      </div>
    </motion.div>
  );
};

export default ModernStepCard;
