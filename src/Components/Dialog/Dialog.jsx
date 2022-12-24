import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Style/style.css";
export default function Logout({ showModal, setShowModal }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };
  return (
    <>
      {showModal ? (
        <div
          id="myModal"
          style={{
            display: "block",
            width: 120,
            padding: "10px",
            borderRadius: "4px"
          }}
        >
          <Modal.Dialog>
            <Modal.Footer>
              <Button variant="primary" onClick={logout} style={{padding: "5px", backgroundColor:"red", color:"white", border:"none", borderRadius: "2px", marginLeft: "5px", cursor: "pointer"}}>
                Log out
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowModal((prev) => !prev)}
                style={{padding: "5px", backgroundColor:"blue", color:"white", border:"none", borderRadius: "2px", marginLeft: "15px", cursor: "pointer"}}
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
