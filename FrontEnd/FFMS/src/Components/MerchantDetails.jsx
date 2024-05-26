import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/MerchantDetails.css";

const MerchantDetails = ({ merchantId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMerchantDetails = async () => {
      try {
        const url = `http://localhost:5000/api/getmerchantdetails/${merchantId}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setDetails(data);
          setError("");
        } else {
          setError("Error fetching merchant details");
        }
      } catch (error) {
        setError("Error fetching merchant details");
        console.error("Error fetching merchant details:", error);
      }
    };

    fetchMerchantDetails();

    // Cleanup function
    return () => {
      setDetails(null);
      setError("");
    };
  }, [merchantId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}></button>
        {details ? (
          <div>
            <h2>Merchant Details</h2>
            <p>Name: {details.MerchantName}</p>
            <p>Amount: ${details.Amount}</p>
            <p>Email: {details.MerchantEmail || "N/A"}</p>
            <p>Contact: {details.MerchantContact || "N/A"}</p>
          </div>
        ) : (
          <p>{error || "Loading..."}</p>
        )}
      </div>
    </div>
  );
};

export default MerchantDetails;
