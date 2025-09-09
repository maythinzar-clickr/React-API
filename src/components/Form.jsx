import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
const ProductForm = ({ initialData, onSubmit, isLoading, categories, categoryLoading, isEditMode }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [images, setImages] = useState(initialData?.images?.join(', ') || '');
  const [categoryId, setCategoryId] = useState(initialData?.category?.id?.toString() || (categories[0]?.id.toString() || ''));

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPrice(initialData.price);
      setDescription(initialData.description);
      setImages(initialData.images.join(', '));
      setCategoryId(initialData.category.id.toString());
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id.toString());
    }
  }, [initialData, categories]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const productData = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: images.split(',').map(img => img.trim()),
    };
    onSubmit(productData);
  }, [title, price, description, images, categoryId, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:focus:border-blue-500"
          required
          min="0"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
        <input
          type="text"
          id="images"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        {categoryLoading ? (
          <div className="text-gray-500">Loading categories...</div>
        ) : (
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 transition-colors"
        >
          {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};
export default ProductForm;