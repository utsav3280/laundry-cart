import React from "react";
import { VscChromeClose } from "react-icons/vsc";

function StoreLoc({ closed }) {
  return (
    <div id="dialog-summary">
      <div id="dialog-title">
        <h2>Summary</h2>
        <h2>
          <VscChromeClose onClick={closed} />
        </h2>
      </div>
      <div id="dialog-store-info">
        <div style={{ marginLeft: "30px" }}>
          <h4>Store location :</h4>
          <p>Jp nagar</p>
        </div>
        <div>
          <h4>Store address :</h4>
          <p>Near phone booth, 10th street</p>
        </div>
        <div>
          <h4>Phone :</h4>
          <p>+91 9180507211</p>
        </div>
      </div>
    </div>
  );
}

export default StoreLoc;
