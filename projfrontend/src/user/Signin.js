import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email:
      "aswinasok1245@gmail.com" /*In the form the value attributes takes the values from here due to the due to the redirect*/,
    password: "9074750272",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values; //Destructing the values.

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    /*The preventDefault() method cancels the event if it is cancelable,
     meaning that the default action that belongs to the event will not occur.
     Here if I am right the action is to redirect*/
    setValues({ ...values, error: false, loading: true }); //If everything goes well sets values and sets error false
    signin({ email, password }) //This is a function from the auth routes to store to db.
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true, loading: false });
        } else {
          authenticate(data, () => { 
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin Request Falied"));
  };

  const performRedirect = () => {
    //TODO : DO a redirection here.

    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"/>;
      } else {
        return <Redirect to="/user/dashboard"/>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
            <Link to="/signup">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="bt btn-success btn-block">
              Sumbit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="A page for user to sign in">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
