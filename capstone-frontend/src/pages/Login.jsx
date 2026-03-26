import { useState } from 'react'
import { login} from '../services/AuthService';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/UserStore';

const Login = () => {
  const { authSuccess } = useUserStore();
  const navigate = useNavigate();
  // Form state for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   // Update form state on input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
  }
  const [error, setError] = useState(null);

  // Handle form submission - call login API
  async function handleSubmit(e) {  // on submit listener
    e.preventDefault();
    setError(null);
    try {
        const data = await login(formData);
        authSuccess({ email: data.email, username: data.username, role: data.role });
        navigate("/");
    } catch (error) {
        setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-conic-to-l from-sky-500 to-blue-800 font-serif">
      {/* Left side - Form */}
      <div className=" w-full max-w-xl p-12 space-y-6 bg-white rounded-xl shadow-xl">
        <div className="max-w-md pl-4 pr-4 bg-white rounded-xl py-10 flex-col p-8 gap-2 font-stretch-expanded">
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-4">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <button  type="submit"
              className="
              w-full py-2 my-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline py-8">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right side - Branding
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12">
        <h3 className="text-4xl font-bold mb-4">TechStore</h3>
        <p className="text-blue-100 text-lg text-center max-w-sm">
          Your trusted destination for the latest technology and electronics at great prices.
        </p>
      </div> */}
    </div>
  )
}

export default Login  