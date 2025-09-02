# Vacant Room Listing Page

A comprehensive property management dashboard for displaying and managing vacant room listings.

## Structure

### Main Components

- **`index.tsx`** - Main page component with dashboard layout
- **`banner-card.tsx`** - Hero banner with call-to-action buttons
- **`room-listing-card.tsx`** - Individual room card component (grid/list views)
- **`room-filter-panel.tsx`** - Search and filter controls
- **`room-stats-card.tsx`** - Reusable stats card component

## Features

### Dashboard Overview
- Quick stats cards with sparkline charts
- Monthly occupancy rate chart
- Property type distribution
- Recent inquiries list
- Property occupancy donut chart

### Room Listings
- Grid and list view modes
- Room cards with images, details, and actions
- Price, location, amenities display
- Rating and review information
- Action buttons (view, edit, message)

### Filtering & Search
- Text search functionality
- Price range filtering
- Bedroom count filtering
- Location-based filtering
- Sort options (price, rating, newest)
- Active filter display with remove options

### Data Structure

```typescript
interface Room {
  id: string;
  title: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  image: string;
  status: string;
  rating: number;
  reviews: number;
  description: string;
}
```

## Usage

The page follows the same template structure as the explore page (`src/pages/dashboard/explore/index.tsx`) with:

- Responsive grid layouts
- Card-based UI components
- Chart visualizations
- Consistent styling with the project theme
- Modular component architecture

## Navigation

To access this page, add it to your routing configuration:

```typescript
// In your routes configuration
{
  path: "/management/property",
  element: <VacantRoomListing />
}
``` 