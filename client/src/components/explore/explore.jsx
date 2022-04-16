import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import NgoCard from "../ngoCard/ngoCard";
import styles from './explore.module.css';

function Explore(props) {
  const [ngos, setNGOS] = useState();
  const getNGOS = async () => {
    await axios
      .get("/api/details/sendNGOs")
      .then((data) => setNGOS(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
      getNGOS();
  })
  return (
    <div className={styles.explore}>
      <Navbar />
      <div className="row align-items-center">
      {
          ngos != undefined ?
          ngos.map(ngo=>{
            return <NgoCard ngo={ngo}/>
          })
          : ''
      }
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
