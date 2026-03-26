// Cart store - global state management for shopping cart using Zustand
// Persists cart data to localStorage for persistence across sessions

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create cart store with persistent storage
export const useCartStore = create(
  persist(
    (set, get) => ({
      // Array to store cart items
      items: [],
      
      // Add product to cart or increment quantity if already exists
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item._id === product._id);
        if (existingItem) {
          // Increment quantity if product already in cart
          return {
            items: state.items.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        // Add new product with quantity 1
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      
      // Remove item from cart by product ID
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item._id !== productId)
      })),
      
      // Update item quantity or remove if quantity is 0
      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity > 0
          ? state.items.map(item =>
              item._id === productId ? { ...item, quantity } : item
            )
          : state.items.filter(item => item._id !== productId)
      })),
      
      // Clear all items from cart
      clearCart: () => set({ items: [] }),
      
      // Calculate total number of items in cart
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Calculate total price of all items in cart
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      // Store cart data in localStorage under 'cart-storage' key
      name: 'cart-storage'
    }
  )
);