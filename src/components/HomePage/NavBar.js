import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import Post from "../Profile/Post"; 
import "./navBar.css";
import PostDisplay from "../Postsdisplay/PostDisplay";

export default function NavBar() {
  const [home, setHome] = useState(true);
  const [profile, setProfile] = useState(false);
  const [post, setPost] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate('/');
  };

  return (
    <div className="nav-style">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between w-100">
            <span className="navbar-brand">GetSocial</span>
            <ul className="navbar-nav d-flex flex-row ms-auto">
              <li className="nav-item">
                <span
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => {
                    setHome(true);
                    setProfile(false);
                    setPost(false); 
                    console.log("button clicked")
                  }}
                >
                  Home
                </span>
              </li>
              <li className="nav-item">
                <span
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => {
                    setProfile(true);
                    setHome(false);
                    setPost(false); 
                  }}
                >
                  Profile
                </span>
              </li>
              <li className="nav-item">
                <span
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={() => {
                    setPost(true); 
                    setHome(false);
                    setProfile(false);
                  }}
                >
                  Post
                </span>
              </li>

             
              <li className="nav-item">
                <span
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {profile && <Profile />}
        {post && <Post />} 
        {home && <PostDisplay/> }

      </div>
    </div>
  );
}
