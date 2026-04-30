import React from "react";

const Apps = () => {
  return (
    <div className="w-100 p-4">
      <h3 className="title mb-4">Trading Tools & Apps</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center p-4">
            <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
            <h5 className="card-title fw-bold">Market Watch</h5>
            <p className="card-text text-muted">Track indices and global markets in real-time.</p>
            <button className="btn btn-outline-primary mt-2">Open</button>
          </div>
        </div>
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center p-4">
            <i className="far fa-newspaper fa-3x text-primary mb-3"></i>
            <h5 className="card-title fw-bold">News & Insights</h5>
            <p className="card-text text-muted">Latest financial news and market updates.</p>
            <button className="btn btn-outline-primary mt-2">Open</button>
          </div>
        </div>
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center p-4">
            <i className="fas fa-chart-bar fa-3x text-primary mb-3"></i>
            <h5 className="card-title fw-bold">Advanced Charts</h5>
            <p className="card-text text-muted">Technical analysis tools and indicators.</p>
            <button className="btn btn-outline-primary mt-2">Open</button>
          </div>
        </div>
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center p-4">
            <i className="fas fa-robot fa-3x text-primary mb-3"></i>
            <h5 className="card-title fw-bold">AI Suggestions</h5>
            <p className="card-text text-muted">Smart trading signals powered by AI.</p>
            <button className="btn btn-outline-primary mt-2">Open</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
