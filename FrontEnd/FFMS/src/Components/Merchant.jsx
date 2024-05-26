import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Merchant.css";

import MerchantDetails from "../Components/MerchantDetails.jsx";
import MerchantTransaction from "./MerchantTransaction.jsx";

const Merchant = () => {
  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState("");
  const [selectedMerchantId, setSelectedMerchantId] = useState("");
  const [selectedMerchantIdTransaction, setSelectedMerchantIdTransaction] =useState("");
  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await fetch("http://localhost:5000/api/viewmerchants");
        if (response.ok) {
          const data = await response.json();
          setMerchants(data);
          setError("");
        } else {
          setError("Error fetching merchants");
        }
      } catch (error) {
        setError("Error fetching merchants");
        console.error("Error fetching merchants:", error);
      }
    }
    fetchMerchants();
  }, []);

  const handleTransactionsMerchant = (merchantId) => {
    setSelectedMerchantIdTransaction(merchantId);
  };

  const handleDetails = (merchantId) => {
    setSelectedMerchantId(merchantId);
  };

  const handleClosePopup = () => {
    setSelectedMerchantIdTransaction(null);
    setSelectedMerchantId(null);
  };

  return (
    <div className="container">
      <h1 className="heading">Merchant Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Merchant Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {merchants.map((merchant, index) => (
            <tr key={index}>
              <td>{merchant.MerchantName}</td>
              <td className="action-buttons">
                <button
                  className="btn-1"
                  onClick={() => handleDetails(merchant.MerchantID)}
                >
                  Details
                </button>
                <button
                  className="btn-1"
                  onClick={() =>
                    handleTransactionsMerchant(merchant.MerchantID)
                  }
                >
                  Transactions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error-message">{error}</div>}
      {selectedMerchantId && (
        <MerchantDetails
          merchantId={selectedMerchantId}
          onClose={handleClosePopup}
        />
      )}
      {selectedMerchantIdTransaction && (
        <MerchantTransaction
          merchantId={selectedMerchantIdTransaction}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Merchant;
