'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  showValue?: boolean;
}

export default function StarRating({
  value,
  onChange,
  max = 5,
  size = 'md',
  interactive = false,
  showValue = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeClasses = {
    sm: 'size-3.5',
    md: 'size-5',
    lg: 'size-7',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => interactive && setHovered(0)}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const halfValue = i + 0.5;
          const displayValue = interactive && hovered > 0 ? hovered : value;
          const isFull = displayValue >= starValue;
          const isHalf = !isFull && displayValue >= halfValue;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHovered(starValue)}
              className={cn(
                'relative transition-transform',
                interactive && 'cursor-pointer hover:scale-110'
              )}
            >
              {isHalf ? (
                <span className="relative inline-block">
                  <Star
                    className={cn(sizeClasses[size], 'text-white/20 fill-white/20')}
                  />
                  <span
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: '50%' }}
                  >
                    <Star
                      className={cn(
                        sizeClasses[size],
                        'text-amber-500 fill-amber-500'
                      )}
                    />
                  </span>
                </span>
              ) : (
                <Star
                  className={cn(
                    sizeClasses[size],
                    isFull
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-white/20 fill-white/20'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className={cn(textClasses[size], 'text-amber-400 font-semibold ml-1')}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
