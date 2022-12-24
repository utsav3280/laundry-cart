import Copyright from "../Copyright/Copyright";
import Sidebar from "./../Sidebar/Sidebar";
import "./Style/style.css";
import { Link } from "react-router-dom";
import Header from "../HeaderTwo/HeaderTwo";
import { IoSearchOutline } from "react-icons/io5";
import { TextField } from "@mui/material";

function CreatePage() {
  return (
    <div>
      <Header />
      <div id="create-main">
        <section style={{width: "50px"}}>
          <Sidebar />
        </section>
        <section style={{height: "100vh"}}>
          <div id="home-create">
            <div id="head-create">
              <section>
                <h3 style={{marginTop: "50px"}}>Orders | 0</h3>
              </section>
              <section id="search-bar">
                <TextField
                  variant="standard"
                  type={"text"}
                  placeholder={"search"}
                  name="search"
                  label={<IoSearchOutline />}
                  sx={{ marginRight: "50px", marginTop: "50px"}}
                />
              </section>
            </div>
            <p className="no-orders-text">No Orders Available</p>
            <Link to={"/createOrder"}><button id="create-btn">Create</button></Link>
          </div>
        </section>
      </div>
      <Copyright />
    </div>
  );
}

export default CreatePage;
