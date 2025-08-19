# The Wrestler's Meal and Snack Planner

Interactive recipe database for wrestling families - Built for Bullard Nutrition

## 🎯 Project Overview

A Next.js application designed exclusively for embedding in Squarespace membership sites via iframe. Provides instant, searchable access to wrestling-specific recipes with professional RD guidance.

### Key Features

- **Instant Search**: Find recipes in 30 seconds, not 30 minutes
- **Wrestling-Specific**: Recipes designed for tournament days, weight cutting, recovery
- **Mobile-First**: Optimized for parents on-the-go at tournaments
- **Brand Consistent**: Integrates seamlessly with Bullard Nutrition branding
- **Membership Protected**: Access control via Squarespace referrer checking

## 🛠 Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS + Bullard Nutrition brand utilities
- **Search**: Fuse.js for fuzzy search capabilities
- **Hosting**: Netlify (optimized for free tier)
- **Data**: JSON files (AI agent managed, version controlled)
- **Icons**: Heroicons

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd wrestlers-meal-snack-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Search input with debouncing
│   ├── FilterPanel.tsx # Tag-based filtering
│   ├── RecipeCard.tsx  # Recipe preview cards
│   ├── RecipeGrid.tsx  # Grid layout for recipes
│   └── RecipeDetail.tsx# Full recipe view
├── lib/                # Utility functions
│   ├── auth.ts         # Squarespace access control
│   ├── search.ts       # Recipe search engine
│   ├── iframe.ts       # Parent communication
│   └── utils.ts        # General utilities
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # HTML document
│   └── index.tsx       # Main recipe finder
├── styles/             # CSS files
│   └── globals.css     # Tailwind + brand styles
└── types/              # TypeScript definitions
    ├── recipe.ts       # Recipe data types
    └── index.ts        # Exported types
```

## 🎨 Styling & Branding

The app uses Bullard Nutrition's established brand colors and design system:

- **Primary Colors**: Forest Green (#006a39), Charcoal (#251f21)
- **Action Colors**: Orange (#F97316), Trust Blue (#1E40AF)
- **Typography**: Inter for headings, Open Sans for body
- **Mobile-First**: Optimized spacing and touch targets

## 🔍 Search & Filtering

### Search Engine Features

- **Fuzzy Search**: Powered by Fuse.js for typo tolerance
- **Multi-field**: Searches title, description, tags, ingredients
- **Tag Filtering**: Wrestling-specific categories (Tournament Day, Weight Cutting, etc.)
- **Real-time Results**: Debounced search with instant filtering

### Tag Categories

1. **Wrestling Needs**: Tournament Day Snacks, Safe Weight Cutting, Post Weigh-In Recovery
2. **Nutrition Goals**: High-Protein, Hydration Support, Quick Meals
3. **Convenience**: Travel-Friendly, Meal Prep Friendly

## 🔒 Authentication & Security

### Access Control

- **Referrer-based**: Checks if traffic comes from allowed Bullard Nutrition domains
- **Development Mode**: Authentication bypassed for local development
- **Graceful Degradation**: Shows branded access denied message

### Security Headers

- X-Frame-Options: SAMEORIGIN
- Content-Security-Policy: Restricts iframe parents to Bullard Nutrition domains
- X-Content-Type-Options: nosniff

## 📱 Squarespace Integration

### Iframe Embedding

The app is designed exclusively for iframe embedding in Squarespace:

```html
<div class="recipe-finder-container">
  <iframe 
    src="https://your-app.netlify.app"
    width="100%" 
    height="800px"
    frameborder="0"
    scrolling="auto"
    title="Wrestler's Meal and Snack Planner">
  </iframe>
</div>
```

### Dynamic Height

- Automatic height adjustment via postMessage
- Responsive to content changes
- Mobile-optimized viewport handling

## 🚀 Deployment

### Netlify Configuration

The app is configured for Netlify deployment:

- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 18

### Environment Variables

```bash
ALLOWED_DOMAINS=bullardnutrition.com,www.bullardnutrition.com,bullardnutrition.squarespace.com
NODE_ENV=production
```

### GitHub Actions

Automated deployment on push to main branch:

```yaml
# .github/workflows/deploy.yml
- Build and test
- Deploy to Netlify
- Update iframe height
```

## 📊 Analytics & Tracking

### Event Tracking

- Recipe views with tags
- Search queries and result counts
- Filter usage patterns
- User engagement metrics

### Performance Monitoring

- Page load times
- Search response times
- Mobile usability metrics

## 🧪 Testing

### Component Tests

```bash
npm run test
```

### Manual Testing Checklist

- [ ] Search functionality
- [ ] Filter combinations
- [ ] Mobile responsiveness
- [ ] Iframe height adjustment
- [ ] Authentication flow

## 📈 Performance Optimization

### Current Optimizations

- **Static Export**: Pre-built for fast loading
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Dynamic imports for large components
- **Debounced Search**: Reduces API calls
- **Memoization**: React.useMemo for expensive calculations

### Metrics Targets

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3s
- **Mobile Usability**: 100%

## 🔧 Development Guidelines

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Prettier for formatting
- Semantic commit messages

### Component Patterns

- Functional components with hooks
- TypeScript interfaces for props
- Accessibility attributes (ARIA labels, keyboard navigation)
- Mobile-first responsive design

## 📚 Recipe Data Management

### JSON Schema

Recipes follow a standardized schema defined in `src/types/recipe.ts`:

- Required fields: id, title, description, tags, ingredients, instructions
- Wrestling-specific fields: benefits, timing, archetype appeal
- Metadata: RD approval, creation date, related recipes

### Content Updates

- AI agents manage recipe creation and updates
- Version controlled via Git
- Automatic validation before deployment
- Schema compliance checking

## 🤝 Contributing

### Development Workflow

1. Create feature branch from main
2. Implement changes with tests
3. Run linting and type checking
4. Submit pull request
5. Automated deployment on merge

### Recipe Content

- All recipes must be RD-approved
- Follow established tag taxonomy
- Include wrestling-specific benefits
- Provide timing recommendations

## 📞 Support

For technical issues or questions:

- **Repository**: GitHub repository for this project
- **Documentation**: See Technical Implementation Guide
- **Brand Guidelines**: Reference Bullard Nutrition style guide

---

Built with ❤️ for wrestling families by Bullard Nutrition
