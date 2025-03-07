
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CuisineSelectorProps {
  onCuisineChange: (cuisine: string) => void;
}

const cuisines = [
  'All',
  'Italian',
  'Mexican',
  'Asian',
  'Indian',
  'Mediterranean',
  'American',
  'French',
  'Middle Eastern',
  'Vegetarian',
];

const CuisineSelector = ({ onCuisineChange }: CuisineSelectorProps) => {
  const [activeCuisine, setActiveCuisine] = useState('All');

  const handleCuisineClick = (cuisine: string) => {
    setActiveCuisine(cuisine);
    onCuisineChange(cuisine);
  };

  return (
    <div className="">
      <h3 className="text-md font-medium text-foreground/70 mb-3">
        Filter by cuisine
      </h3>
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => handleCuisineClick(cuisine)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeCuisine === cuisine
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 hover:bg-muted text-foreground/80'
            )}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineSelector;
