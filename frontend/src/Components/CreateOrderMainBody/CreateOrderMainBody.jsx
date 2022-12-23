import React from "react";
import CreateOrderTable from "../Create/createOrderTable";
import CreateOrderSideBar from "./CreateOrderSideBar/CreateOrderSideBar";
import './Style/CreateOrderMainBody.css'
import { Routes, Route } from "react-router-dom";
const CreateOrderMainBody = () =>{
    return(
        <div className="mainWrapper">
            <div className="sideNav">
                <CreateOrderSideBar/>
            </div>
            <div className = "content">
            <Routes>
                <Route path = "/createorder" element={<CreateOrderTable/>}/>                
            </Routes>
            </div>
        </div>
    )

}
export default CreateOrderMainBody;