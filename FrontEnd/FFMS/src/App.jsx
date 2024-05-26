import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Bank from "./Components/Bank";
import Merchant from "./Components/Merchant";
import Transaction from "./Components/Transaction";
import Report from "./Components/Report";
import Alerts from "./Components/Alerts"

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banks" element={<Bank />} />
            <Route path="/merchants" element={<Merchant />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Report />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
