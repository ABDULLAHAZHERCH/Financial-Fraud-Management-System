import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MobileToMerchantTransaction = ({ merchantId, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `http://localhost:5000/api/getmobiletomerchantansactions/${merchantId}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
          setError("");
          setLoading(false);
        } else {
          setError("Error fetching mobile wallet to merchant transactions");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching mobile wallet to merchant transactions");
        console.error(
          "Error fetching mobile wallet to merchant transactions:",
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
  }, [merchantId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}></button>
        <div>
          <h2 className="heading">Mobile Wallet to Merchant Transactions</h2>
          <div className="table-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Account Number</th>
                      <th>Merchant Name</th>
                      <th>Amount</th>
                      <th>Transaction Time</th>
                      <th>Device</th>
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
                          <td>{transaction["Merchant Name"]}</td>
                          <td>{transaction.Amount}</td>
                          <td>{transaction["Transaction Time"]}</td>
                          <td>{transaction["Device Type"]}</td>
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

export default MobileToMerchantTransaction;
