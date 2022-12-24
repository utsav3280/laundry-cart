import React, { useEffect } from "react";
import Data from "./Data";
import { useState } from "react";
import axios from "axios";
import "./Style/style.css";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import { Button, DialogTitle, DialogActions, Modal, Box } from "@mui/material";
import { VscChromeClose } from "react-icons/vsc";
import Header from "../HeaderTwo/HeaderTwo";
import Sidebar from "../Sidebar/Sidebar";
import Copyright from "../Copyright/Copyright";
import { TextField } from "@mui/material";
import { GiWashingMachine } from "react-icons/gi";
import { MdIron } from "react-icons/md";
import { GiTowel, GiPaperBagFolded } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import blanket from "./Assets/blanket.png";
import cloth from "./Assets/cloth.png";
import jeans from "./Assets/jeans.png";
import jogger from "./Assets/jogger-pants.png";
import pants from "./Assets/pants.png";
import shorts from "./Assets/shorts.png";
import tshirt from "./Assets/tshirt.png";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function ProductList() {
  const [info] = useState(Data);
  const [update, setUpdate] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleChange = (val, id) => {
    [...info][id].quantity = val;
    setUpdate(val);
  };
  const [icons, setIcons] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);
  useEffect(() => {
    console.log(data);
  });
  const washType = (opt, id) => {
    if (info[id].quantity !== "") {
      if (![...info][id].washOption.includes(opt)) {
        [...info][id].washOption.push(opt);
        if (opt == "wash") setIcons([...icons], (icons[id][0] = true));
        if (opt == "press") setIcons([...icons], (icons[id][1] = true));
        if (opt == "fold") setIcons([...icons], (icons[id][2] = true));
        if (opt == "pack") setIcons([...icons], (icons[id][3] = true));
        console.log("icons", icons);
      } else {
        let arr = [];
        for (let i = 0; i < [...info][id].washOption.length; i++) {
          if ([...info][id].washOption[i] === opt) {
            if (opt == "wash") setIcons([...icons], (icons[id][0] = false));
            if (opt == "press") setIcons([...icons], (icons[id][1] = false));
            if (opt == "fold") setIcons([...icons], (icons[id][2] = false));
            if (opt == "pack") setIcons([...icons], (icons[id][3] = false));
            console.log("icons", icons);
            continue;
          }
          arr.push([...info][id].washOption[i]);
        }
        [...info][id].washOption = arr;
      }
      let sum = 0;
      for (let i = 0; i < [...info][id].washOption.length; i++) {
        console.log([...info][id].washOption[i]);
        switch ([...info][id].washOption[i]) {
          case "wash": {
            sum += 20;
            break;
          }
          case "press": {
            sum += 15;
            break;
          }
          case "fold": {
            sum += 10;
            break;
          }
          case "pack": {
            sum += 25;
            break;
          }
        }
      }
      [...info][id].serviceSum = sum;
      [...info][id].totalPrice =
        [...info][id].serviceSum * [...info][id].quantity;
      setUpdate(sum);
    }
    console.log(info);
  };

  const reset = (id) => {
    [...info][id].quantity = "";
    [...info][id].washOption = [];
    [...info][id].serviceSum = "-";
    [...info][id].totalPrice = 0;
    setIcons(
      [...icons],
      (icons[id][0] = false),
      (icons[id][1] = false),
      (icons[id][2] = false),
      (icons[id][3] = false)
    );
    setUpdate(1);
    console.log(info);
  };

  const resetAll = () => {
    for(let i=0; i<7; i++){
      reset(i);
    }
  };

  const sendData = async () => {
    console.log("check");
    if (data.length !== 0) {
      await axios.post("https://laundry-cart-backend-z3lt.onrender.com/orders/create", data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      navigate("/pastOrder");
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    let reqData = [];
    for (let i = 0; i < info.length; i++) {
      if (info[i].quantity !== "") reqData.push(info[i]);
    }
    console.log(reqData);
    setData({ reqData });
    let updatedSum = 0;
    for (let i = 0; i < reqData.length; i++) {
      updatedSum += reqData[i].totalPrice;
    }
    setTotal(updatedSum);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const items = [cloth, tshirt, pants, jeans, shorts, jogger, blanket];

  const style = {
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [alert, setAlert] = useState(false);
  const alertOpen = () => setAlert(true);
  const alertClose = () => setAlert(false);
  return (
    <div id="main-pastorder">
      <Modal
        open={alert}
        onClose={alertClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <img
              style={{ width: "100px", height: "100px" }}
              src={
                "https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png"
              }
            />
          </div>
          <h1 style={{ marginBottom: "0" }}>Order placed</h1>
          <h1 style={{ marginTop: "0" }}> successfully</h1>
          <Button
            sx={{ backgroundColor: "#5861AE" }}
            variant="contained"
            onClick={sendData}
          >
            Go to orders
          </Button>
        </Box>
      </Modal>
      <Dialog
        PaperProps={{
          sx: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "45%",
            m: 0,
            maxWidth: 900,
            maxHeight: 713,
          },
        }}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <div>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            <h3>Summary</h3>
            <h3 onClick={handleClose}>
              <VscChromeClose style={{ cursor: "pointer" }} />
            </h3>
          </DialogTitle>
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
          <div id="order-details-confirm">
            <table id="confirm-order-table">
              <tbody>
                <tr><strong>-----ORDER DETAILS</strong></tr>
                {data.length !== 0
                  ? data.reqData.map((ele, id) => {
                      return (
                        <tr key={id} style={{borderBottom: "10px solid black"}}>
                          <td>{ele.product}</td>

                          <td>{ele.washOption + " "}</td>
                          <td>
                            {ele.quantity + " x " + ele.serviceSum + "   = "}
                          </td>
                          <td style={{ color: "#5861AE" }}>{ele.totalPrice}</td>
                        </tr>
                      );
                    })
                  : null}
                <tr>
                  <td></td>
                  <td></td>
                  <td>subtotal : </td>
                  <td>{total}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Pickup charges : </td>
                  <td>{60}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total price : </td>
                  <td>{total + 60}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="address-confirm"></div>
          <DialogActions
            style={{
              backgroundColor: "#F4F4F4",
              height: "40px",
              marginRight: "20px",
            }}
          >
            <Button variant="contained" onClick={alertOpen}>
              Confirm
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <div>
        <Header />
        <div id="product-list-main">
          <section id="sidebar-productlist">
            <Sidebar />
          </section>
          <section id="product-table-section">
            <div id="product-list-section1">
              <h3>Create order</h3>
              <TextField
                type={"text"}
                label={<IoSearchOutline />}
                variant="standard"
              />
            </div>
            <div id="product-list-section">
              <table
                id="product-list-table"
                cellSpacing={0}
                cellPadding={0}
                border={0}
              >
                <thead>
                  <tr>
                    <th>Product Types</th>
                    <th>Quantity</th>
                    <th>Wash Types</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {info.map((ele, id) => {
                    return (
                      <tr key={id}>
                        <td style={{ width: "200px" }}>
                          <img src={items[id]} alt={ele.product} />
                          <h3 style={{ display: "inline" }}> {ele.product}</h3>
                        </td>
                        <td style={{ width: "100px" }}>
                          <input
                            inputmode="numeric"
                            type={"number"}
                            style={{ width: "35px", outlineColor: "#5861AE" }}
                            placeholder="0"
                            value={info[id].quantity}
                            onChange={(e) => handleChange(e.target.value, id)}
                          />
                        </td>
                        <td id="wash-types" style={{ width: "400px" }}>
                          {!icons[id][0] ? (
                            <GiWashingMachine
                              onClick={() => washType("wash", id)}
                              className="wash-type-icons"
                            />
                          ) : (
                            <GiWashingMachine
                              onClick={() => washType("wash", id)}
                              style={{ color: "#5861AE" }}
                              className="wash-type-icons"
                            />
                          )}

                          {!icons[id][1] ? (
                            <MdIron
                              onClick={() => washType("press", id)}
                              className="wash-type-icons"
                            />
                          ) : (
                            <MdIron
                              onClick={() => washType("press", id)}
                              style={{ color: "#5861AE" }}
                              className="wash-type-icons"
                            />
                          )}

                          {!icons[id][2] ? (
                            <GiTowel
                              onClick={() => washType("fold", id)}
                              className="wash-type-icons"
                            />
                          ) : (
                            <GiTowel
                              onClick={() => washType("fold", id)}
                              style={{ color: "#5861AE" }}
                              className="wash-type-icons"
                            />
                          )}

                          {!icons[id][3] ? (
                            <GiPaperBagFolded
                              onClick={() => washType("pack", id)}
                              className="wash-type-icons"
                            />
                          ) : (
                            <GiPaperBagFolded
                              onClick={() => washType("pack", id)}
                              style={{ color: "#5861AE" }}
                              className="wash-type-icons"
                            />
                          )}
                        </td>
                        {info[id].quantity &&
                        info[id].washOption.length !== 0 ? (
                          <td style={{ width: "175px", fontWeight: "bolder" }}>
                            {`${info[id].quantity} x ${info[id].serviceSum} = `}{" "}
                            <span
                              style={{ color: "#5861AE", fontSize: "1.5rem" }}
                            >
                              {info[id].totalPrice}
                            </span>
                          </td>
                        ) : (
                          <td style={{ width: "175px" }}>-</td>
                        )}
                        {info[id].quantity ? (
                          <td style={{ width: "170px" }}>
                            <button
                              className="reset-btn"
                              onClick={() => reset(id)}
                            >
                              Reset
                            </button>
                          </td>
                        ) : (
                          <td style={{ width: "170px" }}></td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button onClick={handleClickOpen} className="proceed-btn">
              Proceed
            </button>
            <button className="reset-btn" id="cancel-btn" onClick={resetAll}>
              Cancel
            </button>
          </section>
        </div>
      </div>
      <Copyright />
    </div>
  );
}

export default ProductList;
