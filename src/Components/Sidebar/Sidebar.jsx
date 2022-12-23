import React from "react";
import "./Style/style.css";
import home from "./Assets/home.png";
import more from "./Assets/more.png";
import list from "./Assets/list.png";
import { padding } from "@mui/system";

function Sidebar() {
  return (
    <div id="side-navbar">
      <img src={home} alt="home" style={{ marginTop: "30px" }} />
      <img src={more} alt="more" />
      <img
        src={list}
        alt="list"
        style={{ backgroundColor: "white", width: "20px", height: "20px" }}
      />
    </div>
  );
}

export default Sidebar;
