import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllProducts.css';
import { toast } from 'react-toastify';
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState({
    _id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    image: ''
  });
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    averagePrice: 0
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get("http://localhost:5000/api/products");
      const fetchedData = response.data.data || response.data;
      setProducts(fetchedData);

      // Calculate statistics
      calculateStats(fetchedData);
    } catch (error) {
      console.error("API Fetch Error:", error.message);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate product statistics
  const calculateStats = (productData) => {
    const uniqueCategories = new Set(productData.map(item => item.category).filter(Boolean));
    const totalPrice = productData.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    const avgPrice = productData.length ? (totalPrice / productData.length).toFixed(2) : 0;

    setStats({
      totalProducts: productData.length,
      totalCategories: uniqueCategories.size,
      averagePrice: avgPrice
    });
  };

  // Delete a product by ID
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);

      if (response.data.success) {
        // Update local state to reflect deletion
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
        calculateStats(updatedProducts);
        toast(response.data.message || 'Product deleted successfully.');
      } else {
        toast(response.data.message || 'Failed to delete product.');
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast(`Failed to delete the product: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    }
  };

  // Start editing a product
  const startEdit = (product) => {
    setEditProduct({ ...product });
    setIsEditing(true);
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    });
  };

  // Save edited product
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        editProduct
      );

      if (response.data.success) {
        // Update product in local state
        const updatedProducts = products.map(product =>
          product._id === editProduct._id ? response.data.data : product
        );
        setProducts(updatedProducts);
        calculateStats(updatedProducts);
        toast('Product updated successfully.');
        setIsEditing(false);
      } else {
        toast(response.data.message || 'Failed to update product.');
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast(`Failed to update the product: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Generate categories after products are loaded
  const categories = ['All', ...new Set(products.map(item => item.category).filter(Boolean))];

  const filteredProducts = products.filter(item => {
    return (
      (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );
  });

  return (
    <main className="admin-main">
      <div className="admin-header">
        <h1>Admin Dashboard - Product Management</h1>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p>{stats.totalCategories}</p>
        </div>
        <div className="stat-card">
          <h3>Average Price</h3>
          <p>₹{stats.averagePrice}</p>
        </div>
        <div className="stat-card action-card">
          <button className="add-button" onClick={() => window.location.href = '/dashboard/add'}>
            Add New Product
          </button>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          className="search-box"
          placeholder="Search products by name or description..."
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
        <button className="refresh-button" onClick={fetchProducts}>
          Refresh List
        </button>
      </div>

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Product</h2>
            <form onSubmit={saveProduct}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editProduct.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editProduct.description}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={editProduct.image}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">Save Changes</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="product-list">
        <h2>Product Inventory</h2>
        <div className="admin-products-container">
          {loading ? (
            <div className="loading-indicator">Loading products...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products-message">No products found.</div>
          ) : (
            filteredProducts.map((item) => (
              <div key={item._id} className="admin-product-card">
                <div className="product-status">{item.status || 'In Stock'}</div>
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
                  <p className="product-id">ID: {item._id}</p>
                  <div className="admin-actions">
                    <button
                      className="edit-button"
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
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
  );
};

export default AllProducts;