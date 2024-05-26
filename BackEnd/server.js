const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require("./configuration");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Connection pooling setup
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// View Banks
app.get("/api/viewbanks", async (req, res) => {
  await poolConnect;
  try {
    const result = await pool.request().query("SELECT * FROM Bank");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching banks data:", error);
    res.status(500).json({ error: "Error fetching banks data" });
  }
});

// Add Bank
app.post("/api/addbank", async (req, res) => {
  await poolConnect;
  try {
    const { name } = req.body;
    const result = await pool
      .request()
      .query(`INSERT INTO Bank (BankName) VALUES ('${name}')`);
    res
      .status(200)
      .json({ message: "Bank added successfully", insertedBankName: name });
  } catch (error) {
    console.error("Error adding bank:", error);
    res.status(500).json({ error: "Error adding bank" });
  }
});

// Delete Bank
app.delete("/api/deletebank/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`DELETE FROM Bank WHERE BankID = ${id}`);
    res.status(200).json({ message: "Bank deleted successfully" });
  } catch (error) {
    console.error("Error deleting bank:", error);
    res.status(500).json({ error: "Error deleting bank" });
  }
});

// Update Bank
app.put("/api/updatebank/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool
      .request()
      .query(`UPDATE Bank SET BankName = '${name}' WHERE BankID = ${id}`);
    res.status(200).json({ message: "Bank updated successfully" });
  } catch (error) {
    console.error("Error updating bank:", error);
    res.status(500).json({ error: "Error updating bank" });
  }
});
// view Merchants
app.get("/api/viewmerchants", async (req, res) => {
  await poolConnect;
  try {
    const result = await pool
      .request()
      .query("SELECT MerchantID,MerchantName FROM Merchant");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching Merchants data:", error);
    res.status(500).json({ error: "Error fetching Merchants data" });
  }
});
// Merchant Details by id
app.get("/api/getmerchantdetails/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT * FROM Merchant WHERE MerchantID = ${id}`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Merchant not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Error fetching merchant details:", error);
    res.status(500).json({ error: "Error fetching merchant details" });
  }
});
// Merchant transactions by id
app.get("/api/getmerchanttransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT * FROM fn_MerchantTransactions(${id})`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Merchant not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching merchant transactions:", error);
    res.status(500).json({ error: "Error fetching merchant transactions" });
  }
});
// get Account ID by AccountNumber
app.get("/api/getaccountid/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT AccountID FROM Account Where AccountNumber=${id}`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Error fetching Account :", error);
    res.status(500).json({ error: "Error fetching Account" });
  }
});
// ATM Transactions
app.get("/api/getatmtransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT * FROM fn_AccountATMTransactions(${id})`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching atm transactions:", error);
    res.status(500).json({ error: "Error fetching atm transactions" });
  }
});
// Cash Transactions
app.get("/api/getcashtransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT * FROM fn_AccountCashTransactions(${id})`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching cash transactions:", error);
    res.status(500).json({ error: "Error fetching cash transactions" });
  }
});
// Card POS Transactions
app.get("/api/getcardpostransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT * FROM fn_AccountCardPosTransactionsToMerchants(${id})`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching cash pos transactions:", error);
    res.status(500).json({ error: "Error fetching cash pos transactions" });
  }
});
// Card Online Transactions
app.get("/api/getcardonlinetransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM fn_AccountCardOnlineTransactionsToMerchants(${id})`
      );
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching cash pos transactions:", error);
    res.status(500).json({ error: "Error fetching cash pos transactions" });
  }
});
// Mobile Wallet to Account
app.get("/api/getmobiletoaccountransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM fn_AccountMobileWalletTransactionsToAccounts(${id})`
      );
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching cash pos transactions:", error);
    res.status(500).json({ error: "Error fetching cash pos transactions" });
  }
});
// Mobile Wallet to Merchant
app.get("/api/getmobiletomerchantansactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM fn_AccountMobileWalletTransactionsToMerchant(${id})`
      );
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching cash pos transactions:", error);
    res.status(500).json({ error: "Error fetching cash pos transactions" });
  }
});
// Get total Transactions for Account
app.get("/api/gettotaltransactions/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(
        `SELECT COUNT(*) AS total FROM Transactions WHERE AccountID =${id}`
      );
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Transactions not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Error fetching cash pos transactions:", error);
    res.status(500).json({ error: "Error fetching cash pos transactions" });
  }
});
// get account details
app.get("/api/getdetails/:id", async (req, res) => {
  await poolConnect;
  try {
    const { id } = req.params;
    const result = await pool
      .request()
      .query(`SELECT * FROM dbo.fn_AccountDetails(${id})`);
    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Details not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Error fetching details" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
