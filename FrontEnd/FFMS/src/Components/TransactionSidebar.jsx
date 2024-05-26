import React, { useState } from "react";

import "../Styles/TransactionSidebar.css";

const Sidebar = ({ onSelectTransactionType }) => {
  const [selectedTransactionType, setSelectedTransactionType] = useState("");

  const transactionTypes = [
    "Atm Transaction",
    "Cash Transaction",
    "Card pos to Merchant",
    "Card online to Merchant",
    "Mobile Wallet to Account",
    "Mobile Wallet to Merchant",
  ];

  const handleTransactionTypeClick = (transactionType) => {
    setSelectedTransactionType(transactionType);
    onSelectTransactionType(transactionType);
  };

  return (
    <div className="sidebar">
      <ul>
        {transactionTypes.map((transactionType, index) => (
          <li
            key={index}
            className={`sidebar-item ${
              selectedTransactionType === transactionType ? "active" : ""
            }`}
            onClick={() => handleTransactionTypeClick(transactionType)}
          >
            {transactionType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
