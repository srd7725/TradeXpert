import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, initialMode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");
  const [mode, setMode] = useState(initialMode);
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: mode,
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(() => {
      window.dispatchEvent(new Event("orderUpdate"));
    }).catch(err => {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      }
    });

    generalContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="card shadow buy-sell-panel" id="buy-window" draggable="true" style={{ width: "340px", padding: "18px", borderRadius: "8px", position: "absolute", top: "10%", left: "50%", transform: "translate(-50%, 0)", zIndex: 1000, pointerEvents: "auto" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="m-0 fw-bold" style={{ color: mode === "BUY" ? "#4184f3" : "#d9534f" }}>
          {mode === "BUY" ? "Buy" : "Sell"} {uid}
        </h6>
      </div>
      
      <div className="d-flex gap-2 mb-3">
        <div className="flex-fill">
          <label className="form-label mb-1" style={{ fontSize: "12px", color: "#666" }}>Qty.</label>
          <input
            type="number"
            className="form-control form-control-sm"
            name="qty"
            id="qty"
            onChange={(e) => setStockQuantity(e.target.value)}
            value={stockQuantity}
            style={{ height: "38px", fontSize: "14px" }}
          />
        </div>
        <div className="flex-fill">
          <label className="form-label mb-1" style={{ fontSize: "12px", color: "#666" }}>Price</label>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="0.00"
            name="price"
            id="price"
            step="0.05"
            onChange={(e) => setStockPrice(e.target.value)}
            value={stockPrice}
            style={{ height: "38px", fontSize: "14px" }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ fontSize: "12px", color: "#666" }}>Margin required ₹140.65</span>
      </div>
      
      <div className="d-flex gap-2">
        <button 
          className={`btn btn-sm flex-fill ${mode === "BUY" ? "btn-primary text-white" : "btn-danger text-white"}`} 
          style={{ height: "40px", fontWeight: "bold" }}
          onClick={handleBuyClick}
        >
          {mode === "BUY" ? "Buy" : "Sell"}
        </button>
        <button 
          className="btn btn-sm btn-secondary flex-fill" 
          style={{ height: "40px", fontWeight: "bold" }}
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
