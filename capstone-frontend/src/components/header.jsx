// Import routing and icon components
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Header component with navigation and cart
export function Header() {
  // Get total items count from cart context
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center gap-2">
          <Store className="size-6" />
          <span className="text-xl">TechStore</span>
        </Link>
        
        {/* Navigation links - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="transition-colors hover:text-gray-600">
            Home
          </Link>
          <Link to="/products" className="transition-colors hover:text-gray-600">
            Products
          </Link>
        </nav>

        {/* Cart button with item count badge */}
        <Link to="/cart">
          <Button variant="outline" className="relative">
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0">
                {totalItems}
              </Badge>
            )}
            <span className="ml-2 hidden sm:inline">Cart</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
