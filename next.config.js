/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: 'export',
  
  // Optimize for iframe embedding
  trailingSlash: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true
  },
  
  // Security headers handled by Netlify (see netlify.toml)
  
  // Environment variables
  env: {
    SITE_NAME: 'The Wrestler\'s Meal and Snack Planner',
    SITE_DESCRIPTION: 'Instant recipe solutions for wrestling families',
    ALLOWED_DOMAINS: 'bullardnutrition.com,www.bullardnutrition.com,bullardnutrition.squarespace.com,squarespace.com'
  }
}

module.exports = nextConfig
