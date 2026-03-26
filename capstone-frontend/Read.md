# Component Architecture

## Application Structure

```
App.jsx (Root)
├── Navbar.jsx (Global)
│   └── CartStore (Zustand)
│
├── Routes
│   ├── Home.jsx (/)
│   │   ├── SearchBar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Products.jsx
│   │   │   └── CartStore.addItem()
│   │   └── Pagination.jsx
│   │
│   ├── Cart.jsx (/cart)
│   │   └── CartStore (full access)
│   │
│   └── Other Pages...
│
└── Footer.jsx (Global)
```

## Component Responsibilities

### Layout Components

#### App.jsx
- Root component
- Routing configuration
- Global layout wrapper
- Responsive padding

#### Navbar.jsx
- Site navigation
- Cart summary display
- Responsive menu
- Links to Home and Cart

#### Footer.jsx
- Site footer
- Contact information
- Quick links
- Responsive grid layout

### Page Components

#### Home.jsx
**Purpose**: Main product listing page
**State**:
- products (array)
- selectedCategory (string)
- searchTerm (string)
- currentPage (number)
- totalPages (number)
- loading (boolean)

**Features**:
- Fetches products from API
- Manages search, filter, and pagination state
- Displays loading and empty states
- Coordinates child components

#### Cart.jsx
**Purpose**: Shopping cart management
**State**: Uses CartStore (Zustand)
**Features**:
- Display cart items
- Quantity adjustment
- Remove items
- Clear cart
- Calculate totals
- Checkout navigation

### Feature Components

#### Products.jsx
**Props**: products (array)
**Features**:
- Responsive grid layout
- Product cards with image, name, price, description
- Add to cart button
- Integrates with CartStore

#### SearchBar.jsx
**Props**: onSearch (function)
**State**: searchTerm (local)
**Features**:
- Text input for search
- Real-time search callback
- Responsive input styling

#### CategoryFilter.jsx
**Props**: 
- selectedCategory (string)
- onCategoryChange (function)
**Features**:
- Category buttons
- Visual feedback for selection
- Responsive button layout

#### Pagination.jsx
**Props**:
- currentPage (number)
- totalPages (number)
- onPageChange (function)
**Features**:
- Previous/Next navigation
- Page indicator
- Disabled state handling

## State Management

### CartStore (Zustand)
**Location**: `src/store/CartStore.js`

**State**:
```javascript
{
  items: [
    {
      _id: string,
      name: string,
      price: number,
      imageUrl: string,
      category: string,
      quantity: number
    }
  ]
}
```

**Actions**:
- `addItem(product)` - Add or increment product
- `removeItem(productId)` - Remove product from cart
- `updateQuantity(productId, quantity)` - Update quantity
- `clearCart()` - Remove all items
- `getTotalItems()` - Calculate total item count
- `getTotalPrice()` - Calculate total price

**Persistence**: Automatically saved to localStorage

## Data Flow

### Adding Product to Cart
```
Products.jsx
  └─> Click "Add to Cart"
      └─> CartStore.addItem(product)
          └─> Update items array
              └─> Save to localStorage
                  └─> Navbar updates cart count
```

### Searching Products
```
SearchBar.jsx
  └─> User types in input
      └─> onSearch(searchTerm) callback
          └─> Home.jsx updates searchTerm state
              └─> useEffect triggers
                  └─> ProductService.getProducts(category, searchTerm, page)
                      └─> API call to backend
                          └─> Update products state
                              └─> Products.jsx re-renders
```

### Filtering by Category
```
CategoryFilter.jsx
  └─> Click category button
      └─> onCategoryChange(category) callback
          └─> Home.jsx updates selectedCategory state
              └─> Reset currentPage to 1
                  └─> useEffect triggers
                      └─> Fetch filtered products
                          └─> Update products state
```

### Pagination
```
Pagination.jsx
  └─> Click Previous/Next
      └─> onPageChange(newPage) callback
          └─> Home.jsx updates currentPage state
              └─> useEffect triggers
                  └─> Fetch products for new page
                      └─> Update products state
```

## API Integration

### ProductService.js
**Location**: `src/services/ProductService.js`

**Functions**:
```javascript
getProducts(category, searchTerm, page, limit)
  └─> Builds query string
      └─> axios.get(`${baseUrl}products?${params}`)
          └─> Returns product data

getProductById(id)
  └─> axios.get(`${baseUrl}products/${id}`)
      └─> Returns single product
```

## Styling Approach

### TailwindCSS Utilities
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Flexbox: `flex`, `flex-col`, `gap-4`
- Grid: `grid`, `grid-cols-1`, `md:grid-cols-3`
- Spacing: `p-4`, `m-6`, `space-y-4`
- Colors: `bg-blue-600`, `text-white`
- Hover states: `hover:bg-blue-700`
- Transitions: `transition-colors`

### Responsive Grid Breakpoints
```
Mobile:    grid-cols-1           (< 640px)
Tablet:    sm:grid-cols-2        (640px+)
Desktop:   md:grid-cols-3        (768px+)
Large:     lg:grid-cols-4        (1024px+)
```

## Component Communication

### Parent → Child (Props)
- Home → Products: products array
- Home → SearchBar: onSearch callback
- Home → CategoryFilter: selectedCategory, onCategoryChange
- Home → Pagination: currentPage, totalPages, onPageChange

### Child → Parent (Callbacks)
- SearchBar → Home: onSearch(searchTerm)
- CategoryFilter → Home: onCategoryChange(category)
- Pagination → Home: onPageChange(page)

### Global State (Zustand)
- Any component → CartStore: Direct access
- CartStore → Components: Automatic re-render on change

## Error Handling

### API Errors
```javascript
try {
  const data = await getProducts(...)
  setProducts(data)
} catch (error) {
  console.error('Error fetching products:', error)
  setProducts([])
}
```

### Empty States
- No products: "No products found" message
- Empty cart: "Your Cart is Empty" with link to home

### Loading States
- Show "Loading..." while fetching data
- Disable buttons during operations

## Best Practices Used

1. **Functional Components**: All components use hooks
2. **Single Responsibility**: Each component has one clear purpose
3. **Prop Drilling Avoided**: Zustand for global state
4. **Responsive Design**: Mobile-first approach
5. **Error Handling**: Try-catch blocks and fallbacks
6. **Loading States**: User feedback during async operations
7. **Persistent Storage**: Cart saved to localStorage
8. **Clean Code**: Consistent naming and structure
9. **Reusable Components**: DRY principle
10. **Accessibility**: Semantic HTML and ARIA labels

## Performance Optimizations

1. **Pagination**: Limits data fetched per request
2. **Zustand**: Efficient state updates and re-renders
3. **Lazy Loading**: Could add for images
4. **Debouncing**: Could add for search input
5. **Memoization**: Could add for expensive calculations

## Future Enhancements

1. **Product Detail Modal**: Click product for details
2. **Image Gallery**: Multiple product images
3. **Wishlist**: Save products for later
4. **User Authentication**: Login/register
5. **Order History**: View past orders
6. **Reviews**: Product ratings and reviews
7. **Advanced Filters**: Price range, ratings, etc.
8. **Sort Options**: Price, name, popularity
9. **Checkout Flow**: Multi-step checkout
10. **Payment Integration**: Stripe/PayPal
