import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import GeneralContext from "./GeneralContext";

const TopBar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useContext(GeneralContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("DEBUG LOCALSTORAGE USER:", localStorage.getItem("user"));
  const storedUser = localStorage.getItem("user");
  const userObj = storedUser ? JSON.parse(storedUser) : null;
  const rawName = user?.name || userObj?.name;
  const userName = rawName && rawName.trim() !== "" ? rawName : "Guest";

  const initials =
    userName !== "Guest"
      ? userName.split(" ").map(n => n[0]).join("").toUpperCase()
      : "G";

  return (
    <>
      <style>{`
        .dropdown div:hover {
          background: #f5f5f5;
        }
        .menu a:hover {
          color: #ff5722 !important;
        }
        .user-name {
          max-width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      <div className="header" style={{ 
        display: "flex", 
        alignItems: "center", 
        padding: "0 20px", 
        height: "60px", 
        borderBottom: "1px solid #eee", 
        backgroundColor: "#fff", 
        position: "relative", 
        zIndex: 1000 
      }}>
        
        <div className="market-left" style={{ width: "25%", display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <div className="nifty" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <p className="index" style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#333" }}>NIFTY 50</p>
            <p className="index-points" style={{ margin: 0, fontSize: "14px", color: "#333" }}>100.2</p>
          </div>
          <div className="market-sensex" style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "flex-end", paddingRight: "16px" }}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
              SENSEX <span className="sensex-value" style={{ marginLeft: "6px", fontWeight: "500" }}>100.2</span>
            </span>
          </div>
        </div>

        <div className="logo" style={{ position: "absolute", left: "calc(25% + 20px)", display: "flex", alignItems: "center" }}>
          <img src="logo.png" style={{ height: "28px" }} alt="logo" />
        </div>

        <div className="right-section" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "20px" }}>
          <Menu />

          <div ref={dropdownRef} className="user" style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
            <div 
              className="d-flex align-items-center gap-2" 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
              style={{ cursor: "pointer" }}
            >
              <div className="avatar" style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#eee", fontSize: "14px", color: "#000", fontWeight: "bold" }}>
                {initials}
              </div>
              <div className="username user-name" style={{ fontSize: "14px", fontWeight: 500, color: "#444" }}>
                {userName}
              </div>
            </div>

            {isProfileDropdownOpen && (
              <div className="dropdown" style={{ position: "absolute", top: "45px", right: "0", width: "150px", background: "white", border: "1px solid #ddd", borderRadius: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 1050 }}>
                <Link to="/profile" style={{ textDecoration: "none" }} onClick={() => setIsProfileDropdownOpen(false)}>
                  <div style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee", fontSize: "14px", color: "#444" }}>Profile</div>
                </Link>
                <div style={{ padding: "10px", cursor: "pointer", color: "red", fontSize: "14px" }} onClick={logout}>Logout</div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default TopBar;
