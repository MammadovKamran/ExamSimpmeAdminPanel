import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import UserList from "./pages/Users/UserList";
import "./App.css";
import SideBar from "./components/sideBar/SideBar";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  var isLoggedIn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location.pathname);
    } else {
      navigate("/signin");
    }
  }, [navigate, isLoggedIn]);
 
  return (
    <div className="aaa">
      {location.pathname !== "/signin" && location.pathname !== "/signup" ? <SideBar /> : <div></div>}

      <Routes>
        <Route path="/" exact element={isLoggedIn ? Home : SignIn} element={<Home />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;