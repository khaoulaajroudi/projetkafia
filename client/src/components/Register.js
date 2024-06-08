import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../JS/userSlice/userSlice";
import "./Login.css"; // Importer le fichier CSS commun

const Register = () => {
  const [register, setregister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div className="wrapper">
      <form onSubmit={(e) => e.preventDefault()} className="formsignin">
        <h2 className="formsigninheading">Please register</h2>
        <input
          type="text"
          className="formcontrol"
          name="name"
          placeholder="Name"
          required
          autoFocus
          onChange={(e) => setregister({ ...register, name: e.target.value })}
        />
        <input
          type="text"
          className="formcontrol"
          name="lastname"
          placeholder="Last Name"
          required
          onChange={(e) => setregister({ ...register, lastname: e.target.value })}
        />
        <input
          type="text"
          className="formcontrol"
          name="email"
          placeholder="Email Address"
          required
          onChange={(e) => setregister({ ...register, email: e.target.value })}
        />
        <input
          type="password"
          className="formcontrol"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setregister({ ...register, password: e.target.value })}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={() => {
            dispatch(userRegister(register));
            setTimeout(() => {
              navigate("/list");
            }, 1000);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        >
          Register
        </button>
        <h5>
          You already have an account? <Link to="/login">Sign in</Link>
        </h5>
      </form>
    </div>
  );
};

export default Register;

