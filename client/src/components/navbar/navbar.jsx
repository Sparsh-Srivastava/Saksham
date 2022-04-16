import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import jwt_decode from "jwt-decode";

function Navbar(props) {
  const [logIn,setLoggedIn] = useState(false); 
  useEffect(()=>{
    var token = localStorage.getItem("authToken");
    console.log(token);
    if (token == null) {
      localStorage.removeItem("userId");
      setLoggedIn(false);
    } else {
      var uid = localStorage.getItem("userId");
      if (uid == null) {
        localStorage.removeItem("authToken");
        setLoggedIn(false);
      }
      const details = jwt_decode(localStorage.getItem("authToken"));
      var exp = details.exp * 1000;
      if (new Date(exp) < new Date() || details.id != uid) {
        localStorage.removeItem("userId");
        localStorage.removeItem("authToken");
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    }
  },[])
  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("authToken");
    window.location.href = "/dashboard";
  };
  return (
    <nav class={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}>
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          SAKSHAM
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/explore">
                Explore
              </a>
            </li>
            
            {
              !logIn ? 
              <li class="nav-item">
              <a
                class="nav-link active"
                href="/login"
                tabindex="-1"
                aria-disabled="true"
              >
                Login
              </a>
            </li>
            :
            <li class="nav-item">
              <a
                class="nav-link active"
                href="/dashboard"
                tabindex="-1"
                aria-disabled="true"
              >
                Dashboard
              </a>
            </li>
            }
            {
              logIn
              ?
              <li class="nav-item">
                <a
                  class="nav-link active"
                  tabindex="-1"
                  aria-disabled="true"
                  role="button"
                  onClick={logOut}
                >
                Logout
              </a>
            </li>
              :
              ''
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;