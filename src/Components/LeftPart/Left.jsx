import React from "react";
import "./Style/style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Left({ signin, register, page }) {
  return (
    <div id="left_part">
      <h1 id="service">Laundry</h1>
      <h1>Service</h1>
      <p>
        door step wash & <span id="dry">dry clean service</span>
      </p>
      {page ? (
        <p id="account_msg">don't have an account ?</p>
      ) : (
        <p id="account_msg">already have an account ?</p>
      )}

      {page ? (
        <button onClick={signin}>Register</button>
      ) : (
        <button onClick={register}>Sign In</button>
      )}

      <div id="border"></div>
    </div>
  );
}

export default Left;
