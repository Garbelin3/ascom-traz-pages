
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ModernCTAButtonProps {
  text: string;
  href: string;
  primary?: boolean;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'glass' | 'neuro';
}

const ModernCTAButton = ({ 
  text, 
  href, 
  primary = true, 
  className = '',
  icon,
  loading = false,
  size = 'md',
  variant = 'default'
}: ModernCTAButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return primary 
          ? 'bg-gradient-to-r from-ascom via-ascom-light to-ascom text-white shadow-lg hover:shadow-xl'
          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300';
      
      case 'glass':
        return 'glass text-ascom border border-ascom/20 hover:bg-white/20';
      
      case 'neuro':
        return 'neuro text-ascom hover:shadow-inner';
      
      default:
        return primary 
          ? 'bg-ascom text-white hover:bg-ascom-dark shadow-lg hover:shadow-xl'
          : 'bg-white text-ascom border-2 border-ascom hover:bg-ascom hover:text-white';
    }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        to={href}
        className={`
          relative overflow-hidden group btn-modern
          ${sizeClasses[size]}
          ${getVariantClasses()}
          rounded-xl font-medium 
          transition-all duration-300 
          flex items-center justify-center
          focus-ring
          touch-target
          ${loading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={isHovered ? { translateX: '200%' } : { translateX: '-100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center space-x-2">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
            </motion.div>
          ) : (
            <>
              <span>{text}</span>
              
              {/* Icon */}
              <motion.div
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {icon || <ArrowRight size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
              </motion.div>
            </>
          )}
        </div>

        {/* Glow Effect */}
        {primary && variant === 'gradient' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-ascom to-ascom-light opacity-0 blur-lg"
            animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full scale-0"
          whileTap={{ scale: 1.5, opacity: [0.5, 0] }}
          transition={{ duration: 0.4 }}
        />
      </Link>
    </motion.div>
  );
};

export default ModernCTAButton;
