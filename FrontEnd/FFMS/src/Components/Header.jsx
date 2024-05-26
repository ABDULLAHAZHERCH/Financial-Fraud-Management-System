import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  return (
    <header className="header navbar navbar-expand-lg navbar-dark bg-dark">
      <h1 className="navbar-brand">Financial Fraud Detection System</h1>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              exact={true}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/banks">
              Banks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/merchants"
            >
              Merchants
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/transactions"
            >
              Transactions
            </NavLink>
          </li>
          {/*
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/alerts"
            >
              Fraud Alerts
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/reports"
            >
              Reports
            </NavLink>
          </li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
