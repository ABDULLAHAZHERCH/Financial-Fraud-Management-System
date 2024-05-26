import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Bank.css";

const Bank = () => {
  const [bankName, setBankName] = useState("");
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBank() {
      try {
        const response = await fetch("http://localhost:5000/api/viewbanks");
        if (response.ok) {
          const data = await response.json();
          setBanks(data);
          setError("");
        } else {
          setError("Error fetching banks");
        }
      } catch (error) {
        setError("Error fetching banks");
        console.error("Error fetching banks:", error);
      }
    }
    fetchBank();
  }, []);

  const handleInputChange = (e) => {
    setBankName(e.target.value);
  };

  const handleAddBank = async () => {
    if (bankName.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5000/api/addbank", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: bankName }),
        });
        if (response.ok) {
          const data = await response.json();
          setBanks([...banks, { BankName: data.insertedBankName }]);
          setBankName("");
          setError("");
        } else {
          setError("Error adding bank");
        }
      } catch (error) {
        setError("Error adding bank");
        console.error("Error adding bank:", error);
      }
    }
  };

  const handleUpdateBank = async (bankId, newName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/updatebank/${bankId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        }
      );
      if (response.ok) {
        setBanks(
          banks.map((bank) =>
            bank.BankID === bankId ? { ...bank, BankName: newName } : bank
          )
        );
        setError("");
      } else {
        setError("Error updating bank");
      }
    } catch (error) {
      setError("Error updating bank");
      console.error("Error updating bank:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Bank Management</h1>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Bank Name"
            value={bankName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-auto">
          <button className="btn-add" type="button" onClick={handleAddBank}>
            Add Bank
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Bank Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank, index) => (
            <tr key={index}>
              <td>{bank.BankName}</td>
              <td className="action-buttons">
                <button
                  className="btn-1"
                  onClick={() => {
                    const newName = prompt(
                      "Enter new name for the bank:",
                      bank.BankName
                    );
                    if (newName !== null) {
                      handleUpdateBank(bank.BankID, newName);
                    }
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Bank;
