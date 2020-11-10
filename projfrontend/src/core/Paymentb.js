import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderhelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;
console.log("USER TOKEN", token);

const Paymentb = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({
            ...info,
            success: response.success,
            loading: false,
          });
        })
        .catch((error) => {
          setInfo({ loading: false, sucess: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product, i) => {
      amount = amount + product.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your Bill is ${getAmount()}</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
