import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../JS/userSlice/userSlice";
import "./Login.css"; // Assurez-vous d'importer le fichier CSS

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("token");
  let navigate = useNavigate();

  return (
    <div className="wrapper">
      <form onSubmit={(e) => e.preventDefault()} className="formsignin">
        <h2 className="formsigninheading">Please login</h2>
        <input
          type="text"
          className="formcontrol"
          name="username"
          placeholder="Email Address"
          required
          autoFocus
          onChange={(e) => setlogin({ ...login, email: e.target.value })}
        />
        <input
          type="password"
          className="formcontrol"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setlogin({ ...login, password: e.target.value })}
        />
        <label className="checkbox">
          <input
            type="checkbox"
            value="remember-me"
            id="rememberMe"
            name="rememberMe"
          />{" "}
          Remember me
        </label>
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={() => {
            dispatch(userLogin(login));
            setTimeout(() => {
              navigate("/list");
            }, 1000);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        >
          Login
        </button>
        You already have an account? <Link to="/register">Register now</Link>
      </form>
    </div>
  );
};

export default Login;