// Recipe Type Definitions for The Wrestler's Meal and Snack Planner
// Based on Recipe_Database_JSON_Schema.md

export interface Ingredient {
  item: string;
  quantity: string;
  notes?: string;
}

export interface Instruction {
  step: number;
  instruction: string;
}

export interface NutritionHighlights {
  protein?: string;
  carbohydrates?: string;
  calories?: string;
  key_nutrients?: string;
}

export interface TimingRecommendations {
  best_time?: string;
  avoid_time?: string;
  season_focus?: string;
}

export interface Variation {
  name: string;
  modification: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  
  // Tags for filtering
  tags: string[];
  primary_tags: string[];
  
  // Target audience
  archetype_appeal: string[];
  
  // Recipe content
  ingredients: Ingredient[];
  instructions: Instruction[];
  
  // Nutrition information
  nutrition_highlights: NutritionHighlights;
  nutrition_notes: string;
  
  // Wrestling-specific benefits
  wrestling_specific_benefits: string[];
  parent_peace_of_mind: string[];
  
  // Timing and variations
  timing_recommendations: TimingRecommendations;
  variations?: Variation[];
  
  // Additional metadata
  storage_instructions?: string;
  cost_estimate?: string;
  shopping_list_category?: string;
  equipment_needed?: string[];
  allergen_info?: string[];
  
  // System fields
  created_date: string;
  last_updated: string;
  rd_approved: boolean;
  user_rating?: number;
  user_reviews?: string[];
  related_recipes?: string[];
}

// Tag categories for filtering
export interface TagItem {
  name: string;
  forceLineBreak: boolean;
}

export interface TagCategory {
  name: string;
  tags: (string | TagItem)[];
  priority: number;
  collapsible?: boolean;
}

// Search and filter types
export interface SearchFilters {
  searchTerm: string;
  activeTags: string[];
  difficulty?: string;
  maxPrepTime?: number;
  servings?: number;
}

// Recipe database structure
export interface RecipeDatabase {
  recipes: Recipe[];
  tag_categories: TagCategory[];
  last_updated: string;
  version: string;
}

// Component prop types
export interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (selectedRecipe: Recipe) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (searchValue: string) => void;
  placeholder?: string;
}

export interface FilterPanelProps {
  tagCategories: TagCategory[];
  activeTags: string[];
  onTagToggle: (selectedTag: string) => void;
  onClearAll: () => void;
}

export interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

// Search result type
export interface SearchResult {
  recipe: Recipe;
  score?: number;
  matches?: string[];
}
