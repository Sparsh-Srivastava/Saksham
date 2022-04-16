import React from "react";
import styles from "./gallery.module.css";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
function Gallery({ imgs }) {
  return (
    <div className={styles.gallery}>
      <h3>Gallery</h3>
      <div>
        <Carousel
          plugins={[
            "infinite",
            "arrows",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 3,
              },
            },
          ]}
        >
          {imgs.map((img) => {
            return <img src={img} alt="" />;
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Gallery;
