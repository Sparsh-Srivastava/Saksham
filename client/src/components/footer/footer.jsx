import React,{useEffect,useState} from "react";
import styles from "./footer.module.css";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedinIn,
  FaFacebookSquare,
  FaMapMarkedAlt
} from "react-icons/fa";
import jwt_decode from "jwt-decode";

function Footer() {
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
  return (
    <footer id="contactUs">
      <div className="row align-items-center">
        <div className={`col-md-4 ${styles.socialBtns}`}>
          <h1>SAKSHAM</h1>
          <h3>Reach Us</h3>
          <p>
            <a href="" className={`${styles.btn} ${styles.facebook}`}>
              <FaFacebookSquare className={styles.fa}/>
            </a>
            <a href="" className={`${styles.btn} ${styles.insta}`}>
              <FaInstagram className={styles.fa}/>
            </a>
            <a href="" className={`${styles.btn} ${styles.twitter}`}>
              <FaTwitter  className={styles.fa}/>
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <h3>Explore</h3>
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          {
              logIn ?
              <a href="/dashboard">Dashboard</a>
              :
              <a href="/login">Login</a>
          }
        </div>
        <div className={`col-md-4 ${styles.contactUs}`}>
          <h3>Contact Us</h3>
          <div className="row align-items-center">
            <div className="col-2">
              <FaEnvelope />
            </div>
            <div className="col-10">example@gmail.com</div>
          </div>
          <div className="row align-items-center">
            <div className="col-2">
              <FaPhoneAlt />
            </div>
            <div className="col-10">9876543210</div>
          </div>
          <div className="row align-items-center">
            <div className="col-2">
              <FaMapMarkedAlt />
            </div>
            <div className="col-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quis perspiciatis voluptas! Maxime, iste ad?</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;