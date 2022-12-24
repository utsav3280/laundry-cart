import React from "react";
import { Link } from "react-router-dom";
import "./Style/style.css";

function Header() {
  return (
    <div>
      <header>
        <div id="logo_name">
          <h2>laundry</h2>
        </div>
        <div id="nav_links">
          <p>home</p>
          <p>pricing</p>
          <p>career</p>
          <Link to="/" style={{textDecoration: "none"}}><p id="avatar">sign in</p></Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
