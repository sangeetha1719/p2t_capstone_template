// capstone-frontend/src/components/UploadForm.jsx
import { useState } from 'react';


const UploadForm = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    file: null,
    name: '',
    price: '',
    description: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleFileChange = (event) => {
    setFormData(prev => ({ ...prev, file: event.target.files[0] }));
    setError(null);
    setFieldErrors(prev => ({ ...prev, file: null }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.file) {
      errors.file = 'Please select an image';
    }
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.price) {
      errors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Please enter a valid price greater than 0';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setError(null);

    // Create FormData and append all fields
    const uploadFormData = new FormData();
    uploadFormData.append('productImages', formData.file);
    uploadFormData.append('name', formData.name);
    uploadFormData.append('price', formData.price);
    uploadFormData.append('longDescription', formData.description);
    uploadFormData.append('category', 'Electronics'); // Default category - change for dynamic use

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/products/add`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      const result = await res.json();
      
      if (res.ok) {
        onUploadSuccess({
          url: result.url,
          publicId: result.public_id,
          name: formData.name,
          price: formData.price,
          description: formData.description
        });
        
        // Reset form
        setFormData({
          file: null,
          name: '',
          price: '',
          description: ''
        });
        // Reset file input
        event.target.reset();
      } else {
        setError(result.message || 'Upload failed');
        console.error(result);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Upload Product</h2>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
            <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Image Upload Field */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
            {fieldErrors.file && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.file}</p>
            )}
          </div>

          {/* Product Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isUploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:opacity-50"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                disabled={isUploading}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:opacity-50"
              />
            </div>
            {fieldErrors.price && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.price}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              placeholder="Enter product description (minimum 10 characters)"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isUploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-vertical disabled:bg-gray-100 disabled:opacity-50"
            />
            {fieldErrors.description && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
            )}
            {!fieldErrors.description && formData.description && (
              <p className={`mt-1 text-sm ${formData.description.length >= 10 ? 'text-green-600' : 'text-gray-500'}`}>
                {formData.description.length}/10 minimum characters
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Upload Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;