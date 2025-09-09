import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/Form';
const ProductOperation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(id ? true : false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Determine if it's an edit operation
  const isEditMode = !!id;
  const productApiUrl = isEditMode
    ? `https://api.escuelajs.co/api/v1/products/${id}`
    : 'https://api.escuelajs.co/api/v1/products';
  const categoryApiUrl = 'https://api.escuelajs.co/api/v1/categories';

  // Fetch product data (if in edit mode) and categories
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        if (isEditMode) {
          const productResponse = await fetch(productApiUrl);
          if (!productResponse.ok) {
            throw new Error(`Product not found with ID ${id}. Status: ${productResponse.status}`);
          }
          const product = await productResponse.json();
          setProductData(product);
        }

        const categoryResponse = await fetch(categoryApiUrl);
        if (!categoryResponse.ok) {
          throw new Error(`Failed to fetch categories. Status: ${categoryResponse.status}`);
        }
        const cats = await categoryResponse.json();
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setCategoryLoading(false);
      }
    };
    fetchData();
  }, [id, productApiUrl, isEditMode]);

  // Handle form submission (Create or Update)
  const handleSubmit = useCallback(async (productPayload) => {
    setIsLoading(true);
    setMessage(null);

    const method = isEditMode ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(productApiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} product. Status: ${response.status}`);
      }
      
      const result = await response.json();
      setMessage({ type: 'success', text: `Product with ID ${result.id} ${isEditMode ? 'updated' : 'created'} successfully!` });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  }, [isEditMode, productApiUrl, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="mt-4 text-gray-600">Loading product data...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        {isEditMode ? 'Update Product' : 'Create New Product'}
      </h2>
      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <ProductForm
        initialData={productData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        categories={categories}
        categoryLoading={categoryLoading}
        isEditMode={isEditMode}
      />
    </div>
  );
};
export default ProductOperation;