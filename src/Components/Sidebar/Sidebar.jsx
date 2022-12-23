import React from "react";
import "./Style/style.css";
import home from "./Assets/home.png";
import more from "./Assets/more.png";
import list from "./Assets/list.png";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div id="side-navbar">
      <Link to={"/pastOrder"}>
        {" "}
        <img src={home} alt="home" style={{ marginTop: "30px" }} />
      </Link>
      <Link to={"/createOrder"}>
        <img src={more} alt="more" />
      </Link>
      <Link to={"/pastOrder"}>
        <img
          src={list}
          alt="list"
          style={{ backgroundColor: "white", width: "20px", height: "20px" }}
        />
      </Link>
    </div>
  );
}

export default Sidebar;
