import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import "./Login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(""); // Added state to manage the error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Wrong Username & Password"); // Set the error message
    }
  }

  return (
    <div className="login">
      <span className="logintitle">Login</span>
      <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="logininput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="logininput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginbutton" type="submit" disabled={isFetching}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}
      </form>
      <button className="loginregisterbutton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
