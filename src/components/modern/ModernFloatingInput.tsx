
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';

interface ModernFloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  validation?: (value: string) => boolean;
  onValidation?: (isValid: boolean) => void;
}

const ModernFloatingInput = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  success = false,
  required = false,
  placeholder = ' ',
  disabled = false,
  icon,
  validation,
  onValidation
}: ModernFloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;
  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (validation && newValue.length > 0) {
      const valid = validation(newValue);
      setIsValid(valid);
      onValidation?.(valid);
    } else {
      setIsValid(null);
    }
  };

  const getStatusIcon = () => {
    if (error) return <X className="text-red-500" size={20} />;
    if (success || isValid) return <Check className="text-green-500" size={20} />;
    if (isValid === false) return <AlertCircle className="text-orange-500" size={20} />;
    return null;
  };

  const getBorderColor = () => {
    if (error) return 'border-red-500 focus:border-red-500';
    if (success || isValid) return 'border-green-500 focus:border-green-500';
    if (isValid === false) return 'border-orange-500 focus:border-orange-500';
    return 'border-gray-200 focus:border-ascom';
  };

  const getGlowColor = () => {
    if (error) return 'shadow-red-500/20';
    if (success || isValid) return 'shadow-green-500/20';
    if (isValid === false) return 'shadow-orange-500/20';
    return 'shadow-ascom/20';
  };

  return (
    <div className="relative w-full">
      {/* Input Container */}
      <div className="relative">
        {/* Leading Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <motion.input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-4 text-base bg-white border-2 rounded-xl
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-0
            ${icon ? 'pl-12' : ''}
            ${isPasswordType || getStatusIcon() ? 'pr-12' : ''}
            ${getBorderColor()}
            ${isFocused ? `shadow-lg ${getGlowColor()}` : 'shadow-sm'}
            ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
          `}
          style={{ 
            WebkitAppearance: 'none',
            MozAppearance: 'textfield'
          }}
        />

        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 pointer-events-none select-none
            transition-all duration-200 ease-out
            ${icon ? 'left-12' : 'left-4'}
            ${disabled ? 'text-gray-400' : ''}
          `}
          animate={{
            top: isFloating ? '8px' : '50%',
            fontSize: isFloating ? '12px' : '16px',
            y: isFloating ? '0%' : '-50%',
            color: isFocused 
              ? (error ? '#ef4444' : success || isValid ? '#22c55e' : '#0FA0CE')
              : '#6b7280'
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
          {required && (
            <motion.span 
              className="text-red-500 ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFloating ? 1 : 0 }}
            >
              *
            </motion.span>
          )}
        </motion.label>

        {/* Trailing Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {/* Status Icon */}
          <AnimatePresence>
            {getStatusIcon() && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {getStatusIcon()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Toggle */}
          {isPasswordType && (
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
          )}
        </div>

        {/* Focus Ring */}
        <motion.div
          className={`
            absolute inset-0 rounded-xl border-2 opacity-0 pointer-events-none
            ${error ? 'border-red-500' : success || isValid ? 'border-green-500' : 'border-ascom'}
          `}
          animate={{
            opacity: isFocused ? 0.3 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Error/Help Text */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validation Feedback */}
      <AnimatePresence>
        {isValid !== null && !error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-2 text-sm flex items-center space-x-1 ${
              isValid ? 'text-green-600' : 'text-orange-600'
            }`}
          >
            {isValid ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>
              {isValid ? 'Campo válido' : 'Verifique o formato do campo'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernFloatingInput;
