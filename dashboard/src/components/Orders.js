import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3002/orders", {
          headers: { Authorization: "Bearer " + token }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <h3 className="title mb-4">Orders ({orders.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                let badgeClass = "badge bg-warning text-dark";
                if (order.status === "Completed") badgeClass = "badge bg-success";
                if (order.status === "Cancelled") badgeClass = "badge bg-danger";
                
                return (
                  <tr key={index}>
                    <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                    <td>{order.name}</td>
                    <td>{order.mode}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td><span className={badgeClass}>{order.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
