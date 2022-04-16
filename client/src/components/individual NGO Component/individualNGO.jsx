import React, { useEffect } from "react";
import styles from "./individualNGO.module.css";
import { FaUserCircle } from "react-icons/fa";
import Gallery from "./gallery/gallery";
import axios from "axios";
function IndividualNGO(props) {
  const imgs = [
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
    "https://brainhubeu.github.io/react-carousel/static/mona-7a1ceae9bdb8c43272eb101c091c5408.jpg",
  ];
  const getDetails = async ()=>{
    await axios
      .get(`/api/details/getNGO/${localStorage.getItem('userId')}`)
      .then((data)=>{
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect( () => {
    getDetails();
  }, []);
  return (
    <div className={styles.individualNGO}>
      <div className="row align-items-center">
        <div className="col-md-3 text-center">
          <img
            src="https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/60ba0dd75e0b1_json_image_1622805975.webp"
            alt=""
          />
        </div>
        <div className="col-md-9">
          <h3>Prayas</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className={`ms-auto btn btn-primary ${styles.webBtn}`}>
            Visit Website
          </button>
        </div>
      </div>
      <div className={styles.wordFromFounder}>
        <h3>A Word from our Founder</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
      <div className={`${styles.testimonials} row`}>
        <h3>Testimonials</h3>
        <div className="col-md-6 row align-items-center">
          <div className="col-2">
            <FaUserCircle size={70} />
          </div>
          <div className="col-10">
            <h4>Mr Mukesh Ambani</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla id
              earum, quasi officia excepturi perferendis modi unde quam
              reprehenderit. Velit ea iure pariatur obcaecati quis!
            </p>
          </div>
        </div>
        <div className="col-md-6 row align-items-center">
          <div className="col-2">
            <FaUserCircle size={70} />
          </div>
          <div className="col-10">
            <h4>Mr Mukesh Ambani</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla id
              earum, quasi officia excepturi perferendis modi unde quam
              reprehenderit. Velit ea iure pariatur obcaecati quis!
            </p>
          </div>
        </div>
      </div>
      <Gallery imgs={imgs} />
      <div className={styles.donation}>
        <h3>Donation</h3>
        <h4>Donation Type</h4>
        <h4>Branches</h4>
        <h4>Funds</h4>
      </div>
      <div className={styles.contactUs}>
        <h3>Contact Details</h3>
        <h4>Donation Type</h4>
        <h4>Branches</h4>
        <h4>Funds</h4>
      </div>
    </div>
  );
}

export default IndividualNGO;
