import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const ATMTransaction = ({ atmId, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `http://localhost:5000/api/getatmtransactions/${atmId}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
          setError("");
          setLoading(false);
        } else {
          setError("Error fetching ATM transactions");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching ATM transactions");
        console.error("Error fetching ATM transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();

    // Cleanup function
    return () => {
      setTransactions([]);
      setError("");
      setLoading(true);
    };
  }, [atmId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}></button>
        <div>
          <h2 className="heading">ATM Transactions</h2>
          <div className="table-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Account No </th>
                      <th>Amount</th>
                      <th>TimeStamp</th>
                      <th>Card No</th>
                      <th>ATM Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error ? (
                      <tr>
                        <td colSpan="4">{error}</td>
                      </tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction["Account Number"]}</td>
                          <td>{transaction.Amount}</td>
                          <td>{transaction["Transaction Time"]}</td>
                          <td>{transaction["Card Number"]}</td>
                          <td>{transaction["ATM Location"]}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMTransaction;
