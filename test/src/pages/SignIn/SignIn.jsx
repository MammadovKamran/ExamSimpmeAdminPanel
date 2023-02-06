import React, { useState, useEffect } from "react";
import style from "./signIn.module.css";
import logo from "../../images/logo.gif";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const isDisabled = [email, password].every(Boolean);
  const navigate = useNavigate();

  useEffect(() => {
    //! fetch data from server
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleSubmit = (e) => {
    if (email && password && isDisabled) {
      const user = data.find((user) => user.email === email && user.password === password);
      if (user && Number(user.status) === 1) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Success");
        navigate("/");
      } else {
        console.log("wrong data");
      }
      e.preventDefault();
    }
  };
  return (
    <div className="container">
      <div className="signInContainer">
        <div className={style.signIn_top}>
          <img src={logo} className={style.logo} alt="AzərEnerji loqosu" />
          <h1>Sign In</h1>
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
              Sign In
            </button>
          </form>
        </div>
        <div className={style.signIn_bottom}>
          <Link to="">Forgot password?</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
