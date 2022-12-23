import React from "react";
import General from "./General";
import Referral from "./Referral";
import Copyright from "../Copyright/Copyright";
import "./Style/style.css";

function Footer() {
  return (
    <div>
      <footer>
        <Referral />
        <General />
        <Copyright />
      </footer>
    </div>
  );
}

export default Footer;
