import React, { useState, useEffect } from "react";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState({ balance: 0, availableMargin: 0, usedMargin: 0 });

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:3002/funds", {
        headers: { Authorization: "Bearer " + token }
      });
      setFunds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFunds = async () => {
    const amount = prompt("Enter amount to add:");
    if (!amount || isNaN(amount)) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:3002/addFunds", { amount }, {
        headers: { Authorization: "Bearer " + token }
      });
      setFunds(res.data);
    } catch (err) {
      alert("Error adding funds");
    }
  };

  const handleWithdraw = async () => {
    const amount = prompt("Enter amount to withdraw:");
    if (!amount || isNaN(amount)) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:3002/withdrawFunds", { amount }, {
        headers: { Authorization: "Bearer " + token }
      });
      setFunds(res.data);
    } catch (err) {
      alert(err.response?.data || "Error withdrawing funds");
    }
  };

  return (
    <div className="w-100 p-4">
      <h3 className="title mb-4">Funds</h3>
      
      <div className="card shadow-sm border-0 mb-4" style={{ maxWidth: "400px" }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
            <span className="text-muted">Available Balance:</span>
            <span className="fw-bold fs-5 text-success">₹{funds.balance.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span className="text-muted">Used Margin:</span>
            <span className="fw-bold">₹{funds.usedMargin.toFixed(2)}</span>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-primary flex-fill fw-bold py-2" onClick={handleAddFunds}>Add Funds</button>
            <button className="btn btn-danger flex-fill fw-bold py-2" onClick={handleWithdraw}>Withdraw</button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <h5 className="mb-3 text-muted">Equity</h5>
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span>Available margin</span>
              <span className="fw-bold text-success">{funds.availableMargin.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span>Used margin</span>
              <span className="fw-bold">{funds.usedMargin.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span>Available cash</span>
              <span className="fw-bold">{funds.balance.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between py-2 text-muted">
              <span>Opening Balance</span>
              <span>{funds.balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <h5 className="mb-3 text-muted">Commodity</h5>
          <div className="card shadow-sm border-0 p-4 text-center bg-light">
            <p className="text-muted mb-3">You don't have a commodity account</p>
            <button className="btn btn-outline-primary btn-sm mx-auto" style={{ maxWidth: "200px" }}>Open Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
