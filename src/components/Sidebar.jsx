import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.jpeg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Orders from "./NavItems/Orders";
import MainDash from "./NavItems/Dashboard/MainDash";
import Customers from "./NavItems/Customers";
import Analytics from "./NavItems/Analytics";
import ProductComponent from "./NavItems/Products/Products";

const Sidebar = ({ onItemClick }) => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }

  const handleItemClick = (item) => {
    // Call the parent component's onItemClick function
    onItemClick(item);
  };

  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Abaty<span> Express</span>
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                  setSelected(index);
                  handleItemClick(index == 0 ? <MainDash /> : index == 1 ? <Orders /> : index == 2 ? <Customers /> : index == 3 ? <ProductComponent /> : index == 4 ? <Analytics /> : <MainDash />)
                }}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div >
    </>
  );
};

export default Sidebar;
