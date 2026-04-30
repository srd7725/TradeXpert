import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // export const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  // datasets: [
  //   {
  //     label: "# of Votes",
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 1,
  //   },
  // ],
  // };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} showToast={showToast} />;
        })}
      </ul>

      <DoughnutChart data={data} />
      
      {toastMessage && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show align-items-center text-white bg-success border-0" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-bold">
                <i className="fas fa-check-circle me-2"></i> {toastMessage}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastMessage("")}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, showToast }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const generalContext = useContext(GeneralContext);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  const handleBuyClick = () => {
    generalContext.openBuyWindow(stock.name, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(stock.name, "SELL");
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #f0f0f0', width: '100%', boxSizing: 'border-box' }}>
      <div className="item" style={{ display: "flex", alignItems: "center", padding: "6px 10px", width: "100%" }}>
        <span className="item-name" style={{ fontSize: "13px", fontWeight: 500, minWidth: "90px", color: stock.isDown ? "#f44336" : "#4caf50" }}>{stock.name}</span>

        <div className="item-center" style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto", marginRight: "10px", fontSize: "12px", color: stock.isDown ? "#f44336" : "#4caf50" }}>
          <span>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown style={{ fontSize: "16px" }} />
          ) : (
            <KeyboardArrowUp style={{ fontSize: "16px" }} />
          )}
        </div>

        <span className="item-price" style={{ fontSize: "13px", fontWeight: 500, minWidth: "60px", textAlign: "right", color: "#444" }}>{stock.price}</span>
      </div>
      {showWatchlistActions && (
        <span className="actions">
          <span>
            <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
              <button className="buy" onClick={handleBuyClick}>Buy</button>
            </Tooltip>
            <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
              <button className="sell" onClick={handleSellClick}>Sell</button>
            </Tooltip>
            <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
              <button className="action"><BarChartOutlined className="icon" /></button>
            </Tooltip>
            <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
              <button className="action"><MoreHoriz className="icon" /></button>
            </Tooltip>
          </span>
        </span>
      )}
    </li>
  );
};
