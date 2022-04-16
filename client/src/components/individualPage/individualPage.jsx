import React, { useState,useEffect } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import IndividualNGO from "../individual NGO Component/individualNGO";
import { useParams, useSearchParams } from "react-router-dom";
import styles from './individualPage.module.css';
import axios from "axios";
function IndividualPage({ history }) {
  const a = useParams();
  const [ngo, setNGO] = useState();
  const getDetails = async () => {
    console.log("a");
    await axios
      .get(`/api/details/getNGO/${a.id}`)
      .then((data) => {
        console.log(data.data);
        setNGO(data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className={styles.individualPage}>
      <Navbar />
      {ngo != undefined ? <IndividualNGO ngoDetails={ngo} /> : ""}
      <Footer />
    </div>
  );
}

export default IndividualPage;
