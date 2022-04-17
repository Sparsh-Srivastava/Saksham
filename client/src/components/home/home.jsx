import React from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import img from "../../assets/a.svg";
import styles from "./home.module.css";
function Home(props) {
  return (
    <div>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.header}>
          <img src={img} alt="" />
          <h1>
            SAKSHAM. We strive to connect people who want to make a change to
            those who are already making changes
          </h1>
        </div>
        <div className={styles.mission}>
          <h3>Our Mission</h3>
          <p>
            We are committed to excellence, in spirit and action. We believe
            everything that we do and everything we think can always get better.
            We see all of our activities in terms of our higher purpose and
            ideals, which drives our quest for excellence always.
          </p>
        </div>
        <div className={styles.aboutUs}>
          <h3>About Us</h3>
          <p>
            The SAKSHAM is a platform that provides space for interface between
            NGOs and Departments / Government Bodies, to start with. The
            NGO-DARPAN started out as an initiative to create and promote a
            healthy partnership between NGOs and the Government of India. The
            Portal is managed at present by our team.
          </p>
        </div>
        <div className={styles.work}>
          <h3>Our Work</h3>
          <p>
            We believe the success and reputation of the company is paramount.
            Having an ownership mind-set is fundamental to our existence. It
            creates a sense of inspiration and purpose. It enables
            accountability and accomplishment. It ensures our strong commitment
            to the highest standards of safety and environment.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
