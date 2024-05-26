import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Transaction.css";

import Sidebar from "./TransactionSidebar";
import ATMTransaction from "./AtmTable";
import CashTransaction from "./CashTable";
import CardToMerchantTransaction from "./CardPosToMerchant";
import CardOnlineToMerchantTransaction from "./CardOnlinetoMerchant";
import MobileToAccountTransaction from "./WalletToAccount";
import MobileToMerchantTransaction from "./WalletToMerchant";

const Transaction = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [ID, setID] = useState("");
  const [count, setCount] = useState("");
  const [showATM, setShowATM] = useState(false);
  const [showCash, setShowCash] = useState(false);
  const [showposctm, setShowposctm] = useState(false);
  const [showontm, setShowontm] = useState(false);
  const [showmta, setShowmta] = useState(false);
  const [showmtm, setShowmtm] = useState(false);
  const [details, setDetails] = useState([]);

  const onSelectTransactionType = (transactionType) => {
    console.log("Selected transaction type:", transactionType);
    if (transactionType === "Atm Transaction") {
      setShowATM(true);
    } else if (transactionType === "Cash Transaction") {
      setShowCash(true);
    } else if (transactionType === "Mobile Wallet to Account") {
      setShowmta(true);
    } else if (transactionType === "Mobile Wallet to Merchant") {
      setShowmtm(true);
    } else if (transactionType === "Card pos to Merchant") {
      setShowposctm(true);
    } else if (transactionType === "Card online to Merchant") {
      setShowontm(true);
    } else {
      console.log("Error");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const gettotal = async () => {
    try {
      const url = `http://localhost:5000/api/gettotaltransactions/${ID}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setCount(data.total);
      } else {
        setError("Error fetching total transactions");
      }
    } catch (error) {
      setError("Error fetching total transactions");
      console.error("Error fetching total transactions:", error);
    }
  };

  const getdetails = async () => {
    try {
      const url = `http://localhost:5000/api/getdetails/${ID}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      } else {
        setError("Error fetching details");
      }
    } catch (error) {
      setError("Error fetching details");
      console.error("Error fetching details:", error);
    }
  };

  const handleSearch = async () => {
    console.log("Searching for account with account number:", searchQuery);
    if (searchQuery.trim() !== "") {
      try {
        const url = `http://localhost:5000/api/getaccountid/${searchQuery}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setID(data.AccountID);
          setError("");
          await gettotal();
          await getdetails();
        } else {
          setError("Error fetching accountid");
        }
      } catch (error) {
        setError("Error fetching accountid");
        console.error("Error fetching accountid:", error);
      }
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setError("");
    setID("");
    setCount("");
  };

  const handleClosePopup = () => {
    setShowATM(false);
    setShowCash(false);
    setShowmta(false);
    setShowmtm(false);
    setShowontm(false);
    setShowposctm(false);
  };

  return (
    <div>
      <div className="refresh">
        <button className="btn-add" type="button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      <div className="boxe">
        <input
          type="text"
          className="form-control"
          placeholder="Search by account number"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="butt">
        <button className="btn-add" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="bar">
        <Sidebar
          onSelectTransactionType={onSelectTransactionType}
          searchQuery={searchQuery}
        />
      </div>
      <div className="details">
        <p>Account Name: {details.Name || "N/A"}</p>
        <p>Account Balance: ${details.AccountBalance || "0"} </p>
        <p>Total Transactions: {count || error || "0"}</p>
      </div>
      {showATM && <ATMTransaction onClose={handleClosePopup} atmId={ID} />}
      {showCash && <CashTransaction onClose={handleClosePopup} cashId={ID} />}
      {showposctm && (
        <CardToMerchantTransaction onClose={handleClosePopup} merchantId={ID} />
      )}
      {showontm && (
        <CardOnlineToMerchantTransaction
          onClose={handleClosePopup}
          merchantId={ID}
        />
      )}
      {showmta && (
        <MobileToAccountTransaction onClose={handleClosePopup} accountId={ID} />
      )}
      {showmtm && (
        <MobileToMerchantTransaction
          onClose={handleClosePopup}
          merchantId={ID}
        />
      )}
    </div>
  );
};

export default Transaction;
