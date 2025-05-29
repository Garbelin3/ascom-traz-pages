
import React from 'react';
import { motion } from 'framer-motion';

interface ModernBenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ModernBenefitCard = ({ icon, title, description, delay = 0 }: ModernBenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        y: -4
      }}
      className="group relative overflow-hidden"
    >
      {/* Glassmorphism Card */}
      <div className="glass p-8 rounded-3xl border border-white/20 backdrop-blur-xl bg-white/10 hover:bg-white/15 transition-all duration-300 h-full">
        
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ascom/20 via-transparent to-ascom-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          
          {/* Icon Container */}
          <motion.div 
            className="relative mb-6"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Icon Background Glow */}
              <div className="absolute inset-0 bg-ascom/20 rounded-2xl blur-xl group-hover:bg-ascom/30 transition-colors duration-300" />
              
              {/* Icon */}
              <div className="relative bg-gradient-to-br from-ascom to-ascom-light text-white p-4 rounded-2xl text-4xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                {icon}
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-ascom-700 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {/* Hover Indicator */}
          <motion.div
            className="mt-4 w-0 h-0.5 bg-gradient-to-r from-ascom to-ascom-light group-hover:w-12 transition-all duration-300"
            initial={{ width: 0 }}
            whileHover={{ width: 48 }}
          />
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </motion.div>
  );
};

export default ModernBenefitCard;
