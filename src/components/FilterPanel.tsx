import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { FilterPanelProps } from '@/types';
import { formatTag } from '@/lib/utils';

export default function FilterPanel({ 
  tagCategories, 
  activeTags, 
  onTagToggle, 
  onClearAll 
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center justify-between w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-200 mb-2 border border-gray-200"
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
              ) : (
                <h4 className="text-sm font-medium text-text-secondary mb-2">
                  {category.name}
                </h4>
              )}

              {/* Category Tags */}
              {(!isCollapsible || isCategoryExpanded) && (
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag, index) => {
                    const tagName = typeof tag === 'string' ? tag : tag.name;
                    const forceLineBreak = typeof tag === 'object' ? tag.forceLineBreak : false;
                    const isActive = activeTags.includes(tagName);
                    
                    return (
                      <React.Fragment key={tagName}>
                        <button
                          onClick={() => handleTagClick(tagName)}
                          className={`filter-button ${isActive ? 'active' : ''}`}
                          aria-pressed={isActive}
                        >
                          {formatTag(tagName)}
                        </button>
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
                <button
                  key={tagName}
                  onClick={() => handleTagClick(tagName)}
                  className={`filter-button ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                >
                  {formatTag(tagName)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
