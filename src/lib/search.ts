// Search and filtering utilities for recipes
import Fuse from 'fuse.js';
import { Recipe, SearchFilters, SearchResult } from '@/types';

export class RecipeSearchEngine {
  private recipes: Recipe[];
  private fuse: Fuse<Recipe>;

  constructor(recipes: Recipe[]) {
    this.recipes = recipes;
    this.fuse = new Fuse(recipes, {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'tags', weight: 0.2 },
        { name: 'ingredients.item', weight: 0.15 },
        { name: 'wrestling_specific_benefits', weight: 0.1 },
        { name: 'nutrition_notes', weight: 0.05 }
      ],
      threshold: 0.4, // Adjust sensitivity (0 = exact match, 1 = match anything)
      includeScore: true,
      includeMatches: true,
    });
  }

  search(filters: SearchFilters): SearchResult[] {
    let results: Recipe[] = this.recipes;

    // Apply text search
    if (filters.searchTerm.trim()) {
      const fuseResults = this.fuse.search(filters.searchTerm);
      results = fuseResults.map(result => result.item);
    }

    // Apply tag filters
    if (filters.activeTags.length > 0) {
      results = results.filter(recipe =>
        filters.activeTags.every(tag =>
          recipe.tags.includes(tag) || recipe.primary_tags.includes(tag)
        )
      );
    }

    // Apply difficulty filter
    if (filters.difficulty && filters.difficulty !== 'All') {
      results = results.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    // Apply prep time filter
    if (filters.maxPrepTime) {
      results = results.filter(recipe => {
        const prepMinutes = this.parseTimeToMinutes(recipe.prep_time);
        return prepMinutes <= filters.maxPrepTime!;
      });
    }

    // Apply servings filter
    if (filters.servings) {
      results = results.filter(recipe => recipe.servings >= filters.servings!);
    }

    // Convert to SearchResult format
    return results.map(recipe => ({
      recipe,
      score: 1, // Could be enhanced with actual scoring
    }));
  }

  private parseTimeToMinutes(timeString: string): number {
    const match = timeString.match(/(\d+)\s*(min|hour)/i);
    if (!match) return 0;
    
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    
    return unit.includes('hour') ? value * 60 : value;
  }

  // Get all unique tags for filter UI
  getAllTags(): string[] {
    const tagSet = new Set<string>();
    this.recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tagSet.add(tag));
      recipe.primary_tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  // Get recipes by specific tag
  getRecipesByTag(tag: string): Recipe[] {
    return this.recipes.filter(recipe =>
      recipe.tags.includes(tag) || recipe.primary_tags.includes(tag)
    );
  }

  // Get related recipes based on tags
  getRelatedRecipes(recipe: Recipe, limit: number = 3): Recipe[] {
    const relatedRecipes = this.recipes
      .filter(r => r.id !== recipe.id)
      .map(r => ({
        recipe: r,
        score: this.calculateSimilarityScore(recipe, r)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.recipe);

    return relatedRecipes;
  }

  private calculateSimilarityScore(recipe1: Recipe, recipe2: Recipe): number {
    const tags1 = new Set(recipe1.tags.concat(recipe1.primary_tags));
    const tags2 = new Set(recipe2.tags.concat(recipe2.primary_tags));
    
    const intersection = new Set(Array.from(tags1).filter(tag => tags2.has(tag)));
    const union = new Set(Array.from(tags1).concat(Array.from(tags2)));
    
    return intersection.size / union.size; // Jaccard similarity
  }
}

// Utility function to create search filters
export function createSearchFilters(overrides: Partial<SearchFilters> = {}): SearchFilters {
  return {
    searchTerm: '',
    activeTags: [],
    difficulty: undefined,
    maxPrepTime: undefined,
    servings: undefined,
    ...overrides,
  };
}
