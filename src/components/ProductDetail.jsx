import { useState } from 'react';
import { Link } from 'react-router-dom';
const ProductDetail = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Handle image not found error
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col lg:flex-row gap-8">
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 mt-5">
          <img
            src={mainImage}
            alt={product.title}
            onError={handleImageError}
            className="w-full h-auto object-cover rounded-lg shadow-md mb-4"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onError={handleImageError}
                onClick={() => setMainImage(img)}
                className="w-16 h-16 object-cover rounded-md border-2 border-transparent hover:border-blue-500 cursor-pointer transition-transform transform hover:scale-105"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500 bg-gray-200 py-1 px-3 rounded-full">{product.category.name}</span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{product.title}</h1>
            <p className="text-2xl font-bold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;