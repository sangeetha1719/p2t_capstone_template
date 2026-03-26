# Capstone Frontend - E-Commerce Application

A modern, responsive e-commerce frontend built with React, TailwindCSS, and Zustand for state management.

## Features

### 1. Product Catalog
- **Browse Products**: Grid layout with responsive design
- **Search Functionality**: Real-time search by product name
- **Category Filters**: Filter products by Electronics, Clothing, Accessories
- **Pagination**: Navigate through products with page controls
- **Product Cards**: Display product image, name, category, price, and description
- **Add to Cart**: Quick add-to-cart button on each product

### 2. Shopping Cart
- **View Cart Items**: See all items added to cart with images and details
- **Adjust Quantities**: Increase/decrease item quantities with +/- buttons
- **Remove Items**: Remove individual items from cart
- **Clear Cart**: Remove all items at once
- **Price Calculation**: Real-time total price calculation
- **Persistent Storage**: Cart data saved in localStorage
- **Empty Cart State**: Friendly message with link to continue shopping
- **Checkout**: Proceed to checkout button

### 3. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **TailwindCSS**: Modern utility-first CSS framework
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size
- **Flexible Navigation**: Collapsible menu for mobile devices
- **Touch-Friendly**: Large buttons and touch targets
- **Responsive Typography**: Scales appropriately across devices

### 4. API Integration
- **Backend Connection**: Connects to Express backend at `http://localhost:3500`
- **Product Service**: Fetches products with filters, search, and pagination
- **Error Handling**: Graceful error handling for API failures
- **Loading States**: Shows loading indicators during data fetch

## Tech Stack

- **React 19**: Latest React with hooks
- **React Router**: Client-side routing
- **TailwindCSS 4**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library
- **Vite**: Fast build tool and dev server

## Project Structure

```
capstone-frontend/
├── src/
│   ├── components/
│   │   ├── CategoryFilter.jsx    # Category filter buttons
│   │   ├── Footer.jsx             # Footer with links and info
│   │   ├── Navbar.jsx             # Navigation with cart summary
│   │   ├── Pagination.jsx         # Pagination controls
│   │   ├── Products.jsx           # Product grid display
│   │   └── SearchBar.jsx          # Search input component
│   ├── pages/
│   │   ├── Cart.jsx               # Shopping cart page
│   │   ├── Home.jsx               # Home page with products
│   │   └── ...                    # Other pages
│   ├── services/
│   │   └── ProductService.js      # API service for products
│   ├── store/
│   │   └── CartStore.js           # Zustand cart state management
│   ├── styles/
│   │   └── index.css              # Global styles
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── package.json
└── vite.config.js
```

## Installation

1. Navigate to the frontend directory:
```bash
cd capstone-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints Used

- `GET /products` - Fetch all products
  - Query params: `category`, `search`, `page`, `limit`
- `GET /products/:id` - Fetch single product by ID

## State Management

### Cart Store (Zustand)
- `items` - Array of cart items
- `addItem(product)` - Add product to cart
- `removeItem(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Clear all items
- `getTotalItems()` - Get total item count
- `getTotalPrice()` - Get total cart price

## Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 768px (2 columns)
- **Desktop**: 768px - 1024px (3 columns)
- **Large Desktop**: > 1024px (4 columns)

## Key Features Implementation

### Search
- Debounced search input
- Searches product names
- Resets to page 1 on new search

### Filters
- Category-based filtering
- Visual feedback for selected category
- Resets to page 1 on filter change

### Pagination
- Shows current page and total pages
- Previous/Next navigation
- Disabled buttons at boundaries
- Maintains filters and search across pages

### Cart
- Persistent storage with localStorage
- Real-time updates
- Quantity validation (min: 1)
- Automatic removal when quantity reaches 0
- Total price calculation with 2 decimal places

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Product detail pages
- User authentication
- Order history
- Wishlist functionality
- Product reviews and ratings
- Advanced filtering (price range, ratings)
- Sort options (price, name, popularity)
