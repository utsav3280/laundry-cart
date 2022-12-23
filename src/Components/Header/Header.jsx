import React from "react";
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
          <p id="avatar">sign in</p>
        </div>
      </header>
    </div>
  );
}

export default Header;
