import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/UserStore';
import { getProducts } from '../services/ProductService';
import { getOrders, deleteProduct } from '../services/AdminService';

const AdminDashboard = () => {
  const { role, loggedIn } = useUserStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn || role !== 'admin') {
      navigate('/');
    }
  }, [loggedIn, role, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [prodData, orderData] = await Promise.all([
        getProducts(),
        getOrders(),
      ]);
      setProducts(Array.isArray(prodData) ? prodData : prodData.products || []);
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
  }

  if (!loggedIn || role !== 'admin') return null;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => navigate('/upload')}
          className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-20 text-xl">Loading...</div>
      ) : activeTab === 'products' ? (
        <ProductsTable products={products} onDelete={handleDelete} />
      ) : (
        <OrdersTable orders={orders} />
      )}
    </main>
  );
};

function ProductsTable({ products, onDelete }) {
  if (products.length === 0) {
    return <p className="text-center py-10 text-gray-500">No products found</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 font-semibold">Image</th>
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">Category</th>
            <th className="text-left p-3 font-semibold">Price</th>
            <th className="text-left p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <img src={product.imageUrl || product.images?.[0]?.url} alt={product.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3 font-semibold">${product.price}</td>
              <td className="p-3">
                <button
                  onClick={() => onDelete(product._id)}
                  className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return <p className="text-center py-10 text-gray-500">No orders found</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 font-semibold">Order ID</th>
            <th className="text-left p-3 font-semibold">Items</th>
            <th className="text-left p-3 font-semibold">Total</th>
            <th className="text-left p-3 font-semibold">Status</th>
            <th className="text-left p-3 font-semibold">Paid</th>
            <th className="text-left p-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-mono text-sm">
                {order._id.slice(-6).toUpperCase()}
              </td>
              <td className="p-3">
                {order.orderItems?.map((item) => (
                  <div key={item.name} className="text-sm">
                    {item.name} x{item.quantity}
                  </div>
                ))}
              </td>
              <td className="p-3 font-semibold">${order.totalPrice?.toFixed(2)}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  order.status === 'paid' ? 'bg-green-100 text-green-800' :
                  order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status || 'pending'}
                </span>
              </td>
              <td className="p-3">{order.isPaid ? 'Yes' : 'No'}</td>
              <td className="p-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
