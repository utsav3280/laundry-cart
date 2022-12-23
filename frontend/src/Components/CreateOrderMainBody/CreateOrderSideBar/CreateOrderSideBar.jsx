import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Style/CreateOrderSideBar.css"
const CreateOrderSideBar = () => {
    return(
        <section>
            <div>
                {
                   SidebarData.map((item, index)=>{
                    return(
                        <div className="icons" key={index}>
                            <NavLink to={item.path}>
                                <span>{item.icon}</span>
                            </NavLink>
                        </div>
                    )
                   }) 
                }
            </div>
        </section>
    )
}
export default CreateOrderSideBar;