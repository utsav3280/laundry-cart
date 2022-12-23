import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Style/style.css";
export default function Logout({ showModal, setShowModal }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      {showModal ? (
        <div
          id="myModal"
          style={{
            display: "block",
            width: 200,
            padding: 20,
          }}
        >
          <Modal.Dialog>
            <Modal.Footer>
              <Button variant="primary" onClick={logout}>
                Log out
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowModal((prev) => !prev)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : null}
    </>
  );
}
