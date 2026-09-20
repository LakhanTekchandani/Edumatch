import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number | null;
  reviewCount?: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (newRating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  showText = true,
  size = 'md',
  interactive = false,
  onChange
}) => {
  // CRITICAL REQUIREMENT:
  // If an institute has no reviews: DO NOT display a fake 0 rating. Instead display "No reviews yet".
  if (rating === null || rating === 0 || (reviewCount !== undefined && reviewCount === 0)) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f3f3ef] border border-[#e3e3df] text-[#737373] text-xs font-medium">
        <Star className="w-3.5 h-3.5 text-[#737373] opacity-60" />
        <span>No reviews yet</span>
      </div>
    );
  }

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const rounded = Math.round(rating * 10) / 10;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= Math.floor(rating);
          const isHalf = !isFilled && starIndex <= Math.ceil(rating) && rating % 1 >= 0.3;

          return (
            <button
              key={starIndex}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starIndex)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              <Star
                className={`${iconSizes[size]} ${
                  isFilled
                    ? 'text-amber-500 fill-amber-500'
                    : isHalf
                    ? 'text-amber-500 fill-amber-500/40'
                    : 'text-[#d4d4ce] fill-[#f3f3ef]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showText && (
        <div className="flex items-baseline gap-1 text-[#0f1a0f] font-semibold text-xs">
          <span className="text-amber-600 font-bold">{rounded.toFixed(1)}</span>
          {reviewCount !== undefined && (
            <span className="text-[#737373] font-normal">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
};
