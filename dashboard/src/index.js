import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home.js";
import Auth from "./components/Auth.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { GeneralContextProvider } from "./components/GeneralContext.js";

const AppWrapper = () => {
  useEffect(() => {
    const perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries.length > 0 && perfEntries[0].type !== "reload") {
      sessionStorage.clear();
    }
  }, []);

  return (
    <BrowserRouter>
      <GeneralContextProvider>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
