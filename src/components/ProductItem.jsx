import { Link } from 'react-router-dom';

const ProductItem = ({ product, onDelete }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200">

        {product.images && product.images.length > 0 && (
            // {product.image && (
            <div className='product-image'>
                <img
                    src={product.images[0]}
                    // src={product.image}
                    alt={product.title}
                    className="h-100 object-cover mb-4 mx-auto"
                />
            </div>
        )}
        <div className="font-semibold text-gray-800">{product.title}</div>
        <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
        <span className="text-sm font-medium text-gray-500 bg-gray-200 py-1 px-3 rounded-full inline-block mt-2">{product.category.name}</span>
        <div className="flex-shrink-0 flex space-x-2 mt-4">
            <Link
                to={`/product/${product.id}`}
                className="text-sm py-1 px-3 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors font-medium"
            >
                View
            </Link>
            <Link
                to={`/update/${product.id}`}
                className="text-sm py-1 px-3 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors font-medium"
            >
                Update
            </Link>
            <button
                onClick={() => onDelete(product.id)}
                className="text-sm py-1 px-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors font-medium"
            >
                Delete
            </button>
        </div>
    </div>
);
export default ProductItem;