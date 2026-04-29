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
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={handleAddFunds} style={{marginRight: '10px'}}>Add funds</button>
        <button className="btn btn-blue" onClick={handleWithdraw}>Withdraw</button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{funds.availableMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{funds.usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{funds.balance.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{funds.balance.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button className="btn btn-blue">Open Account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
