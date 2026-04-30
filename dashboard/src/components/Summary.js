import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const navigate = useNavigate();
  const { user } = useContext(GeneralContext);

  const [summary, setSummary] = useState({
    userName: "User",
    balance: 0,
    totalInvestment: "0.00",
    currentValue: "0.00",
    totalPnL: "0.00",
    pnlPercentage: "0.00"
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/dashboardSummary", {
          headers: { Authorization: "Bearer " + token }
        });
        setSummary(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSummary();
  }, [navigate]);

  const storedUser = localStorage.getItem("user");
  const userObj = storedUser ? JSON.parse(storedUser) : null;
  const rawName = user?.name || userObj?.name;
  const userName = rawName && rawName.trim() !== "" ? rawName : "Guest";

  return (
    <>
      <div className="username">
        <h4>Hi, {userName}!</h4>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{Number(summary.balance).toLocaleString()}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>₹{Number(summary.balance).toLocaleString()}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings Summary</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={Number(summary.totalPnL) >= 0 ? "profit" : "loss"}>
              {summary.totalPnL} <small>{summary.pnlPercentage}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{summary.currentValue}</span>{" "}
            </p>
            <p>
              Investment <span>{summary.totalInvestment}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
