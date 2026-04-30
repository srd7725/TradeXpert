import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import GeneralContext, { GeneralContextProvider } from "./GeneralContext";
import BuyActionWindow from "./BuyActionWindow";

const DashboardContent = () => {
  const ctx = React.useContext(GeneralContext);
  return (
    <div className="content" style={{ position: "relative" }}>
      <Routes>
        <Route exact path="/" element={<Summary />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/apps" element={<Apps />} />
      </Routes>
      {ctx.isBuyWindowOpen && <BuyActionWindow uid={ctx.selectedStockUID} initialMode={ctx.mode} />}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WatchList />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
