import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPositions = async () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      window.location.href = "/login";
      return;
    }

    const user = JSON.parse(stored);
    try {
      const res = await axios.get(`http://localhost:5000/user-data?email=${user.email}`);
      setAllPositions(res.data.positions || []);
    } catch (err) {
      console.error("Error fetching user positions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    window.addEventListener("orderUpdate", fetchPositions);

    // Simulate dynamic price changes (LTP)
    const interval = setInterval(() => {
      setAllPositions((prevPositions) =>
        prevPositions.map((pos) => {
          const newPrice = pos.price + (Math.random() * 2 - 1); // Simulating smaller fluctuations
          return {
            ...pos,
            price: newPrice,
          };
        })
      );
    }, 3000);

    return () => {
      window.removeEventListener("orderUpdate", fetchPositions);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {allPositions.length === 0 ? (
        <div className="no-orders text-center mt-5">
          <p>No open positions</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const pnl = curValue - stock.avg * stock.qty;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                
                // Calculate dynamic percentage change
                const chg = stock.avg !== 0 
                  ? ((stock.price - stock.avg) / stock.avg) * 100 
                  : 0;
                const chgClass = chg >= 0 ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profClass}>
                      {pnl.toFixed(2)}
                    </td>
                    <td className={chgClass}>
                      {chg !== 0 ? (chg > 0 ? "+" : "") + chg.toFixed(2) + "%" : "0.00%"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
