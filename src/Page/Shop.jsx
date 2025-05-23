import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addTocart } from '../features/product/productSlice';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const Shop = () => {
  const [bValue, setBValue] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const fetchapi = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get("http://localhost:5000/api/products");
      const fetchedData = response.data.data || response.data;
      setBValue(fetchedData);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const categories = ['All', ...new Set(bValue.map((item) => item.category))];

  const filteredProducts = bValue.filter((item) => {
    return (
      (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );
  });

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user?.email) {
      return alert("Please login to add items to cart."); // Consider replacing with toast
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart', {
        email: user.email,
        product
      });

      const { alreadyExists } = response.data;

      if (alreadyExists) {
        toast.error("This product is already in your cart.");
      } else {
        toast.success("Product added to cart successfully!");
        dispatch(addTocart(product));
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <main className="min-h-[68vh] bg-gray-50 py-6 px-4 md:px-8">
      {/* Filter Section */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </section>

      {/* Product List */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 border-b-2 border-indigo-500 pb-2">
          Our Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col p-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{item.description}</p>
                  <p className="text-indigo-600 font-medium mb-1">Category: {item.category}</p>
                  <p className="text-gray-900 font-bold text-lg mb-4">₹{item.price}</p>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Shop;
