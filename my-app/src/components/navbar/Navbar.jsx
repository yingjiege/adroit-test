import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="d-flex justify-content-center py-3">
      <div className="col-md-3 mb-2 mb-md-0">
        <a
          href="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <img
            src="https://adroitmanufacturing.allmoxy.com/data/header/Adroit_logo_3d-01-01.png"
            alt="adroit-manufacturing-logo"
            width={120}
            height={50}
          />
        </a>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <a href="/" className="nav-link px-2 link-secondary" >
            
            <Link to="/shop">Shop</Link>

          </a>
        </li>
        <li>
          <a href="/" className="nav-link px-2">
            <Link to="/report">History</Link>
          </a>
        </li>
      </ul>

      <div class="col-md-3 text-end">
        <Link to="/account-setting">
          <button type="button" className="btn btn-outline-primary me-2" style={{ width: "auto", maxWidth: "150px" }}>
            Account
          </button>{" "}
        </Link>
        <Link to="/login">
          <button type="button" className="btn btn-outline-primary me-2" style={{ width: "auto", maxWidth: "150px" }}>
            Login
          </button>{" "}
        </Link>
        <Link to="/register">
          <button type="button" className="btn btn-primary" style={{ width: "auto", maxWidth: "150px" }}>
            Sign up
          </button>
        </Link>
      </div>
    </header>
  );
}
