import React from "react";
import Imagehelper from "./helper/Imagehelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const cardTitle = product ? product.name : "A Photo from pexels";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "Default";

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={() => {}}
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
          onClick={() => {}}
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
