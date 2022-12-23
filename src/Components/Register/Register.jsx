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
  const [err, setErr] = useState();
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
  const handleChange = (e) => {
    if (e.target.name == 1) {
      setErr("no");
    }
    setUser({ ...user, [e.target.name]: e.target.value });
    // if (user.name == "a") {
    //   setErr("name is required");
    // }
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
                  onChange={handleChange}
                  value={user.name}
                  type="text"
                  name="name"
                  sx={{
                    width: 300,
                  }}
                  label="Name"
                  variant="standard"
                />{" "}
                <p>{err}</p>
                <TextField
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  sx={{
                    width: 300,
                  }}
                  label="Email"
                  variant="standard"
                />
              </section>
              <section>
                <TextField
                  onChange={handleChange}
                  value={user.password}
                  type={view ? "password" : "text"}
                  name="password"
                  sx={{
                    width: 275,
                  }}
                  label="Password"
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
                  onChange={handleChange}
                  value={user.phone}
                  type="number"
                  name="phone"
                  sx={{
                    width: 300,
                  }}
                  label="Phone"
                  variant="standard"
                />
              </section>
              <section>
                <TextField
                  onChange={handleChange}
                  value={user.state}
                  type="text"
                  name="state"
                  sx={{
                    width: 300,
                  }}
                  label="State"
                  variant="standard"
                />{" "}
                <TextField
                  onChange={handleChange}
                  value={user.district}
                  type="text"
                  name="district"
                  sx={{
                    width: 300,
                  }}
                  label="District"
                  variant="standard"
                />
              </section>
              <section>
                <TextField
                  onChange={handleChange}
                  value={user.street}
                  type="text"
                  name="street"
                  sx={{
                    width: 300,
                  }}
                  label="Address"
                  variant="standard"
                />
                <TextField
                  onChange={handleChange}
                  value={user.pincode}
                  type="text"
                  name="pincode"
                  sx={{
                    width: 300,
                  }}
                  label="Pincode"
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
