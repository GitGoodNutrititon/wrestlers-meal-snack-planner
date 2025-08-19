// General utility functions
import { clsx, type ClassValue } from 'clsx';

// Utility for combining class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format time strings consistently
export function formatTime(timeString: string): string {
  return timeString.replace(/mins?/i, 'min').replace(/hours?/i, 'hr');
}

// Parse time string to minutes for comparisons
export function parseTimeToMinutes(timeString: string): number {
  const match = timeString.match(/(\d+)\s*(min|hour|hr)/i);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  
  return unit.includes('hour') || unit.includes('hr') ? value * 60 : value;
}

// Format servings with proper pluralization
export function formatServings(servings: number): string {
  return `${servings} serving${servings !== 1 ? 's' : ''}`;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Debounce function for search input
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...funcArgs: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...funcArgs), wait);
  };
}

// Scroll to top of page
export function scrollToTop(): void {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Validate recipe data
export function validateRecipe(recipe: any): boolean {
  const requiredFields = ['id', 'title', 'description', 'tags', 'ingredients', 'instructions'];
  return requiredFields.every(field => recipe[field] != null);
}

// Format tag for display (remove hyphens, capitalize)
export function formatTag(tag: string): string {
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Get difficulty color class
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// Convert tag to URL-friendly slug
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Convert slug back to tag
export function slugToTag(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Analytics event tracking
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// Track recipe view
export function trackRecipeView(recipeId: string, recipeTags: string[]): void {
  trackEvent('recipe_view', {
    recipe_id: recipeId,
    recipe_tags: recipeTags.join(','),
    content_type: 'recipe'
  });
}

// Track search
export function trackSearch(searchTerm: string, resultCount: number): void {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount
  });
}

// Track filter usage
export function trackFilterUsage(filterType: string, filterValue: string): void {
  trackEvent('filter_used', {
    filter_type: filterType,
    filter_value: filterValue
  });
}

// Type guard for checking if we're in browser
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Local storage helpers with error handling
export function getFromStorage(key: string): string | null {
  if (!isBrowser()) return null;
  
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn('Could not access localStorage:', error);
    return null;
  }
}

export function setInStorage(key: string, value: string): void {
  if (!isBrowser()) return;
  
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn('Could not write to localStorage:', error);
  }
}

// Global type extension for gtag
declare global {
  interface Window {
    gtag?: (...gtagArgs: any[]) => void;
  }
}
