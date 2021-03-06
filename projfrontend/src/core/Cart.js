import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProduct] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProduct(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load product</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <Fragment>
              <h3> No Products in the Cart</h3>
            </Fragment>
          )}
        </div>
        <div className="col-6">
          <Paymentb products={products} setReload={setReload} />
        </div>
        <div className="">
          {products.length === 0 ? (
            <Link to="/">
              <button className="btn btn-success">
                Add Products
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
