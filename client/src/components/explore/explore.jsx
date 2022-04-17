import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import NgoCard from "../ngoCard/ngoCard";
import styles from "./explore.module.css";

function Explore(props) {
  const [searchItem, setSearch] = useState([]);
  const [ngos, setNGOS] = useState();
  const getNGOS = async () => {
    await axios
      .get("/api/details/sendNGOs")
      .then((data) => {
        setNGOS(data.data)
        setSearch(data.data)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNGOS();
  },[]);
  const search = (data) => {
    if (data == "") {
      setSearch([]);
    }
    const searchItems = [];
    for (let i = 0; i < ngos.length; i++) {
      console.log(data, ngos[i].ngo_name);
      if (
        ngos[i].ngo_name.toLowerCase().includes(data.toLowerCase()) ||
        ngos[i].branches.includes(data.toLowerCase())
      ) {
        searchItems.push(ngos[i]);
      }
    }
    setSearch(searchItems);
    console.log(searchItems);
  };
  const searchDonationType = (data) => {
    if (data === "null") {
      setSearch(ngos);
      return
    }
    const searchItems = [];
    for (let i = 0; i < ngos.length; i++) {
      console.log(data, ngos[i].ngo_name);
      if (
        ngos[i].donation_type.includes(data.toLowerCase())
      ) {
        searchItems.push(ngos[i]);
      }
    }
    setSearch(searchItems);
    console.log(searchItems);
  };
  const applyFilter = (value) => {
    if (value == "AZ") {
      const currItems = [];
      currItems.push(...searchItem);
      currItems.sort((a, b) =>
        a.ngo_name > b.ngo_name ? 1 : b.ngo_name > a.ngo_name ? -1 : 0
      );
      setSearch(currItems);
    } else if (value == "ZA") {
      const currItems = [];
      currItems.push(...searchItem);
      currItems.sort((a, b) =>
        a.ngo_name < b.ngo_name ? 1 : b.ngo_name < a.ngo_name ? -1 : 0
      );
      setSearch(currItems);
    }
  };
  return (
    <div className={styles.explore}>
      <Navbar />
      <div className="row align-items-center">
        <div className="col-4">
          Sort By:
          <select
            name=""
            id="sort"
            onChange={(e) => {
              applyFilter(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="">--Name--</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
          <select name="" id="" onChange={(e)=>searchDonationType(e.target.value)}>
            <option value="null">--Donation Type--</option>
            <option value="education">Education</option>
            <option value="money">Money</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
          </select>
        </div>
        <div className="col-8">
          <input
            type="text"
            placeholder="Enter search Query or Location"
            id="searchField"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
      <div className="row ">
        <h1>Results</h1>
        {searchItem.length > 0 ? (
          searchItem.map((ngo, index) => {
            return <NgoCard ngo={ngo} />;
          })
        ) : (
          <h3>No items found</h3>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
