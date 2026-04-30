import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const getLinkStyle = (index) => ({
    textDecoration: "none",
    fontSize: "14px",
    color: selectedMenu === index ? "#ff5722" : "#444",
    fontWeight: 500,
    padding: "5px 10px",
    transition: "color 0.2s ease-in-out"
  });

  return (
    <div className="menu" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <Link style={getLinkStyle(0)} to="/" onClick={() => handleMenuClick(0)}>Dashboard</Link>
      <Link style={getLinkStyle(1)} to="/orders" onClick={() => handleMenuClick(1)}>Orders</Link>
      <Link style={getLinkStyle(2)} to="/holdings" onClick={() => handleMenuClick(2)}>Holdings</Link>
      <Link style={getLinkStyle(3)} to="/positions" onClick={() => handleMenuClick(3)}>Positions</Link>
      <Link style={getLinkStyle(4)} to="/funds" onClick={() => handleMenuClick(4)}>Funds</Link>
      <Link style={getLinkStyle(6)} to="/apps" onClick={() => handleMenuClick(6)}>Apps</Link>
    </div>
  );
};

export default Menu;
