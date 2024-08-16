import React, { useState, useEffect } from "react";
import "./Login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: emailOrPhone,
        phone: emailOrPhone,
        password: password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userId", response.data.data._id);
        navigate("/profile");
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="yo-body">
      <div className="App">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email or Phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
              <FaUserAlt className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            {error && <div className="error"><p>{error}</p></div>}
          </form>
        </div>
      </div>
    </div>
  );
}
