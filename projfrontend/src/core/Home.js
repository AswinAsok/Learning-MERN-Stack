import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";

function Home() {
  return (
    <Base title="Home Page" description="Welcome to the T-Shirt Store">
      <div className="row text-center">
        <div className="col-4">
          <Card />
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
      </div>
    </Base>
  );
}

export default Home;
