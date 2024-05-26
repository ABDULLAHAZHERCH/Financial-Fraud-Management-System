import React from "react";
import image from "../Resources/img.jpg";

import "../Styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="new">
        <h2>We Detect Fraud in your Transaction Data</h2>
      </div>
      <div className="picture">
        <img src={image} alt="Description of the image" />
      </div>
    </div>
  );
};

export default Home;

