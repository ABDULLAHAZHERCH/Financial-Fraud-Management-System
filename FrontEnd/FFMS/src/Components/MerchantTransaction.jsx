import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/MerchantTransaction.css";

const MerchantTransaction = ({ merchantId, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `http://localhost:5000/api/getmerchanttransactions/${merchantId}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
          setError("");
          setLoading(false);
        } else {
          setError("Error fetching transactions");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching transactions");
        console.error("Error fetching transactions:", error);
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
  }, [merchantId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content pop" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close btn" onClick={onClose}></button>
        <div>
          <h2 className="heading">Transactions to Merchant Account</h2>
          <div className="table-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Customer </th>
                      <th>Age</th>
                      <th>Amount</th>
                      <th>Time Stamp</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error ? (
                      <tr>
                        <td colSpan="5">{error}</td>
                      </tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.CustomerName}</td>
                          <td>{transaction.CustomerAge}</td>
                          <td>{transaction.Amount}</td>
                          <td>{transaction.TransactionTime}</td>
                          <td>{transaction.TransactionType}</td>
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

export default MerchantTransaction;
