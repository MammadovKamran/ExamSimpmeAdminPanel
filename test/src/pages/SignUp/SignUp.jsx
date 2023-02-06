import React, { useState, useEffect } from "react";
import style from "../SignIn/signIn.module.css";
import logo from "../../images/logo.gif";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const isDisabled = [email, password].every(Boolean);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (email && password && isDisabled) {
      const findedUser = data.find((user) => user.email === email && user.password === password);
      if (findedUser) {
        console.log("this user already exists");
      } else {
        postRequest();
        navigate("/signin");
      }
    }
    e.preventDefault();
  };
  const postRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    fetch("http://localhost:3000/users", requestOptions)
      .then((response) => response.json())
      .then((response2) => setData(response2));
  };
  return (
    <div className="container">
      <div className="signInContainer">
        <div className={style.signIn_top}>
          <img src={logo} className={style.logo} alt="AzərEnerji loqosu" />
          <h1>Sign Up</h1>
        </div>
        <div className={style.signIn_main}>
          <form className={style.signIn_form} onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={style.main_Button} type="submit" disabled={!isDisabled}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={style.signIn_bottom}>
          <Link to="/signin">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
