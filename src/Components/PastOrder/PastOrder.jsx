import { useState } from "react";
import { useEffect } from "react";
import "./Style/style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../HeaderTwo/HeaderTwo";
import Copyright from "./../Copyright/Copyright";
import Sidebar from "../Sidebar/Sidebar";
import { VscChromeClose } from "react-icons/vsc";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import {
  Button,
  DialogTitle,
  DialogActions,
  Modal,
  Box,
  Dialog,
  TextField,
} from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";

const PastOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const fixedCharge = 60;

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setOrderList(res.data.orders))
      .catch((err) => console.log(err));
  }, []);
  const [orderData, setOrderData] = useState([]);

  const displayOrder = async (e) => {
    let id = e.target.value;
    await axios
      .post(
        "http://localhost:5000/orders/id",
        { id },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.orders);
        setOrderData(res.data.orders[0].OrderDetails[0].reqData);
        console.log(res.data.orders[0].OrderDetails[0].reqData);
        setTotal(res.data.orders[0].price);
        setOrderNum(res.data.orders[0]._id);
        setOrderStatus(res.data.orders[0].status);
        console.log(res.data.orders[0].status);
      })
      .catch((err) => console.log(err));
    setOpen(true);
    setId("hi");
  };

  const [id, setId] = useState("");

  const cancel = async (e) => {
    let id = e.target.value;
    await axios.put(
      "http://localhost:5000/orders/id",
      { id },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    // if (id) {
    //   setId("");
    // }
    // if (orderNum) {
    //   setOrderNum("");
    // }
    window.location.reload();
  };
  const style = {
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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
  const [warning, setWarning] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const warningOpen = (e) => {
    setOrderNum(e.target.value);
    console.log(orderNum);
    setWarning(true);
  };
  const warningClose = () => setWarning(false);

  const [open, setOpen] = useState(false);

  const [total, setTotal] = useState(0);

  const [cancelId, setCancelId] = useState("");

  const [orderStatus, setOrderStatus] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //JSX
  return (
    <div id="past-order-component">
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
                <tr>Order Details</tr>
                {orderData.map((ele, id) => {
                  return (
                    <tr key={id} >
                      <td>{ele.product}</td>

                      <td>{ele.washOption + " "}</td>
                      <td>{ele.quantity + " x " + ele.serviceSum + "   = "}</td>
                      <td style={{ color: "#5861AE" }}>{ele.totalPrice}</td>
                    </tr>
                  );
                })}
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
            <Button
              disabled={orderStatus === "cancelled" ? true : false}
              sx={{ backgroundColor: "red" }}
              variant="contained"
              value={orderNum}
              onClick={warningOpen}
            >
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Modal
        open={warning}
        onClose={warningClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              padding: "0",
            }}
          >
            <h2 style={{color: "red", marginTop:"-5px", cursor: "pointer"}}>Alert</h2>
            <button onClick={warningClose} style={{border:"none", backgroundColor:"white", marginTop:"-30px", fontWeight: "bold", cursor: "pointer"}}>X</button>
          </div>
          <p style={{ marginBottom: "5px" }}>Are you sure want to cancel</p>
          {orderNum && (
            <p style={{ marginBottom: "10px" }}>the order No : {orderNum}</p>
          )}
          {cancelId && (
            <p style={{ marginTop: "0" }}>the order No : {cancelId}</p>
          )}
          <Button
            sx={{ backgroundColor: "#5861AE" }}
            variant="contained"
            onClick={cancel}
            value={orderNum}
          >
            Proceed
          </Button>
        </Box>
      </Modal>
      <section>
        <Header />
      </section>
      <section id="past-order-list">
        <div id="sidebar-list">
          <Sidebar />
        </div>
        <div id="table-list">
          <div id="product-list-section1">
            <h3 style={{flexBasis: "70%"}}>Create order</h3>
            <button style={{backgroundColor: "transparent", border: "1px solid #5861AE", borderRadius:"2px" , padding:"4px 20px"}}>
              <Link to={"/createOrder"} style={{textDecoration: "none", backgroundColor: "transparent", color: "#5861AE"}}>Create</Link>
            </button>
            <TextField
              type={"text"}
              label={<IoSearchOutline />}
              variant="standard"
            />
          </div>

          <table
            className="past-order-table"
            cellSpacing={0}
            cellPadding={0}
            border={0}
          >
            <thead>
              <th> Order Id</th>
              <th>Order Date & Time</th>
              <th>Store Location</th>
              <th>City</th>
              <th>Store Phone</th>
              <th>Total Items</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th>View</th>
            </thead>
            <tbody>
              {orderList.map((order, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      {" "}
                      <button
                        onClick={displayOrder}
                        value={order._id}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        {order._id}
                      </button>{" "}
                    </td>
                    <td>{order.dateTime}</td>
                    <td>JP Nagar</td>
                    <td>Bangalore</td>
                    <td>9999999999</td>
                    <td>{order.items}</td>
                    <td>{order.price + fixedCharge}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.status !== "cancelled" ? (
                        <button
                          onClick={warningOpen}
                          value={order._id}
                          // id="cancel-btn"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          Cancel Order
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      <img
                        onClick={displayOrder}
                        value={orderNum}
                        src="https://cdn2.iconfinder.com/data/icons/picol-vector/32/view-512.png"
                        height="15px"
                        width="15px"
                        className="view"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section id="copyright-pastorder">
        <Copyright />
      </section>
    </div>
  );
};
//JSX

// return (
// <div>
//   <div className="list-container">
//     <Header />
//     <div>
//       <section className="order-header">
//         <article>
//           <span>Order | {orderList.length} </span>
//         </article>
//         <article>
//           <button id="create-button">
//             <Link to="/createOrder">Create</Link>
//           </button>
//           <input type="search" />
//         </article>
//       </section>
//     </div>
//     <div className="tableFixHead">
// <table className="past-order-table">
//   <thead>
//     <th> Order Id</th>
//     <th>Order Date & Time</th>
//     <th>Store Location</th>
//     <th>City</th>
//     <th>Store Phone</th>
//     <th>Total Items</th>
//     <th>Price</th>
//     <th>Status</th>
//     <th></th>
//     <th>View</th>
//   </thead>
//   <tbody>
//     {orderList.map((order, idx) => {
//       return (
//         <tr key={idx}>
//           <td>
//             {" "}
//             <button onClick={displayOrder} value={order._id}>
//               {order._id}
//             </button>{" "}
//           </td>
//           <td>{order.dateTime}</td>
//           <td>JP Nagar</td>
//           <td>Bangalore</td>
//           <td>9999999999</td>
//           <td>{order.items}</td>
//           <td>{order.price + fixedCharge}</td>
//           <td>{order.status}</td>
//           <td>
//             {order.status !== "cancelled" ? (
//               <button
//                 onClick={cancel}
//                 value={order._id}
//                 id="cancel-btn"
//               >
//                 Cancel Order
//               </button>
//             ) : (
//               ""
//             )}
//           </td>
//           <td>
//             <img
//               src="https://cdn2.iconfinder.com/data/icons/picol-vector/32/view-512.png"
//               height="15px"
//               width="15px"
//               className="view"
//             />
//           </td>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>
//     </div>
//   </div>
//   <Copyright />
// </div>
//   )
// };
export default PastOrder;
