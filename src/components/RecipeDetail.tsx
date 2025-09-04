import React, { useEffect } from 'react';
import { 
  XMarkIcon, 
  ClockIcon, 
  UsersIcon, 
  PrinterIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@/types';
import { formatTime, formatServings, formatTag, scrollToTop } from '@/lib/utils';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  relatedRecipes?: Recipe[];
}

export default function RecipeDetail({ recipe, onClose, relatedRecipes = [] }: RecipeDetailProps) {
  // Scroll to top when recipe detail opens
  useEffect(() => {
    scrollToTop();
  }, [recipe.id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-brand-forest to-balance-teal text-white p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h1 className="text-xl lg:text-2xl font-bold mb-1">
              {recipe.title}
            </h1>
            <p className="text-green-100 text-sm">
              {recipe.description}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close recipe detail"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Compact Recipe Meta */}
        <div className="flex flex-wrap gap-4 mt-3 text-green-100 text-sm">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            <span className="font-medium">Prep: {formatTime(recipe.prep_time)}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            <span className="font-medium">Total: {formatTime(recipe.total_time)}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4" />
            <span className="font-medium">{formatServings(recipe.servings)}</span>
          </div>
          
          <button
            onClick={handlePrint}
            className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
          >
            <PrinterIcon className="h-3.5 w-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Content - Horizontal Layout on Desktop */}
      <div className="p-4 lg:p-6">
        {/* Tags - Compact */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {recipe.primary_tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-brand-forest text-white rounded-full">
                {formatTag(tag)}
              </span>
            ))}
            {recipe.tags.filter(tag => !recipe.primary_tags.includes(tag)).slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                {formatTag(tag)}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits & Nutrition Row - Horizontal on Desktop */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Wrestling Benefits */}
          <div className="bg-white border border-green-200 rounded-lg p-3">
            <h3 className="font-semibold text-sm text-green-800 mb-2">Wrestling Benefits</h3>
            <ul className="text-xs space-y-1">
              {recipe.wrestling_specific_benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition Highlights - Compact */}
          {recipe.nutrition_highlights && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h3 className="font-semibold text-sm text-gray-800 mb-2">Nutrition</h3>
              <div className="flex gap-4 text-xs">
                {recipe.nutrition_highlights.protein && (
                  <div>
                    <div className="text-lg font-bold text-green-700">
                      {recipe.nutrition_highlights.protein}
                    </div>
                    <div className="text-gray-600">Protein</div>
                  </div>
                )}
                {recipe.nutrition_highlights.carbohydrates && (
                  <div>
                    <div className="text-lg font-bold text-green-700">
                      {recipe.nutrition_highlights.carbohydrates}
                    </div>
                    <div className="text-gray-600">Carbs</div>
                  </div>
                )}
                {recipe.nutrition_highlights.calories && (
                  <div>
                    <div className="text-lg font-bold text-green-700">
                      {recipe.nutrition_highlights.calories}
                    </div>
                    <div className="text-gray-600">Calories</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Parent Peace of Mind */}
          {recipe.parent_peace_of_mind && recipe.parent_peace_of_mind.length > 0 && (
            <div className="bg-white border border-blue-200 rounded-lg p-3">
              <h3 className="font-semibold text-sm text-blue-800 mb-2">Peace of Mind</h3>
              <ul className="text-xs space-y-1">
                {recipe.parent_peace_of_mind.slice(0, 2).map((item, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Ingredients & Instructions Side by Side on Desktop */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Ingredients - Compact */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Ingredients</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      id={`ingredient-${index}`}
                      className="mt-0.5 h-3.5 w-3.5 text-brand-forest border-gray-300 rounded focus:ring-brand-forest"
                    />
                    <label htmlFor={`ingredient-${index}`} className="flex-1 cursor-pointer">
                      <span className="font-medium">{ingredient.quantity}</span>{' '}
                      <span>{ingredient.item}</span>
                      {ingredient.notes && (
                        <span className="text-text-muted text-xs block">
                          {ingredient.notes}
                        </span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions - Compact */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Instructions</h3>
            <div className="space-y-3">
              {recipe.instructions.map((instruction) => (
                <div key={instruction.step} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {instruction.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary leading-relaxed">
                      {instruction.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Variations - Only if exists, more compact */}
        {recipe.variations && recipe.variations.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-text-primary mb-3">Recipe Variations</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {recipe.variations.slice(0, 2).map((variation, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm text-trust-blue mb-1">
                    {variation.name}
                  </h4>
                  <p className="text-text-secondary text-xs">
                    {variation.modification}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Recipes - Compact */}
        {relatedRecipes.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-text-primary mb-3">Related Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {relatedRecipes.slice(0, 3).map((relatedRecipe) => (
                <div
                  key={relatedRecipe.id}
                  className="p-3 border border-gray-200 rounded-lg hover:border-brand-forest transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-sm text-text-primary mb-1 line-clamp-1">
                    {relatedRecipe.title}
                  </h4>
                  <p className="text-text-secondary text-xs line-clamp-2 mb-2">
                    {relatedRecipe.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <ClockIcon className="h-3 w-3" />
                    <span>{formatTime(relatedRecipe.total_time)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="pt-4 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="text-trust-blue hover:text-trust-blue/80 font-medium text-sm"
          >
            ← Back to Search Results
          </button>
        </div>
      </div>
    </div>
  );
}