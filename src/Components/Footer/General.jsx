import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";
import "./Style/style.css";

function General() {
  return (
    <div>
      <section id="general_info">
        <div id="about_us">
          <h4>ABOUT US</h4>
          <p style={{ color: "#3D3D43" }}>door step wash & dry clean service</p>
        </div>
        <div id="general">
          <div id="row-1">
            <p>home</p>
            <p>sign in</p>
            <p>register</p>
          </div>
          <div id="row-2">pricing</div>
          <div id="row-3">
            <p>career</p>
            <p>blogs</p>
            <p>create</p>
          </div>
          <div id="row-4">contact</div>
        </div>
        <div id="social_media">
          <div>
            <h4>SOCIAL MEDIA</h4>
          </div>
          <div id="icons">
            <ImFacebook2 style={{ fontSize: "18px", marginRight: "15px" }} />
            <FaInstagramSquare
              style={{ fontSize: "20.5px", marginRight: "15px" }}
            />
            <RxLinkedinLogo
              style={{ fontSize: "20.5px", marginRight: "15px" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default General;
