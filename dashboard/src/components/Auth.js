import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(GeneralContext);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (token && isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleTabSwitch = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setError("");
    // Do not clear user input automatically
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/signup";

    try {
      const payload = isLogin ? { email, password } : { fullName: name, email, password };
      
      const res = isLogin 
        ? await axios.post(url, payload)
        : await axios.post(url, payload);
      
      console.log("DEBUG LOGIN RESPONSE:", res.data);
      if (res.data.success) {
        if (isLogin) {
          const userData = res.data.user;
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(userData));
          sessionStorage.setItem("isLoggedIn", "true");
          setUser(userData); 
          navigate("/", { replace: true });
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsLogin(true);
        }
      } else {
        setError(res.data.message || "An error occurred");
      }
    } catch (err) {
      setError(err.response?.data || "Server error. Please try again.");
    }
  };

  return (
    <div className="container-fluid p-0 auth-page-container">
      <div className="row g-0 h-100">
        
        {/* Left Side: Branding */}
        <div className="col-12 col-lg-6 auth-left-side d-none d-lg-flex">
          <h1>Welcome to TradeXpert</h1>
          <p>Start your trading journey with the most powerful fintech platform.</p>
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Stock Market Trading" 
          />
        </div>

        {/* Right Side: Auth Form */}
        <div className="col-12 col-lg-6 auth-right-side">
          <div className="auth-card">

            {/* Nav Tabs for Login / Signup */}
            <ul className="nav nav-tabs auth-tabs justify-content-center" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${isLogin ? "active" : ""}`}
                  onClick={() => handleTabSwitch(true)}
                  type="button"
                  role="tab"
                >
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${!isLogin ? "active" : ""}`}
                  onClick={() => handleTabSwitch(false)}
                  type="button"
                  role="tab"
                >
                  Signup
                </button>
              </li>
            </ul>

            <h3 className="text-center mb-1">{isLogin ? "Welcome Back" : "Create Account"}</h3>
            <p className="text-muted text-center">
              {isLogin ? "Please enter your details to log in." : "Join TradeXpert and start investing."}
            </p>

            {error && (
              <div className="alert alert-danger p-2 fs-6 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Full Name Input (Signup Only) */}
              {!isLogin && (
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                  <label htmlFor="nameInput">Full Name</label>
                </div>
              )}

              {/* Email Input */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <label htmlFor="emailInput">Email address</label>
              </div>

              {/* Password Input */}
              <div className="form-floating mb-3 password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="passwordInput"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <label htmlFor="passwordInput">Password</label>
                <i 
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>

              {/* Confirm Password Input (Signup Only) */}
              {!isLogin && (
                <div className="form-floating mb-3 password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <label htmlFor="confirmPasswordInput">Confirm Password</label>
                  <i 
                    className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  ></i>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100 btn-primary-fintech mt-2">
                {isLogin ? "Login" : "Continue"}
              </button>
            </form>

            {/* Divider */}
            <div className="divider-container">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            {/* Social Logins */}
            <div className="row g-2">
              <div className="col-12 col-sm-6">
                <button type="button" className="btn social-btn btn-google">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                  Google
                </button>
              </div>
              <div className="col-12 col-sm-6">
                <button type="button" className="btn social-btn btn-facebook">
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
