import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.gif";
import style from "../../pages/SignIn/signIn.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  let [storage, setStorage] = useState();
  const handleLogOut = (e) => {
    localStorage.removeItem("user");
    navigate("/signin");
    e.preventDefault();
  };

  useEffect(() => {
    //! get data from local storage
    const storageInfo = JSON.parse(localStorage.getItem("user"));
    setStorage(storageInfo.role);
  }, []);
  return storage === "admin" ? (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar>
        <img src={logo} className={style.logo} alt="AzərEnerji loqosu" style={{ marginLeft: "20px" }} />
        <Menu>
          <MenuItem active="true">
            <Link to="/">Home</Link>
          </MenuItem>

          <MenuItem>
            <Link to="/userList">Users</Link>
          </MenuItem>

          <MenuItem>
            <Link onClick={(e) => handleLogOut()} to="/signin">
              Log Out
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  ) : (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar>
        <img src={logo} className={style.logo} alt="AzərEnerji loqosu" style={{ marginLeft: "20px" }} />
        <Menu>
          <MenuItem active="true">
            <Link to="/">Home</Link>
          </MenuItem>

          <MenuItem>
            <Link onClick={(e) => handleLogOut()} to="/signin">
              Log Out
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
{
  /* <button className={style.main_Button} type="submit">
  Log out
</button>; */
}
export default SideBar;
