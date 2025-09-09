import { useState, useEffect, useCallback } from 'react';
import ProductItem from './ProductItem';
const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 12;

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        if (!response.ok) {
          throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }
        const data = await response.json();
        // Add an "All" option to the beginning for filtering
        setCategories([{ id: '', name: 'All Categories' }, ...data]);
        setCategoryError(null);
      } catch (err) {
        setCategoryError(err.message);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products based on the selected category ID and current page
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * LIMIT;
      const url = selectedCategoryId
        ? `https://api.escuelajs.co/api/v1/products/?categoryId=${selectedCategoryId}&offset=${offset}&limit=${LIMIT}`
        : `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setHasMore(data.length === LIMIT);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!categoryLoading) {
      fetchData();
    }
  }, [selectedCategoryId, categoryLoading, currentPage]);

  const handleDelete = useCallback(async (productId) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }
      setCurrentPage(1);
      setMessage({ type: 'success', text: `Product with ID ${productId} deleted successfully!` });
    } catch (err) {
      setMessage({ type: 'error', text: `Error deleting product: ${err.message}` });
    }
  }, []);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  if (categoryLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="mt-4 text-gray-600">Loading data...</span>
      </div>
    );
  }

  if (categoryError || error) {
    return <div className="text-center text-red-500 font-medium">Error: {categoryError || error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Product List</h2>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label htmlFor="category-filter" className="text-gray-700 font-medium whitespace-nowrap">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategoryId}
            onChange={(e) => {
              setSelectedCategoryId(e.target.value);
              setCurrentPage(1); // Reset to first page on category change
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product) => (
          <ProductItem key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </ul>
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
        >
          Previous
        </button>
        <span className="font-medium text-gray-700">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ProductList;