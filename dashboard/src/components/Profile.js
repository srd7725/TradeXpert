import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(GeneralContext);
  
  const [tradingData, setTradingData] = useState({
    balance: 0,
    totalInvestment: 0,
    currentValue: 0,
    totalPnL: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    
    setNewName(user?.name || "");

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [fundsRes, summaryRes] = await Promise.all([
          axios.get("http://localhost:5000/funds", { headers: { Authorization: "Bearer " + token } }),
          axios.get("http://localhost:5000/dashboardSummary", { headers: { Authorization: "Bearer " + token } })
        ]);
        
        setTradingData({
          balance: fundsRes.data.balance,
          totalInvestment: summaryRes.data.totalInvestment,
          currentValue: summaryRes.data.currentValue,
          totalPnL: summaryRes.data.totalPnL,
        });
      } catch (err) {
        console.error("Error fetching profile trading data", err);
      }
    };

    fetchData();
  }, [navigate, user]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const handleUpdateName = () => {
    if (!newName.trim()) return;
    const updatedUser = { ...user, name: newName.trim() };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    if (passwords.new.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    try {
      console.log("SENDING CHANGE PASSWORD REQUEST TO PORT 5000...");
      const email = user.email.trim().toLowerCase();
      console.log("Sending email:", email);
      
      const payload = {
        email,
        oldPassword: passwords.old,
        newPassword: passwords.new
      };
      console.log("Payload:", payload);
      
      const res = await axios.post("http://localhost:5000/change-password", payload);

      if (res.data.success) {
        console.log("SUCCESS RESPONSE:", res.data);
        alert("Password updated successfully! You will be logged out now. Please login with your new password.");
        setShowPasswordForm(false);
        setPasswords({ old: "", new: "", confirm: "" });
        
        // Automatic logout and redirect
        setTimeout(() => {
          console.log("LOGGING OUT...");
          logout();
        }, 1000);
      }
    } catch (err) {
      console.log("CHANGE PASSWORD ERROR:");
      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        alert(err.response.data || "Error updating password.");
      } else {
        console.log("Error Message:", err.message);
        alert("Network error or server down. Please ensure backend is on port 5000.");
      }
    }
  };

  if (!user) return <div className="p-4">Loading...</div>;

  const initials = getInitials(user.name);

  return (
    <>
      <style>{`
        .profile-container {
          max-width: 700px;
          margin: 40px auto;
          background: #ffffff;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #0d6efd;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .profile-info h2 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: #212529;
        }

        .profile-info p {
          font-size: 14px;
          color: #6c757d;
          margin: 4px 0 0 0;
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #adb5bd;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          border-bottom: 1px solid #f8f9fa;
          padding-bottom: 8px;
        }

        .trading-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 600;
          color: #212529;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 576px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          .trading-grid {
            grid-template-columns: 1fr;
          }
          .profile-container {
            margin: 20px 15px;
            padding: 24px;
          }
        }
      `}</style>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            {isEditing ? (
              <div className="d-flex gap-2 align-items-center">
                <input 
                  type="text" 
                  className="form-control" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                />
                <button className="btn btn-sm btn-success" onClick={handleUpdateName}>Save</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsEditing(false)}>X</button>
              </div>
            ) : (
              <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Trading Info Section */}
        <div className="section-title">Trading Information</div>
        <div className="trading-grid">
          <div className="stat-item">
            <span className="stat-label">Available Balance</span>
            <span className="stat-value text-success">₹{Number(tradingData.balance).toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Investment</span>
            <span className="stat-value">₹{Number(tradingData.totalInvestment).toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Current Value</span>
            <span className="stat-value">₹{Number(tradingData.currentValue).toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total P&L</span>
            <span className={`stat-value ${Number(tradingData.totalPnL) >= 0 ? 'text-success' : 'text-danger'}`}>
              {Number(tradingData.totalPnL) >= 0 ? '+' : ''}{Number(tradingData.totalPnL).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="section-title">Account Actions</div>
        <div className="action-buttons">
          {!isEditing && (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button className="btn btn-outline-primary" onClick={() => setShowPasswordForm(!showPasswordForm)}>
            {showPasswordForm ? 'Hide Security' : 'Change Password'}
          </button>
          <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
        </div>

        {/* Password Form (Conditional) */}
        {showPasswordForm && (
          <div className="mt-4 p-3 border rounded bg-light animate__animated animate__fadeIn">
            <h6 className="fw-bold mb-3">Update Password</h6>
            <form onSubmit={handleChangePassword}>
              <div className="mb-2">
                <label className="small text-muted fw-bold">Old Password</label>
                <input 
                  type="password" 
                  className="form-control form-control-sm" 
                  value={passwords.old} 
                  onChange={(e) => setPasswords({...passwords, old: e.target.value})} 
                  required 
                />
              </div>
              <div className="row g-2 mb-3">
                <div className="col">
                  <label className="small text-muted fw-bold">New</label>
                  <input 
                    type="password" 
                    className="form-control form-control-sm" 
                    value={passwords.new} 
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})} 
                    required 
                  />
                </div>
                <div className="col">
                  <label className="small text-muted fw-bold">Confirm</label>
                  <input 
                    type="password" 
                    className="form-control form-control-sm" 
                    value={passwords.confirm} 
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-sm btn-primary">Save Password</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
