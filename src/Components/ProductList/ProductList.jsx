// import React, { useEffect } from "react";
// import Data from "./Data";
// import { useState } from "react";
// import axios from "axios";
// import "./Style/style.css";
// import { useNavigate } from "react-router-dom";

// import Dialog from "@mui/material/Dialog";
// import Draggable from "react-draggable";
// import Paper from "@mui/material/Paper";
// import {
//   Button,
//   DialogTitle,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
// } from "@mui/material";
// import { VscChromeClose } from "react-icons/vsc";

// function PaperComponent(props) {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// }

// function ProductList() {
//   const [info] = useState(Data);
//   const [update, setUpdate] = useState(0);
//   const [ok, setOk] = useState([]);
//   const navigate = useNavigate();
//   const handleChange = (val, id) => {
//     [...info][id].quantity = val;
//     setUpdate(val);
//   };

//   const washType = (opt, id) => {
//     if (info[id].quantity !== "") {
//       if (![...info][id].washOption.includes(opt)) {
//         [...info][id].washOption.push(opt);
//       } else {
//         let arr = [];
//         for (let i = 0; i < [...info][id].washOption.length; i++) {
//           if ([...info][id].washOption[i] === opt) continue;
//           arr.push([...info][id].washOption[i]);
//         }
//         [...info][id].washOption = arr;
//       }
//       let sum = 0;
//       for (let i = 0; i < [...info][id].washOption.length; i++) {
//         console.log([...info][id].washOption[i]);
//         switch ([...info][id].washOption[i]) {
//           case "wash": {
//             sum += 20;
//             break;
//           }
//           case "press": {
//             sum += 15;
//             break;
//           }
//           case "fold": {
//             sum += 10;
//             break;
//           }
//           case "pack": {
//             sum += 25;
//             break;
//           }
//         }
//       }
//       [...info][id].serviceSum = sum;
//       [...info][id].totalPrice =
//         [...info][id].serviceSum * [...info][id].quantity;
//       setUpdate(sum);
//     }
//     console.log(info);
//   };

//   const reset = (id) => {
//     [...info][id].quantity = "";
//     [...info][id].washOption = [];
//     [...info][id].serviceSum = "-";
//     [...info][id].totalPrice = 0;
//     setUpdate(1);
//     console.log(info);
//   };
//   let reqData = [];

//   const sendData = async () => {
//     // setOpen(true);
//     console.log("check");

//     if (reqData.length !== 0) {
//       await axios.post("http://localhost:5000/orders/create", reqData, {
//         headers: {
//           authorization: localStorage.getItem("token"),
//         },
//       });
//       navigate("/pastOrder");
//     }
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//     for (let i = 0; i < info.length; i++) {
//       if (info[i].quantity !== "") reqData.push(info[i]);
//     }
//     console.log(reqData);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const arr = [1, 2, 3, 4, 5];
//   return (
//     <div>
//       <Dialog
//         PaperProps={{
//           sx: {
//             position: "absolute",
//             top: 0,
//             bottom: 0,
//             left: "45%",
//             m: 0,
//             maxWidth: 900,
//             maxHeight: 713,
//           },
//         }}
//         open={open}
//         onClose={handleClose}
//         PaperComponent={PaperComponent}
//         aria-labelledby="draggable-dialog-title"
//       >
//         <div>
//           <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
//             <h3>Summary</h3>
//             <h3 onClick={handleClose}>
//               <VscChromeClose style={{ cursor: "pointer" }} />
//             </h3>
//           </DialogTitle>
//           <div id="dialog-store-info">
//             <div style={{ marginLeft: "30px" }}>
//               <h4>Store location :</h4>
//               <p>Jp nagar</p>
//             </div>
//             <div>
//               <h4>Store address :</h4>
//               <p>Near phone booth, 10th street</p>
//             </div>
//             <div>
//               <h4>Phone :</h4>
//               <p>+91 9180507211</p>
//             </div>
//           </div>
//           <div id="order-details-confirm">
//             {/* {reqData.map((ele, id) => {
//               return (
//                 <div key={id}>
//                   <h3>{ele.product}</h3>
//                 </div>
//               );
//             })} */}
//             {arr.map((ele, id) => {
//               return <div>{ele}</div>;
//             })}
//           </div>
//           <div id="address-confirm"></div>
//           <DialogActions
//             style={{
//               backgroundColor: "#F4F4F4",
//               height: "40px",
//               marginRight: "20px",
//             }}
//           >
//             <Button variant="contained" onClick={sendData}>
//               Confirm
//             </Button>
//           </DialogActions>
//         </div>
//       </Dialog>
//       <Dialog>
//         <DialogTitle>order placed successfully</DialogTitle>
//       </Dialog>
//       <table>
//         <div style={{ backgroundColor: "black" }}>
//           <thead>
//             <tr>
//               {/* {" "} */}
//               <th style={{ width: "200px" }}>produt type</th>
//               <th style={{ width: "100px" }}>quantity</th>
//               <th style={{ width: "400px" }}>wash type</th>
//               <th style={{ width: "175px" }}>price</th>
//               <th style={{ width: "180px" }}>{""}</th>
//             </tr>
//           </thead>
//         </div>
//         <div style={{ backgroundColor: "white" }}>
//           <tbody>
//             {info.map((ele, id) => {
//               return (
//                 <tr key={id}>
//                   <td style={{ width: "200px" }}>
//                     {/* <img src={ele.image} alt={ele.product} /> */}
//                     {ele.product}
//                   </td>
//                   <td style={{ width: "100px" }}>
//                     <input
//                       type={"number"}
//                       style={{ width: "30px" }}
//                       placeholder="0"
//                       value={info[id].quantity}
//                       onChange={(e) => handleChange(e.target.value, id)}
//                     />
//                   </td>
//                   <td id="wash-types" style={{ width: "400px" }}>
//                     <button onClick={() => washType("wash", id)}>wash</button>

