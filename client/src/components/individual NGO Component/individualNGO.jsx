import React, { useEffect, useState } from "react";
import styles from "./individualNGO.module.css";
import { FaUserCircle } from "react-icons/fa";
import Gallery from "./gallery/gallery";
import {IoCallSharp,IoLogoInstagram,IoLogoLinkedin} from 'react-icons/io5';
import {MdOutlineEmail} from 'react-icons/md';
function IndividualNGO({ ngoDetails }) {
  console.log(ngoDetails);
  const [ngo, setNGO] = useState(ngoDetails);
  return ngo != undefined ? (
    <div className={styles.individualNGO}>
      <div className="row align-items-center">
        <div className="col-md-3 text-center">
          <img src={ngo.logo} alt="" />
        </div>
        <div className="col-md-9">
          <h3>{ngo.ngo_name}</h3>
          <p>{ngo.ngo_description}</p>
          <button className={`ms-auto btn btn-primary ${styles.webBtn}`} onClick={()=>window.location.href = ngo.website_link}>
            Visit Website
          </button>
        </div>
      </div>
      <div className={styles.wordFromFounder}>
        <h3>A Word from our Founder</h3>
        <p>{ngo.ceo_statement}</p>
      </div>
      <Gallery imgs={ngo.gallery} />
      <div className={styles.donation}>
        <h3>Donation Details:</h3>
        <h5>
          Donation Type:&nbsp;
          {ngo.donation_type.map((donation) => {
            return <span>{donation}</span>;
          })}
        </h5>
        <h5>
          Branches:&nbsp;
          {ngo.branches.map((branch) => {
            return <span>{branch}</span>;
          })}
        </h5>
        <h5>
          Funds:&nbsp; <span>{ngo.funds}</span>
        </h5>
      </div>
      <div className={styles.contactUs}>
        <h3>Contact Details</h3>
        <div className="row align-items-center">
          <div className="col-5">
            <h5><span><IoCallSharp size={28}/>&nbsp;</span>&nbsp;{ngo.phone}</h5>
          </div>
          <div className="col-5">
            <h5><span><MdOutlineEmail size={28}/>&nbsp;</span>&nbsp;{ngo.email}</h5>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-5">
            <h5><span><IoLogoInstagram size={28}/>&nbsp;</span>&nbsp;{ngo.instagram}</h5>
          </div>
          <div className="col-5">
            <h5><span><IoLogoLinkedin size={28}/>&nbsp;</span>&nbsp;{ngo.linkdin}</h5>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default IndividualNGO;
