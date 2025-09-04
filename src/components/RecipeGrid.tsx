import React from 'react';
import { SearchResult, Recipe } from '@/types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  searchResults: SearchResult[];
  onRecipeSelect: (recipe: Recipe) => void;
}

export default function RecipeGrid({ searchResults, onRecipeSelect }: RecipeGridProps) {
  if (searchResults.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {searchResults.map((result) => (
        <RecipeCard
          key={result.recipe.id}
          recipe={result.recipe}
          onClick={onRecipeSelect}
        />
      ))}
    </div>
  );
}
