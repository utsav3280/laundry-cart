import React, { useEffect, useState } from "react";
import Copyright from "../Copyright/Copyright";
import Sidebar from "./../Sidebar/Sidebar";
import { IoSearchOutline } from "react-icons/io5";
import { TextField } from "@mui/material";
import "./Style/style.css";
import { Link } from "react-router-dom";
import PastOrder from "../PastOrder/PastOrder";
import Axios from "axios";
import Dialog from "../Dialog/Dialog";
import Header from "../HeaderTwo/HeaderTwo";
function CreatePage() {
  return (
    <div>
      <Header />
      <div id="create-main">
        <section>
          <Sidebar />
        </section>
        <section>
          <div id="home-create">
            <div id="head-create">
              <section>
                <h3>Orders | 0</h3>
              </section>
              <section>
                <TextField
                  variant="standard"
                  type={"text"}
                  placeholder={"search"}
                  name="search"
                  label={<IoSearchOutline />}
                  sx={{ marginRight: "50px" }}
                />
              </section>
            </div>
            {/* <Dialog /> */}
            {/* {nav ? <button>create</button> : <PastOrder />} */}
            {/* <button>
            </button> */}
            <Link to={"/createOrder"}>Create</Link>
          </div>
        </section>
      </div>
      <Copyright />
    </div>
  );
}

export default CreatePage;
