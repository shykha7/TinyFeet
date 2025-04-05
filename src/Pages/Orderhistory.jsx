import React, { useEffect, useState } from "react";
import axios from "axios";

const Orderhistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`http://localhost:4000/orderhistory?userId=${userId}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">
        Your Order History 📦
      </h2>

      {loading ? (
        <p className="text-center text-amber-400">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-amber-400">No orders found 😔</p>
      ) : (
        <div className="max-w-4xl mx-auto  p-6 rounded-xl shadow-lg">
          <div className="grid gap-4">
            {orders.map((order) => {

              console.log(order)
             
              const item = order.items || [];

              return item.map((prod) => (
                <div
                  key={`${order.id}-${prod.id}`} 
                  className="flex items-center border-b border-amber-500 pb-4 last:border-b-0 cursor:pointer transition duration-200">
                  <img
                    src={prod.image_url}
                    alt={prod.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"/>

                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-amber-600">
                      {prod.name}
                    </h3>
                    <p className="text-amber-600">Price: ${prod.price}</p>
                  </div>
                </div>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orderhistory;
