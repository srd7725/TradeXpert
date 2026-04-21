import React, { useState, useEffect } from "react";
// import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3002/allHoldings").then((res) => {
  //     // console.log(res.data);
  //     setAllHoldings(res.data);
  //   });
  // }, []);

 useEffect(() => {
  const dummyHoldings = [
    { name: "BHARTIARTL", qty: 5, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%", isLoss: false },
    { name: "HDFCBANK", qty: 2, avg: 1522.35, price: 1522.35, net: "+0.00%", day: "+1.01%", isLoss: false },
    { name: "HINDUNILVR", qty: 3, avg: 2335.85, price: 2417.40, net: "+3.49%", day: "+0.21%", isLoss: false },
    { name: "INFY", qty: 3, avg: 1350.50, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
    { name: "ITC", qty: 5, avg: 202.00, price: 207.90, net: "+2.92%", day: "+0.80%", isLoss: false },
    { name: "KPITTECH", qty: 4, avg: 250.30, price: 266.45, net: "+6.45%", day: "+3.64%", isLoss: false },
    { name: "M&M", qty: 2, avg: 809.90, price: 779.80, net: "-3.72%", day: "-0.01%", isLoss: true },
    { name: "RELIANCE", qty: 1, avg: 2193.70, price: 2112.40, net: "-3.71%", day: "+1.44%", isLoss: true },
    { name: "SBIN", qty: 4, avg: 324.35, price: 430.20, net: "+32.65%", day: "-0.34%", isLoss: false },
    { name: "SGBMAY29", qty: 2, avg: 4727.00, price: 4719.00, net: "-0.17%", day: "+0.15%", isLoss: true },
    { name: "TATAPOWER", qty: 6, avg: 104.20, price: 124.15, net: "+19.14%", day: "-0.24%", isLoss: false },
    { name: "TCS", qty: 1, avg: 3041.70, price: 3194.80, net: "+5.03%", day: "-0.25%", isLoss: false },
    { name: "WIPRO", qty: 3, avg: 489.30, price: 577.75, net: "+18.08%", day: "+0.32%", isLoss: false }
  ];

  setAllHoldings(dummyHoldings);
}, []);
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
