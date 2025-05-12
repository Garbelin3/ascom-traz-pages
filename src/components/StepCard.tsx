
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="bg-ascom text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </div>
  );
};

export default StepCard;
