import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Hilarious Store">
      <div className="row">
        <div className="row m-auto offset-3">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {getProducts.length === 0 ? (
          <h3 className="text-center">
            Due to Heavy Demand No Product Are Available Now
            <br />
            Check Out Later.
          </h3>
        ) : (
          ""
        )}
      </div>
    </Base>
  );
}

export default Home;
