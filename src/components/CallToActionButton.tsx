
import React from 'react';
import { Link } from 'react-router-dom';

interface CallToActionButtonProps {
  text: string;
  href: string;
  primary?: boolean;
  className?: string;
}

const CallToActionButton = ({ 
  text, 
  href, 
  primary = true, 
  className = '' 
}: CallToActionButtonProps) => {
  return (
    <Link
      to={href}
      className={`${
        primary ? 'btn-primary' : 'btn-secondary'
      } inline-block text-center ${className}`}
    >
      {text}
    </Link>
  );
};

export default CallToActionButton;
