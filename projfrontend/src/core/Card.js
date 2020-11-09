import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import Imagehelper from "./helper/Imagehelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,
  //function(f)(return f)
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A Photo from pexels";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "Default";

  const addTooCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addTooCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFrCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Remove From Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">A{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <Imagehelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFrCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
