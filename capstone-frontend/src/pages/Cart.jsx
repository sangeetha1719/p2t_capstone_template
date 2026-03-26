// // Cart page component - displays shopping cart with item management
// // Allows users to view, update quantities, remove items, and proceed to checkout

// import React from 'react';
// import { useCartStore } from '../store/CartStore';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//   // Access cart state and actions from Zustand store
//   const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

//   // Show empty cart message if no items
//   if (items.length === 0) {
//     return (
//       <main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
//         <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
//         <Link to="/" className="text-blue-600 underline hover:text-blue-800">
//           Continue Shopping
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-4xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      
//       {/* Cart items list */}
//       <div className="space-y-4">
//         {items.map((item) => (
//           <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg items-center">
//             <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
            
//             {/* Product details */}
//             <div className="flex-1 text-center sm:text-left">
//               <h3 className="font-semibold text-lg">{item.name}</h3>
//               <p className="text-gray-600 text-sm">{item.category}</p>
//               <p className="font-bold text-blue-600">${item.price}</p>
//             </div>
            
//             {/* Quantity controls */}
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={() => updateQuantity(item._id, item.quantity - 1)} 
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 -
//               </button>
//               <span className="min-w-[30px] text-center font-semibold">{item.quantity}</span>
//               <button 
//                 onClick={() => updateQuantity(item._id, item.quantity + 1)} 
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 +
//               </button>
//             </div>
            
//             {/* Item subtotal */}
//             <p className="font-bold min-w-[80px] text-center">${(item.price * item.quantity).toFixed(2)}</p>
            
//             {/* Remove button */}
//             <button 
//               onClick={() => removeItem(item._id)} 
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
      
//       {/* Cart summary and actions */}
//       <div className="mt-8 p-6 bg-gray-100 rounded-lg">
//         <h3 className="text-2xl font-bold mb-4">Total: ${getTotalPrice().toFixed(2)}</h3>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <button 
//             onClick={clearCart} 
//             className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
//           >
//             Clear Cart
//           </button>
//           <Link to="/place-order" className="flex-1">
//             <button className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Proceed to Checkout
//             </button>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Cart;

import { useCartStore } from '../store/CartStore';
import { checkoutCart } from '../services/Paymentservice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  async function handleCheckout() {
    try {
        const data = await checkoutCart(items);
        if(data.url){
            window.location.href = data.url;
        }
    } catch (error) {
        console.log(error);
    }
  }

  if (items.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 underline hover:text-blue-800">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg items-center">
            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.category}</p>
              <p className="font-bold text-blue-600">${item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="min-w-[30px] text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <p className="font-bold min-w-[80px] text-center">${(item.price * item.quantity).toFixed(2)}</p>

            <button
              onClick={() => removeItem(item._id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Total: ${getTotalPrice().toFixed(2)}</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={clearCart}
            className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart
