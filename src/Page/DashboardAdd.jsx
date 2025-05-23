import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Shop.css';

const Shop = () => {
  const [bValue, setBValue] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchapi = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get("http://localhost:5000/api/products");
      const fetchedData = response.data.data || response.data;
      setBValue(fetchedData);
    } catch (error) {
      console.error("API Fetch Error:", error.message);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setBValue(prev => prev.filter(product => product._id !== id));
    } catch (err) {
      console.error("Delete Error:", err.message);
      toast("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    toast(`Edit product: ${product.name}`);
    // You can open a modal or navigate to an edit form page here.
  };

  const categories = ['All', ...new Set(bValue.map((item) => item.category))];

  const filteredProducts = bValue.filter((item) => {
    return (
      (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );
  });

  return (
    <>
      <main style={{ minHeight: "67.79vh" }} className='main-shop'>
        <section className="filter-section">
          <input
            type="text"
            placeholder="Search products..."
            className="search-box"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </section>

        <section className="product-list">
          <h2>Our Products</h2>
          <div className="products-container">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map((item) => (
                <div key={item._id || item.id} className="product-card">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-description">{item.description}</p>
                    <p className="product-category">Category: {item.category}</p>
                    <p className="product-price">Price: ₹{item.price}</p>
                    <div className="flex justify-between mt-4 gap-2">
                      <button className="add-to-cart">Add to Cart</button>
                      <button
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Shop;
