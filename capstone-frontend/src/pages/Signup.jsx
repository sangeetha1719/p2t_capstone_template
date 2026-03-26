import { useState } from 'react'
import { signup } from '../services/AuthService';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/UserStore';

const Signup = () => {
  const { authSuccess } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
  }
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
        const data = await signup(formData);
        authSuccess({ email: data.email, username: data.username, role: data.role });
        navigate("/");
    } catch (error) {
        setError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  }
  return (
    <div className="min-h-screen flex bg-conic-to-l from-sky-500 to-blue-800 font-serif">
      {/* Left side - Form */}
      <div className="w-full  px-6 py-12 sm:px-12 lg:px-20 font-stretch-expanded">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8">Join TechStore and start shopping</p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 text-lg rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden float:right lg:flex lg:w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12">
        {/* <h3 className="text-4xl font-bold mb-4">TechStore</h3> */}
        <p className="text-blue-100 text-lg text-center max-w-sm">
          <blockquote><i><strong>Welcome to TechStore </strong> where innovation meets affordability!</i>
          <em>Your trusted destination for the latest technology and electronics at great prices.</em>
         <p className="mt-4">Sign up today and unlock exclusive deals, fast shipping, and 24/7 customer support.</p>
        </blockquote>
        </p>
      </div>
    </div>
  )
}

export default Signup