import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { FilterPanelProps } from '@/types';
import { formatTag } from '@/lib/utils';
import Tooltip from '@/components/Tooltip';

export default function FilterPanel({ 
  tagCategories, 
  activeTags, 
  onTagToggle, 
  onClearAll 
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Get tooltip content for categories and tags
  const getCategoryTooltip = (categoryName: string): string => {
    switch (categoryName) {
      case 'Competition Day':
        return 'Recipes optimized for tournament performance and travel';
      case 'Training & Recovery':
        return 'Post-workout nutrition for muscle repair and growth';
      case 'Family Meals':
        return 'Crowd-pleasing recipes that work for the whole wrestling family';
      case 'Quick Prep':
        return 'Fast and efficient meals for busy wrestling schedules';
      case 'Dietary Needs':
        return 'Recipes that accommodate various dietary restrictions and allergies';
      default:
        return `Filter recipes by ${categoryName.toLowerCase()}`;
    }
  };

  const getTagTooltip = (tagName: string): string => {
    const tooltips: Record<string, string> = {
      // Competition Day
      'Tournament Day Snacks': 'Energy-dense snacks perfect for tournament days',
      'Hydration Support': 'Recipes that help maintain optimal hydration levels',
      'Travel Friendly': 'Portable meals that travel well to competitions',

      // Training & Recovery
      'Post-Practice Recovery': 'Meals to maximize recovery after intense training',
      'High-Protein': 'High protein content for muscle building and repair',
      'Healthy Weight Gain': 'Nutrient-dense recipes to support healthy weight gain',

      // Family Meals
      'Wrestling Family Meals': 'Meals that satisfy the whole wrestling family',
      'Kid Friendly': 'Recipes that appeal to younger wrestlers',
      'Comfort Food': 'Satisfying meals that provide emotional comfort',
      'Plant Based': 'Plant-focused nutrition for wrestling performance',

      // Quick Prep
      'Quick Meals': 'Meals ready in 30 minutes or less',
      'One-Pan': 'Simple one-pan meals with easy cleanup',
      'Meal Prep Friendly': 'Recipes perfect for weekly meal preparation',
      'Make-Ahead': 'Can be prepared in advance for busy schedules',
      'Budget Friendly': 'Affordable recipes for cost-conscious families',

      // Dietary Needs
      'Vegetarian': 'No meat, but may include dairy and eggs',
      'Vegan': 'Completely plant-based with no animal products',
      'Dairy Free': 'No milk, cheese, or other dairy products',
      'Gluten Free': 'Safe for those with gluten sensitivity or celiac disease',
      'Egg Free': 'No eggs or egg-derived ingredients',
      'Fish Free': 'No fish or seafood ingredients',
      'Shellfish Free': 'Safe for those with shellfish allergies',
      'Nut Free': 'Free from tree nuts and peanuts',
      'Soy Free': 'No soy or soy-derived ingredients',
      'Sesame Free': 'Free from sesame seeds and sesame oil'
    };

    return tooltips[tagName] || `Filter recipes that are ${tagName.toLowerCase()}`;
  };

  const handleTagClick = (tag: string) => {
    onTagToggle(tag);
  };

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const activeTagCount = activeTags.length;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-text-primary">
            Filter by Need
          </h3>
          {activeTagCount > 0 && (
            <span className="bg-brand-forest text-white text-xs px-2 py-1 rounded-pill">
              {activeTagCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeTagCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-text-muted hover:text-urgency-red transition-colors"
            >
              Clear All
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            Filters
            {isExpanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`mt-4 space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {tagCategories.map((category) => {
          const isCategoryExpanded = expandedCategories.has(category.name);
          const isCollapsible = category.collapsible;
          
          return (
            <div key={category.name}>
              {/* Category Header */}
              {isCollapsible ? (
                <Tooltip content={getCategoryTooltip(category.name)} position="top">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="flex items-center justify-between w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-200 mb-2 border border-gray-200 cursor-pointer"
                    aria-expanded={isCategoryExpanded}
                    title={isCategoryExpanded ? `Hide ${category.name} options` : `Show ${category.name} options`}
                  >
                    <div className="flex items-center gap-2">
                      {category.name}
                      {!isCategoryExpanded && (
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                          {category.tags.length} options
                        </span>
                      )}
                    </div>
                    {isCategoryExpanded ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-brand-forest" />
                    )}
                  </button>
                </Tooltip>
              ) : (
                <Tooltip content={getCategoryTooltip(category.name)} position="top">
                  <h4 className="text-sm font-medium text-text-secondary mb-2 cursor-help">
                    {category.name}
                  </h4>
                </Tooltip>
              )}

              {/* Category Tags */}
              {(!isCollapsible || isCategoryExpanded) && (
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag) => {
                    const tagName = typeof tag === 'string' ? tag : tag.name;
                    const forceLineBreak = typeof tag === 'object' ? tag.forceLineBreak : false;
                    const isActive = activeTags.includes(tagName);
                    
                    return (
                      <React.Fragment key={tagName}>
                        <Tooltip content={getTagTooltip(tagName)} position="top" delay={300}>
                          <button
                            onClick={() => handleTagClick(tagName)}
                            className={`filter-button text-sm px-3 py-1.5 rounded-full border transition-all duration-200 cursor-help ${
                              isActive 
                                ? 'bg-green-50 text-brand-forest border-brand-forest font-semibold shadow-sm' 
                                : 'bg-white text-text-secondary border-gray-200 hover:border-brand-forest hover:text-brand-forest'
                            }`}
                            aria-pressed={isActive}
                          >
                            {formatTag(tagName)}
                          </button>
                        </Tooltip>
                        {forceLineBreak && <div className="w-full"></div>}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Filters (Mobile) */}
      {!isExpanded && (
        <div className="mt-4 lg:hidden">
          <div className="flex flex-wrap gap-2">
            {tagCategories[0]?.tags.slice(0, 3).map((tag) => {
              const tagName = typeof tag === 'string' ? tag : tag.name;
              const isActive = activeTags.includes(tagName);
              return (
                <Tooltip key={tagName} content={getTagTooltip(tagName)} position="top" delay={300}>
                  <button
                    onClick={() => handleTagClick(tagName)}
                    className={`filter-button text-sm px-3 py-1.5 rounded-full border transition-all duration-200 cursor-help ${
                      isActive 
                        ? 'bg-green-50 text-brand-forest border-brand-forest font-semibold shadow-sm' 
                        : 'bg-white text-text-secondary border-gray-200 hover:border-brand-forest hover:text-brand-forest'
                    }`}
                    aria-pressed={isActive}
                  >
                    {formatTag(tagName)}
                  </button>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
