import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const fetchCartData = async () => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (user?.email) {
      try {
        const res = await fetch('http://localhost:5000/api/Getcart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();
        const cart = data.cart || [];
        setCartItems(cart);
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
      } catch (err) {
        toast.error('Failed to fetch cart data.');
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleDelete = async (productId) => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (!user?.email) return;

    try {
      const res = await fetch('http://localhost:5000/api/Removecartitem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, productId }),
      });

      if (res.ok) {
        toast.success('Item removed from cart');
        fetchCartData();
      } else {
        toast.error('Failed to delete item.');
      }
    } catch (err) {
      toast.error('Error removing item.');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const user = JSON.parse(localStorage.getItem('User'));
    if (!user?.email) return;

    try {
      const res = await fetch('http://localhost:5000/api/updateCartQuantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, productId, quantity }),
      });

      if (res.ok) {
        fetchCartData();
      } else {
        toast.error('Failed to update quantity');
      }
    } catch (err) {
      toast.error('Quantity update error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const { name, address, city, zip, country } = shippingInfo;

    if (!name || !address || !city || !zip || !country) {
      toast.warn('Please fill in all shipping fields.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('User'));
    if (!user?.email) {
      toast.error('User not logged in.');
      return;
    }

    const orderPayload = {
      email: user.email,
      cartItems,
      totalPrice,
      shippingInfo,
    };

    try {
      const response = await fetch('http://localhost:5000/api/placeorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        toast.success('Order placed successfully!');
        setShippingInfo({ name: '', address: '', city: '', zip: '', country: '' });
        setCartItems([]);
        setTotalPrice(0);
        navigate('/');
      } else {
        toast.error('Failed to place order.');
      }
    } catch (err) {
      toast.error('Something went wrong during order placement.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
          <h2 className="text-3xl font-bold text-indigo-800 mb-4 border-b pb-2">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          ) : (
            <table className="w-full text-sm text-gray-700">
              <thead className="uppercase text-xs text-gray-500 border-b-2">
                <tr>
                  <th className="py-3 text-left">Image</th>
                  <th className="py-3 text-left">Title</th>
                  <th className="py-3 text-left">Qty</th>
                  <th className="py-3 text-left">Price</th>
                  <th className="py-3 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100 border-b">
                    <td className="py-3">
                      <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded shadow" />
                    </td>
                    <td className="py-3 font-medium">{item.title}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-indigo-700">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="py-3 text-center">
                      <button onClick={() => handleDelete(item.productId)} className="text-red-600 hover:text-red-800">
                        <TrashIcon className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary & Shipping */}
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 sticky top-20 h-fit">
          <div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">Summary</h2>
            <div className="text-gray-700 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-medium">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-indigo-700">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Info</h3>
            <div className="space-y-3">
              <input type="text" name="name" value={shippingInfo.name} onChange={handleInputChange} placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300" />
              <input type="text" name="address" value={shippingInfo.address} onChange={handleInputChange} placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300" />
              <div className="flex gap-3">
                <input type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} placeholder="City"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300" />
                <input type="text" name="zip" value={shippingInfo.zip} onChange={handleInputChange} placeholder="ZIP"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300" />
              </div>
              <input type="text" name="country" value={shippingInfo.country} onChange={handleInputChange} placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300">
              <option value="">Select Method</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow transition duration-200 mt-2"
            onClick={handlePayment}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
