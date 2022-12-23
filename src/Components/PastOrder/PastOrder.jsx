import { useState } from "react";
import { useEffect } from "react";
import "./Style/style.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

  return (
    <div className="list-container">
      <div>
        <section className="order-header">
          <article>
            <span>Order | {orderList.length} </span>
          </article>
          <article>
            <button id="create-button">
              <Link to="/createOrder">Create</Link>
            </button>
            <input type="search" />
          </article>
        </section>
      </div>
      <div>
        <table className="past-order-table">
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
                        onClick={cancel}
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
    </div>
  );
};
export default PastOrder;
