import React from 'react';
import { ClockIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';
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

  // Get priority tags for display (limit to 2 most important)
  const getPriorityTags = () => {
    const priorityTags = [];
    
    // Always show first primary tag
    if (recipe.primary_tags[0]) {
      priorityTags.push(recipe.primary_tags[0]);
    }
    
    // Show High-Protein if present (high value for wrestlers)
    if (recipe.tags.includes('High-Protein') && !priorityTags.includes('High-Protein')) {
      priorityTags.push('High-Protein');
    }
    
    return priorityTags.slice(0, 2);
  };

  // Get difficulty styling
  const getDifficultyStyle = (difficulty: string) => {
    const level = difficulty.toLowerCase();
    if (level.includes('easy')) return 'text-success bg-green-50 border-green-200';
    if (level.includes('hard')) return 'text-urgency-red bg-red-50 border-red-200';
    return 'text-action-orange bg-orange-50 border-orange-200';
  };

  return (
    <div
      className="group recipe-card-enhanced cursor-pointer flex flex-col relative bg-white rounded-xl min-h-[320px] border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View recipe for ${recipe.title}`}
    >
      {/* Brand Accent Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-forest to-balance-teal"></div>

      {/* Nutrition Badge - Repositioned to avoid title overlap */}
      {recipe.nutrition_highlights.protein && (
        <div className="absolute top-4 right-4 bg-green-50 border border-green-200 text-green-800 px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap z-10">
          {recipe.nutrition_highlights.protein} protein
        </div>
      )}

      {/* Recipe Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title - Enhanced Typography with space for nutrition badge */}
        <h3 className="recipe-title font-bold text-text-primary text-xl leading-tight mb-3 line-clamp-2 min-h-[3.5rem] pr-20">
          {recipe.title}
        </h3>

        {/* Description - Improved Hierarchy */}
        <p className="recipe-description text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 flex-grow min-h-[2.5rem]">
          {recipe.description}
        </p>

        {/* Recipe Metadata - Enhanced Styling */}
        <div className="recipe-metadata flex items-center gap-4 text-sm text-text-muted mb-4">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{formatTime(recipe.total_time)}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{formatServings(recipe.servings)}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <ChartBarIcon className="h-4 w-4 text-gray-400" />
            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyStyle(recipe.difficulty)}`}>
              {recipe.difficulty.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Priority Tags - Improved Display */}
        <div className="recipe-tags mb-5">
          <div className="flex flex-wrap gap-2">
            {getPriorityTags().map((tag) => (
              <span key={tag} className="recipe-tag-enhanced primary text-xs font-medium px-3 py-1.5 bg-brand-forest text-white rounded-full">
                {formatTag(tag)}
              </span>
            ))}
          </div>
        </div>
        
        {/* View Recipe Button - Enhanced Positioning */}
        <div className="recipe-card-actions mt-auto">
          <button
            className="w-full btn-trust text-sm py-3 font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-trust-blue focus:ring-opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View Full Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