//                     <button onClick={() => washType("press", id)}>press</button>
//                     <button onClick={() => washType("fold", id)}>fold</button>
//                     <button onClick={() => washType("pack", id)}>pack</button>
//                   </td>
//                   {info[id].quantity && info[id].washOption.length !== 0 ? (
//                     <td
//                       style={{ width: "175px" }}
//                     >{`${info[id].quantity} x ${info[id].serviceSum} = ${info[id].totalPrice}`}</td>
//                   ) : (
//                     <td style={{ width: "175px" }}>-</td>
//                   )}
//                   {info[id].quantity ? (
//                     <td style={{ width: "170px" }}>
//                       <button onClick={() => reset(id)}>Reset</button>
//                     </td>
//                   ) : (
//                     <td style={{ width: "170px" }}></td>
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </div>
//       </table>
//       <button onClick={handleClickOpen}>Proceed</button>
//     </div>
//   );
// }

// export default ProductList;

import React, { useEffect } from "react";
import Data from "./Data";
import { useState } from "react";
import axios from "axios";
import "./Style/style.css";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { VscChromeClose } from "react-icons/vsc";

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
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleChange = (val, id) => {
    [...info][id].quantity = val;
    setUpdate(val);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  const washType = (opt, id) => {
    if (info[id].quantity !== "") {
      if (![...info][id].washOption.includes(opt)) {
        [...info][id].washOption.push(opt);
      } else {
        let arr = [];
        for (let i = 0; i < [...info][id].washOption.length; i++) {
          if ([...info][id].washOption[i] === opt) continue;
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
    setUpdate(1);
    console.log(info);
  };

  const sendData = async () => {
    // setOpen(true);
    console.log("check");
    // for (let i = 0; i < info.length; i++) {
    //     if (info[i].quantity !== "") reqData.push(info[i]);
    // }
    if (data.length !== 0) {
      await axios.post("http://localhost:5000/orders/create", data, {
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
    setData(reqData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
            {/* {data.length !== 0
              ? data.OrderDetails.map((ele, id) => {
                  return <div key={id}>{ele.product}</div>;
                })
              : null} */}
          </div>
          <div id="address-confirm"></div>
          <DialogActions
            style={{
              backgroundColor: "#F4F4F4",
              height: "40px",
              marginRight: "20px",
            }}
          >
            <Button variant="contained" onClick={sendData}>
              Confirm
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog>
        <DialogTitle>order placed successfully</DialogTitle>
      </Dialog>
      <table>
        <div style={{ backgroundColor: "black" }}>
          <thead>
            <tr>
              {/* {" "} */}
              <th style={{ width: "200px" }}>produt type</th>
              <th style={{ width: "100px" }}>quantity</th>
              <th style={{ width: "400px" }}>wash type</th>
              <th style={{ width: "175px" }}>price</th>
              <th style={{ width: "180px" }}>{""}</th>
            </tr>
          </thead>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <tbody>
            {info.map((ele, id) => {
              return (
                <tr key={id}>
                  <td style={{ width: "200px" }}>
                    {/* <img src={ele.image} alt={ele.product} /> */}
                    {ele.product}
                  </td>
                  <td style={{ width: "100px" }}>
                    <input
                      type={"number"}
                      style={{ width: "30px" }}
                      placeholder="0"
                      value={info[id].quantity}
                      onChange={(e) => handleChange(e.target.value, id)}
                    />
                  </td>
                  <td id="wash-types" style={{ width: "400px" }}>
                    <button onClick={() => washType("wash", id)}>wash</button>

                    <button onClick={() => washType("press", id)}>press</button>
                    <button onClick={() => washType("fold", id)}>fold</button>
                    <button onClick={() => washType("pack", id)}>pack</button>
                  </td>
                  {info[id].quantity && info[id].washOption.length !== 0 ? (
                    <td
                      style={{ width: "175px" }}
                    >{`${info[id].quantity} x ${info[id].serviceSum} = ${info[id].totalPrice}`}</td>
                  ) : (
                    <td style={{ width: "175px" }}>-</td>
                  )}
                  {info[id].quantity ? (
                    <td style={{ width: "170px" }}>
                      <button onClick={() => reset(id)}>Reset</button>
                    </td>
                  ) : (
                    <td style={{ width: "170px" }}></td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </div>
      </table>
      <button onClick={handleClickOpen}>Proceed</button>
    </div>
  );
}

export default ProductList;
