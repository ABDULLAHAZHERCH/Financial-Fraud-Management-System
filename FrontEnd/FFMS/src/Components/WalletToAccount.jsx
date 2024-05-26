import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MobileToAccountTransaction = ({ accountId, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `http://localhost:5000/api/getmobiletoaccountransactions/${accountId}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
          setError("");
          setLoading(false);
        } else {
          setError("Error fetching mobile wallet to account transactions");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching mobile wallet to account transactions");
        console.error(
          "Error fetching mobile wallet to account transactions:",
          error
        );
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
  }, [accountId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}></button>
        <div>
          <h2 className="heading">Mobile Wallet to Account Transactions</h2>
          <div className="table-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Account Number</th>
                      <th>Amount</th>
                      <th>Transaction Time</th>
                      <th>Device</th>
                      <th>Recipient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error ? (
                      <tr>
                        <td colSpan="3">{error}</td>
                      </tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction["Account Number"]}</td>
                          <td>{transaction.Amount}</td>
                          <td>{transaction["Transaction Time"]}</td>
                          <td>{transaction["Device Type"]}</td>
                          <td>{transaction["Recipient Account Number"]}</td>
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

export default MobileToAccountTransaction;
