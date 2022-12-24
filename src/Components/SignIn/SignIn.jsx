import React from "react";
import { TextField } from "@mui/material";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { useState } from "react";
import "./Style/style.css";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [view, setView] = useState(true);
  const [msg, setMsg] = useState("");
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const locked = () => {
    setView(false);
  };
  const unlocked = () => {
    setView(true);
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    console.log("hello");
    await Axios.post("https://laundry-cart-backend-z3lt.onrender.com/login", details)
      .then(async (res) => {
        if (res.data.status === "Failed") {
          setValidate(true);
        }
        console.log(res.data.message);
        if (res.data.message === "Login successfull") {
          if (res.data.message !== "Login successfull") {
            setMsg(res.data.message);
          }
          await Axios.get("https://laundry-cart-backend-z3lt.onrender.com/orders", {
            headers: {
              Authorization: res.data.token,
            },
          })
            .then((res) => {
              res.data.orders.length === 0
                ? navigate("/createHome")
                : navigate("/pastOrder");
            })
            .catch((err) => console.log(err));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div id="main-part">
        <div id="left_part">
          <h1 id="service">Laundry</h1>
          <h1>Service</h1>
          <p>
            door step wash & <span id="dry">dry clean service</span>
          </p>

          <p id="account_msg">don't have an account ?</p>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        {/* <div id="border"></div> */}
        <div id="right_part">
          <h2>SIGN IN</h2>
          <form onSubmit={login}>
            <div id="child">
              <TextField
                error={validate ? true : false}
                onChange={handleChange}
                value={details.username}
                type="text"
                name="username"
                style={{ color: "#5861AE", borderColor: "#5861AE" }}
                sx={{
                  width: 300,
                  backgroundColor: "transparent",
                }}
                label={validate ? "Incorrect credentials" : "Email / Name"}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                error={validate ? true : false}
                onChange={handleChange}
                value={details.password}
                type={view ? "password" : "text"}
                name="password"
                sx={{ width: 275 }}
                variant="standard"
                label={validate ? "Incorrect credentials" : "Password"}
              />

              {view ? (
                <BsFillLockFill
                  style={{
                    fontSize: "20px",
                    marginTop: "25px",
                    marginLeft: "10px",
                  }}
                  onClick={locked}
                />
              ) : (
                <BsFillUnlockFill
                  style={{
                    fontSize: "20px",
                    marginTop: "25px",
                    marginLeft: "10px",
                  }}
                  onClick={unlocked}
                />
              )}
            </div>
            <p id="password_msg">forget password?</p>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
