import React,{ useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";
import Footer from "../footer/footer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Navbar from "../navbar/navbar";
import IndividualNGO from "../individual NGO Component/individualNGO";
import { FaEdit } from "react-icons/fa";
import UpdateDetails from "./updateDetails/updateDetails";
function Dashboard(props) {
  const [ngo,setNGO] = useState();
  const MySwal = withReactContent(Swal);
  const viewNGO = (ngo) => {
    MySwal.fire({
      title: `Details of NGO`,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Close",
      cancelButtonColor: "#d33",
      customClass: styles.viewSwal,
      html: <UpdateDetails ngoDetails={ngo}/>,
    });
  };
  
  const getDetails = async ()=>{
    console.log('a');
    await axios
      .get(`/api/details/getNGO/${localStorage.getItem('userId')}`)
      .then((data)=>{
        console.log(data.data);
        setNGO(data.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect( () => {
    getDetails();
  }, []);
  return (
    <div>
      <Navbar />
      <div className={`row ${styles.dashboard} align-items-center`}>
        <div className="col-9">
          <h1>Your Dashboard</h1>
        </div>
        <div className="col-3">
          <button className=" ms-auto" onClick={() => viewNGO(ngo)}>
            <FaEdit size={28} />
          </button>
        </div>
        {
            ngo != undefined ? 
            <IndividualNGO ngoDetails={ngo}/>
            :
            ''
        }
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
