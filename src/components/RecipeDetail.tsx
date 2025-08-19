import React, { useEffect } from 'react';
import { 
  XMarkIcon, 
  ClockIcon, 
  UsersIcon, 
  ChartBarIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@/types';
import { formatTime, formatServings, getDifficultyColor, formatTag, scrollToTop } from '@/lib/utils';

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
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-forest to-balance-teal text-white p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {recipe.title}
            </h1>
            <p className="text-green-100 text-lg">
              {recipe.description}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close recipe detail"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Recipe Meta */}
        <div className="flex flex-wrap gap-6 mt-6 text-green-100">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            <span className="font-medium">Prep: {formatTime(recipe.prep_time)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            <span className="font-medium">Total: {formatTime(recipe.total_time)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            <span className="font-medium">{formatServings(recipe.servings)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5" />
            <span className={`px-3 py-1 rounded-pill text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <PrinterIcon className="h-4 w-4" />
            <span className="text-sm">Print</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Tags */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3">Recipe Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.primary_tags.map((tag) => (
              <span key={tag} className="recipe-tag primary">
                {formatTag(tag)}
              </span>
            ))}
            {recipe.tags.filter(tag => !recipe.primary_tags.includes(tag)).map((tag) => (
              <span key={tag} className="recipe-tag">
                {formatTag(tag)}
              </span>
            ))}
          </div>
        </div>

        {/* Wrestling Benefits */}
        <div className="callout-success">
          <h3 className="font-semibold mb-3">Wrestling-Specific Benefits</h3>
          <ul className="check-list">
            {recipe.wrestling_specific_benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Parent Peace of Mind */}
        {recipe.parent_peace_of_mind && recipe.parent_peace_of_mind.length > 0 && (
          <div className="callout-info">
            <h3 className="font-semibold mb-3">Parent Peace of Mind</h3>
            <ul className="check-list">
              {recipe.parent_peace_of_mind.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Nutrition Information */}
        {recipe.nutrition_highlights && (
          <div className="bg-bg-light-green p-6 rounded-xl">
            <h3 className="font-semibold text-green-800 mb-4">Nutrition Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {recipe.nutrition_highlights.protein && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {recipe.nutrition_highlights.protein}
                  </div>
                  <div className="text-sm text-green-600">Protein</div>
                </div>
              )}
              {recipe.nutrition_highlights.carbohydrates && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {recipe.nutrition_highlights.carbohydrates}
                  </div>
                  <div className="text-sm text-green-600">Carbs</div>
                </div>
              )}
              {recipe.nutrition_highlights.calories && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {recipe.nutrition_highlights.calories}
                  </div>
                  <div className="text-sm text-green-600">Calories</div>
                </div>
              )}
            </div>
            {recipe.nutrition_notes && (
              <p className="text-green-800 text-sm leading-relaxed">
                {recipe.nutrition_notes}
              </p>
            )}
          </div>
        )}

        {/* Timing Recommendations */}
        {recipe.timing_recommendations && (
          <div className="callout-warning">
            <h3 className="font-semibold mb-3">Timing Recommendations</h3>
            <div className="space-y-2 text-sm">
              {recipe.timing_recommendations.best_time && (
                <div>
                  <strong>Best Time:</strong> {recipe.timing_recommendations.best_time}
                </div>
              )}
              {recipe.timing_recommendations.avoid_time && (
                <div>
                  <strong>Avoid:</strong> {recipe.timing_recommendations.avoid_time}
                </div>
              )}
              {recipe.timing_recommendations.season_focus && (
                <div>
                  <strong>Season Focus:</strong> {recipe.timing_recommendations.season_focus}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div>
          <h3 className="font-semibold text-text-primary mb-4">Ingredients</h3>
          <div className="bg-bg-cream p-6 rounded-xl">
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`ingredient-${index}`}
                    className="mt-1 h-4 w-4 text-brand-forest border-gray-300 rounded focus:ring-brand-forest"
                  />
                  <label htmlFor={`ingredient-${index}`} className="flex-1 cursor-pointer">
                    <span className="font-medium">{ingredient.quantity}</span>{' '}
                    <span>{ingredient.item}</span>
                    {ingredient.notes && (
                      <span className="text-text-muted text-sm block">
                        {ingredient.notes}
                      </span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="font-semibold text-text-primary mb-4">Instructions</h3>
          <div className="space-y-4">
            {recipe.instructions.map((instruction) => (
              <div key={instruction.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {instruction.step}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-text-primary leading-relaxed">
                    {instruction.instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Variations */}
        {recipe.variations && recipe.variations.length > 0 && (
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Recipe Variations</h3>
            <div className="space-y-3">
              {recipe.variations.map((variation, index) => (
                <div key={index} className="bg-bg-light-blue p-4 rounded-lg">
                  <h4 className="font-medium text-trust-blue mb-2">
                    {variation.name}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {variation.modification}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Related Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedRecipes.map((relatedRecipe) => (
                <div
                  key={relatedRecipe.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-brand-forest transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-text-primary mb-1">
                    {relatedRecipe.title}
                  </h4>
                  <p className="text-text-secondary text-sm line-clamp-2">
                    {relatedRecipe.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
                    <ClockIcon className="h-3 w-3" />
                    <span>{formatTime(relatedRecipe.total_time)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-secondary w-full md:w-auto"
          >
            ← Back to Search Results
          </button>
        </div>
      </div>
    </div>
  );
}
