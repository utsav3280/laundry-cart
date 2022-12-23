import { TextField } from "@mui/material";
import React from "react";
import "./Style/style.css";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { useState } from "react";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register(registered) {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [add, setAdd] = useState("");
  const [st, setSt] = useState("");
  const [dis, setDis] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    district: "",
    state: "",
    pincode: "",
  });
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const nameRegex = /^[0-9a-zA-Z(\-) ]+$/;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    const val = e.target.value;
    const field = e.target.name;
    console.log(field);
    if (field === "name") {
      if (!nameRegex.test(val)) {
        setErr("Enter a valid name");
      } else if (val == "") {
        setErr("name required");
      } else if (val.length < 4) {
        setErr("very short");
      } else {
        setErr("");
      }
    } else if (field === "email") {
      if (val === "") {
        setEmail("email required");
      } else if (!regex.test(val)) {
        setEmail("not a valid email");
      } else {
        setEmail("");
      }
    } else if (field === "password") {
      if (val === "") {
        setPass("Password required");
      } else if (val.length < 6) {
        setPass("not a strong password");
      } else {
        setPass("");
      }
    } else if (field === "phone") {
      if (val === "") {
        setPhone("Phone number required");
      } else if (val.length !== 10) {
        setPhone("not a valid number");
      } else if (!phoneRegex.test(val)) {
        setPhone("valid number required");
      } else {
        setPhone("");
      }
    } else if (field === "state") {
      if (val === "") {
        setSt("state is required");
      } else if (val.charCodeAt() >= 32 && val.charCodeAt() <= 64) {
        setSt("enter valid state");
      } else {
        setSt("");
      }
    } else if (field === "district") {
      if (val === "") {
        setDis("district is required");
      } else if (val.charCodeAt() >= 32 && val.charCodeAt() <= 64) {
        setDis("enter valid district");
      } else {
        setDis("");
      }
    } else if (field === "street") {
      if (val === "") {
        setAdd("address is required");
      } else if (val.charCodeAt() >= 32 && val.charCodeAt() <= 64) {
        setAdd("enter valid adress");
      } else {
        setAdd("");
      }
    } else if (field === "pincode") {
      if (val === "") {
        setPin("pincode is required");
      } else if (val.charCodeAt() < 47 && val.charCodeAt() > 58) {
        setPin("valid number required");
      } else {
        setPin("");
      }
    }
  };
  const [view, setView] = useState(true);

  const createPost = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:5000/register", user)
      .then((res) => {
        console.log(res.data.message);
        navigate("/");
      })
      .catch((err) => console.log(err));

    // localStorage.setItem("name", user.name);
    // localStorage.setItem("email", user.email);
    // localStorage.setItem("password", user.password);
    // localStorage.setItem("phone", user.phone);
    // localStorage.setItem("address", user.address);
    // localStorage.setItem("state", user.state);
    // localStorage.setItem("district", user.district);
    // localStorage.setItem("pincode", user.pincode);
  };

  const locked = () => {
    setView(false);
  };
  const unlocked = () => {
    setView(true);
  };

  return (
    <div>
      <Header />
      <div id="mn-part">
        <div id="left_part">
          <h1 id="service">Laundry</h1>
          <h1>Service</h1>
          <p>
            door step wash & <span id="dry">dry clean service</span>
          </p>

          <p id="account_msg">already have an account ?</p>

          <button>
            <Link to={"/"}>Sign In</Link>
          </button>

          <div id="bdr"></div>
        </div>
        <div id="right_part">
          <h2>REGISTER</h2>
          <form onSubmit={createPost}>
            <div id="register-fields">
              <section>
                <TextField
                  error={err !== "" ? true : false}
                  onChange={handleChange}
                  // placeholder={err !== "" ? "err" : ""}
                  value={user.name}
                  type="text"
                  name="name"
                  sx={{
                    width: 300,
                  }}
                  label={err !== "" ? err : "Name"}
                  variant="standard"
                />{" "}
                {/* <p style={{ display: "block" }}>{err}</p> */}
                <TextField
                  error={email !== "" ? true : false}
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  sx={{
                    width: 300,
                  }}
                  label={email !== "" ? email : "Email"}
                  variant="standard"
                />
              </section>
              <section>
                <TextField
                  error={pass !== "" ? true : false}
                  onChange={handleChange}
                  value={user.password}
                  type={view ? "password" : "text"}
                  name="password"
                  sx={{
                    width: 275,
                  }}
                  label={pass !== "" ? pass : "Password"}
                  variant="standard"
                />
                {view ? (
                  <BsFillLockFill
                    style={{
                      fontSize: "20px",
                      marginTop: "25px",
                      marginRight: "120px",
                    }}
                    onClick={locked}
                  />
                ) : (
                  <BsFillUnlockFill
                    style={{
                      fontSize: "20px",
                      marginTop: "25px",
                      marginRight: "120px",
                    }}
                    onClick={unlocked}
                  />
                )}
                <TextField
                  error={phone !== "" ? true : false}
                  onChange={handleChange}
                  value={user.phone}
                  type="number"
                  name="phone"
                  sx={{
                    width: 300,
                  }}
                  label={phone !== "" ? phone : "Phone number"}
                  variant="standard"
                />
              </section>
              <section>
                <TextField
                  error={st !== "" ? true : false}
                  onChange={handleChange}
                  value={user.state}
                  type="text"
                  name="state"
                  sx={{
                    width: 300,
                  }}
                  // label="State"
                  variant="standard"
                  label={st !== "" ? st : "State"}
                />{" "}
                <TextField
                  error={dis !== "" ? true : false}
                  onChange={handleChange}
                  value={user.district}
                  type="text"
                  name="district"
                  sx={{
                    width: 300,
                  }}
                  label={dis !== "" ? dis : "District"}
                  variant="standard"
                />
              </section>
              <section>
                <TextField
                  error={add !== "" ? true : false}
                  onChange={handleChange}
                  value={user.street}
                  type="text"
                  name="street"
                  sx={{
                    width: 300,
                  }}
                  label={add !== "" ? add : "Address"}
                  variant="standard"
                />
                <TextField
                  error={pin !== "" ? true : false}
                  onChange={handleChange}
                  value={user.pincode}
                  type="text"
                  name="pincode"
                  sx={{
                    width: 300,
                  }}
                  label={pin !== "" ? pin : "Pincode"}
                  variant="standard"
                />
              </section>
              <p>
                <span>
                  <input type={"checkbox"} />
                </span>{" "}
                I agree to Terms & Conditions receiving marketing and promotion
                materials
              </p>
              <button onClick={registered}>Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
