import React from "react";
import styles from './ngoCard.module.css';

function NgoCard({ ngo }) {
  return (
    <div className={`${styles.ngoCard} col-lg-3 col-md-4 `}>
      <div class="card" >
        <img src={ngo.logo} class="card-img-top" alt="..." />
        <div class={`card-body ${styles.donation}`}>
          <h4 class="card-title">{ngo.ngo_name}</h4>
          <h5>
            <p>Donation Type:&nbsp;</p>
            {ngo.donation_type.map((donation) => {
              return <span>{donation}</span>;
            })}
          </h5>
          <h5>
            <p>Branches:&nbsp;</p>
            {ngo.branches.map((branch, i) => {
              if(i <=3 ){
                return <span>{branch}</span>;
              }else if(i == 4){
                return "And More..."
              }
            })}
          </h5>
          <a href={`/ngo/${ngo._id}`} class="btn btn-primary">
            View More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NgoCard;
