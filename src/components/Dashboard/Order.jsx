import React, { useEffect, useState } from "react";

const Order = () => {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/getAllUsersWithOrders";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
          setUsersWithOrders(data.users);
        } else {
          setUsersWithOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setUsersWithOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format currency helper
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 p-5 mt-5">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Library Orders</h1>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span className="ml-3 text-indigo-600 font-semibold">Loading orders...</span>
          </div>
        ) : usersWithOrders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="min-w-full border-collapse table-auto text-sm">
              <thead className="bg-indigo-700 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">User Email</th>
                  <th className="px-5 py-3 text-left">Book Title</th>
                  <th className="px-5 py-3 text-left">Qty</th>
                  <th className="px-5 py-3 text-left">Price</th>
                  <th className="px-5 py-3 text-left">Total</th>
                  <th className="px-5 py-3 text-left">Ordered On</th>
                  <th className="px-5 py-3 text-left">Buyer</th>
                </tr>
              </thead>
              <tbody>
                {usersWithOrders.flatMap((user, userIndex) =>
                  user.orders.flatMap((order, orderIndex) =>
                    order.cartItems.map((item, itemIndex) => (
                      <tr
                        key={`${user._id}-${order._id}-${item._id}`}
                        className={`${itemIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-100`}
                      >
                        <td className="border px-5 py-3">{itemIndex + 1}</td>
                        <td className="border px-5 py-3 break-words max-w-xs">{user.email}</td>
                        <td className="border px-5 py-3 max-w-xs truncate" title={item.title}>{item.title}</td>
                        <td className="border px-5 py-3">{item.quantity}</td>
                        <td className="border px-5 py-3">{formatCurrency(item.price)}</td>
                        <td className="border px-5 py-3 font-semibold">{formatCurrency(order.totalPrice)}</td>
                        <td className="border px-5 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="border px-5 py-3">{order.shippingInfo?.name || "N/A"}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
