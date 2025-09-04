import React from 'react';
import { ClockIcon, UsersIcon } from '@heroicons/react/24/outline';
import { RecipeCardProps } from '@/types';
import { formatTime, formatServings, formatTag } from '@/lib/utils';

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Get primary tag (green) and secondary tags (gray)
  const getTagsToShow = () => {
    let primaryTag = null;
    let secondaryTags = [];

    // Get primary tag (will be green)
    if (recipe.primary_tags[0]) {
      primaryTag = recipe.primary_tags[0];
    } else if (recipe.tags.includes('High-Protein')) {
      primaryTag = 'High-Protein';
    }

    // Get 2 secondary tags (gray) - exclude the primary tag
    const availableSecondaryTags = recipe.tags.filter(tag => 
      tag !== primaryTag && 
      !recipe.primary_tags.includes(tag)
    );
    
    secondaryTags = availableSecondaryTags.slice(0, 2);

    return { primaryTag, secondaryTags };
  };


  return (
    <div
      className="group cursor-pointer flex flex-col relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View recipe for ${recipe.title}`}
    >
      {/* Subtle brand accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-forest"></div>

      {/* Recipe Content - More generous padding and spacing */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title - Clean and simple */}
        <h3 className="font-semibold text-text-primary text-base leading-tight mb-3 line-clamp-2">
          {recipe.title}
        </h3>

        {/* Description - Subtle gray */}
        <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
          {recipe.description}
        </p>

        {/* Single metadata line - All info in one place */}
        <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" />
            <span>{formatTime(recipe.total_time)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" />
            <span>{formatServings(recipe.servings)}</span>
          </div>

          {/* Protein info inline if available */}
          {recipe.nutrition_highlights.protein && (
            <span className="text-brand-forest font-medium">
              {recipe.nutrition_highlights.protein}
            </span>
          )}
        </div>

        {/* Tags - Primary (green) + Secondary (gray) */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {(() => {
              const { primaryTag, secondaryTags } = getTagsToShow();
              return (
                <>
                  {/* Primary tag - Green background */}
                  {primaryTag && (
                    <span className="text-xs px-2 py-1 bg-brand-forest text-white rounded-full font-medium">
                      {formatTag(primaryTag)}
                    </span>
                  )}
                  
                  {/* Secondary tags - Gray outline */}
                  {secondaryTags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-full">
                      {formatTag(tag)}
                    </span>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
        
        {/* View Recipe Button */}
        <div className="mt-auto">
          <button
            className="w-full bg-brand-forest text-white text-sm py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
