import React, { useState } from "react";
import axios from "axios";
import "./Addbooks.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Addbooks = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!image) {
      setErrorMsg("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("image", image);

    try {
      setLoading(true);
      let BookAdd = await axios.post("http://localhost:5000/api/products", formData);
      console.log(BookAdd)
      setSuccessMsg("Product created successfully.");
      setProductData({ name: "", description: "", price: "", category: "" });
      setImage(null);
      toast.success("Product created successfully");
       navigate('/dashboard'); 
    } catch (error) {
  console.error("Error response:", error.response);
  setErrorMsg(
    error.response?.data?.message || error.message || "Error creating product. Try again."
  );
}
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">


      <div className="add-product-form-wrapper">
        {successMsg && <p className="success-message">{successMsg}</p>}
        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-product-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Enter category"
              value={productData.category}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="description" className="form-label">Product Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe the product"
              value={productData.description}
              onChange={handleChange}
              required
              rows={4}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              value={productData.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Product Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="form-file-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <svg
                  className="spinner"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="spinner-circle"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="spinner-path"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Uploading...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
      <div className="add-product-header">
        <h2 className="add-product-title">Add New Product</h2>
        <p className="add-product-subtitle">
          Fill in the details to list a new product with a clear description, price, category, and an appealing image.
        </p>
      </div>
    </div>
  );
};

export default Addbooks;