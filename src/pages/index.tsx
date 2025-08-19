import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Recipe, SearchFilters, TagCategory } from '@/types';
import { RecipeSearchEngine, createSearchFilters } from '@/lib/search';
import { useIframeHeightUpdate } from '@/lib/iframe';
import { debounce } from '@/lib/utils';

// Import components (we'll create these next)
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import RecipeGrid from '@/components/RecipeGrid';
import RecipeDetail from '@/components/RecipeDetail';
import LoadingSpinner from '@/components/LoadingSpinner';


// Import all recipes from new modular structure
import { ALL_RECIPES } from '@/data/recipes';

// Use consolidated recipe array
const TEST_RECIPES: Recipe[] = ALL_RECIPES;

// Tag Mapper: Translate old/outdated tags to current ones without changing recipe files
const TAG_MAPPER: Record<string, string> = {
  // Fix hyphen inconsistencies (your JSON files use hyphens, filter uses spaces)
  'Dairy-Free': 'Dairy Free',
  'Gluten-Free': 'Gluten Free', 
  'Egg-Free': 'Egg Free',
  'Fish-Free': 'Fish Free',
  'Shellfish-Free': 'Shellfish Free',
  'Nut-Free': 'Nut Free',
  'Soy-Free': 'Soy Free',
  'Sesame-Free': 'Sesame Free',
  // Map the problematic tags that were showing zero results
  'Travel-Friendly': 'Travel Friendly',
  'Kid-Friendly': 'Kid Friendly',
  'Plant-Based': 'Plant Based',
  'Budget-Friendly': 'Budget Friendly',
  // Map any synonyms or old tags to current ones
  'Pre-Competition Fuel': 'Tournament Day Snacks',
  'Post Practice Recovery': 'Post-Practice Recovery',
  // Add more mappings as needed
};

// Helper function to normalize tags
const normalizeTag = (tag: string): string => TAG_MAPPER[tag] || tag;

const TAG_CATEGORIES: TagCategory[] = [
  {
    name: 'Competition Day',
    tags: ['Tournament Day Snacks', 'Hydration Support', 'Travel Friendly'],
    priority: 1
  },
  {
    name: 'Training & Recovery', 
    tags: ['Post-Practice Recovery', 'High-Protein', 'Healthy Weight Gain'],
    priority: 2
  },
  {
    name: 'Family Meals',
    tags: ['Wrestling Family Meals', 'Kid Friendly', 'Comfort Food', 'Plant Based'],
    priority: 3
  },
  {
    name: 'Quick Prep',
    tags: ['Quick Meals', 'One-Pan', 'Meal Prep Friendly', 'Make-Ahead', 'Budget Friendly'],
    priority: 4
  },
  {
    name: 'Dietary Needs',
    tags: [
      { name: 'Vegetarian', forceLineBreak: false },
      { name: 'Vegan', forceLineBreak: false },
      { name: 'Dairy Free', forceLineBreak: false },
      { name: 'Gluten Free', forceLineBreak: false },
      { name: 'Egg Free', forceLineBreak: true },
      { name: 'Fish Free', forceLineBreak: false },
      { name: 'Shellfish Free', forceLineBreak: false },
      { name: 'Nut Free', forceLineBreak: false },
      { name: 'Soy Free', forceLineBreak: false },
      { name: 'Sesame Free', forceLineBreak: false }
    ],
    priority: 5,
    collapsible: true
  }
];

export default function Home() {
  const [recipes] = useState<Recipe[]>(TEST_RECIPES);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(createSearchFilters());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const updateIframeHeight = useIframeHeightUpdate();

  // Initialize search engine
  const searchEngine = useMemo(() => new RecipeSearchEngine(recipes), [recipes]);

  // Search recipes based on current filters
  const searchResults = useMemo(() => {
    return searchEngine.search(searchFilters);
  }, [searchEngine, searchFilters]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((searchTerm: string) => {
      setSearchFilters(prev => ({ ...prev, searchTerm }));
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (searchTerm: string) => {
    debouncedSearch(searchTerm);
  };

  // Handle tag filter toggle
  const handleTagToggle = (tag: string) => {
    const normalizedTag = normalizeTag(tag);
    setSearchFilters(prev => ({
      ...prev,
      activeTags: prev.activeTags.includes(normalizedTag)
        ? prev.activeTags.filter(t => t !== normalizedTag)
        : [...prev.activeTags, normalizedTag]
    }));
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSearchFilters(createSearchFilters());
  };

  // Handle recipe selection
  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    updateIframeHeight();
  };

  // Handle recipe detail close
  const handleRecipeClose = () => {
    setSelectedRecipe(null);
    updateIframeHeight();
  };



  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      updateIframeHeight();
    }, 1000);

    return () => clearTimeout(timer);
  }, [updateIframeHeight]);

  // Update iframe height when results change
  useEffect(() => {
    updateIframeHeight();
  }, [searchResults, updateIframeHeight]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <Head>
          <title>Loading - The Wrestler&apos;s Meal and Snack Planner</title>
        </Head>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>The Wrestler&apos;s Meal and Snack Planner - Bullard Nutrition</title>
        <meta name="description" content="Instant recipe solutions for wrestling families. Find the perfect meal for your wrestler's specific needs in 30 seconds." />
      </Head>

      <div className="min-h-screen bg-bg-cream">
        {/* Header */}
        <header className="bg-white shadow-sm border-b-2 border-brand-forest">
          <div className="mobile-container lg:desktop-container py-6">
            <div className="text-center">
              <div className="h-12 mx-auto mb-4 relative">
                <Image 
                  src="/bullard-nutrition-logo.png" 
                  alt="Bullard Nutrition" 
                  width={200}
                  height={48}
                  className="h-12 w-auto mx-auto"
                  priority
                />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-brand-charcoal">
                The Wrestler&apos;s Meal and Snack Planner
              </h1>
              <p className="text-text-secondary mt-2">
                Instant Recipe Solutions for Wrestling Families
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mobile-container lg:desktop-container py-8">
          {selectedRecipe ? (
            /* Recipe Detail View */
            <RecipeDetail 
              recipe={selectedRecipe} 
              onClose={handleRecipeClose}
              relatedRecipes={searchEngine.getRelatedRecipes(selectedRecipe)}
            />
          ) : (
            /* Recipe Search View */
            <div className="space-y-6">
              {/* Search Bar */}
              <SearchBar
                value={searchFilters.searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by ingredient, meal type, or goal..."
              />

              {/* Filter Panel */}
              <FilterPanel
                tagCategories={TAG_CATEGORIES}
                activeTags={searchFilters.activeTags}
                onTagToggle={handleTagToggle}
                onClearAll={handleClearFilters}
              />

              {/* Results Count */}
              <div className="text-text-secondary">
                <span className="font-semibold">{searchResults.length}</span> recipe
                {searchResults.length !== 1 ? 's' : ''} found
              </div>

              {/* Recipe Grid */}
              <RecipeGrid
                searchResults={searchResults}
                onRecipeSelect={handleRecipeSelect}
              />

              {/* No Results Message */}
              {searchResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No recipes found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search or clearing some filters
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="btn-secondary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-brand-charcoal text-white py-8 mt-12">
          <div className="mobile-container lg:desktop-container text-center">
            <p className="text-sm">
              © 2025 Bullard Nutrition. Professional guidance for wrestling families.
            </p>
            <div className="mt-4">
              <span className="premium-badge-blue">
                RD Approved Recipes
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
