import React from "react";
import { TextField } from "@mui/material";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { useState } from "react";
import "./Style/style.css";
import Axios from "axios";
function Login() {
  const [view, setView] = useState(true);
  const [msg, setMsg] = useState("");
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

  // const username = (e) => {
  //   console.log(e);
  //   if (e === " ") {
  //     setMsg("put");
  //   }
  // };

  const login = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:5000/login", details)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  };

  return (
    <div id="right_part">
      <h2>SIGN IN</h2>
      <form onSubmit={login}>
        <div id="child">
          <TextField
            onChange={handleChange}
            value={details.username}
            type="text"
            name="username"
            style={{ color: "#5861AE", borderColor: "#5861AE" }}
            sx={{
              width: 300,
              backgroundColor: "transparent",
            }}
            label="Mobile / Email"
            variant="standard"
          />
          <p>{msg}</p>
        </div>
        <div>
          <TextField
            // error={true}
            onChange={handleChange}
            value={details.password}
            type={view ? "password" : "text"}
            name="password"
            sx={{ width: 275 }}
            label="Password"
            variant="standard"
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
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Login;
