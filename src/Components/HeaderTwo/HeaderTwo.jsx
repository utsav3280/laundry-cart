import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Style/style.css";
import Dialog from "../Dialog/Dialog";
import { useNavigate } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div>
      <header>
        <div id="logo_name">
          <h2>laundry</h2>
        </div>
        <div id="nav_links">
          <p>pricing</p>
          <p>career</p>
          <p id="avatar" onClick={openModal}>
            sign in
          </p>
          <Dialog showModal={showModal} setShowModal={setShowModal} />
        </div>
      </header>
    </div>
  );
}

export default Header;
