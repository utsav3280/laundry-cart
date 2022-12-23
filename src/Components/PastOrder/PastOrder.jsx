import { useState } from "react";
import { useEffect } from "react";
import "./Style/style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../HeaderTwo/HeaderTwo";
import Copyright from "./../Copyright/Copyright";
import Sidebar from "../Sidebar/Sidebar";
import { Button, Modal, Box } from "@mui/material";

const PastOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const fixedCharge = 60;

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
      })
      .catch((err) => console.log(err));
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
  return (
    <div id="past-order-component">
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
            <p>Alert</p>
            <button onClick={warningClose}>close</button>
          </div>
          <p style={{ marginBottom: "0" }}>Are you sure want to cancel</p>
          <p style={{ marginTop: "0" }}>the order No : {orderNum} </p>
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
                      <button onClick={displayOrder} value={order._id}>
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
                          id="cancel-btn"
                        >
                          Cancel Order
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      <img
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
      <section>
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
