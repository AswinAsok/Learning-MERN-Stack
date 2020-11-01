import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({ 
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const { name, email, password, error, success } = values; //Desturcturing the values for the future use.

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    }); /*Setting the state varible whenever a change has been made to the form fields */
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }) //Sending values from the form to the auth helper to store in the Db
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false }); //If in case some error was encountered while saving in the Db.
        } else {
          setValues({
            //If the data was saved successfully saved into the Db then clearing the success form.
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in Signup form"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{
              display: success ? "" : "none",
            }} /*If the user was saved in the Db the success would be true
            as in setValues and if so display the message else the how div would be hidden*/
          >
            New Account was created Successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{
              display: error ? "" : "none",
            }} /* If there is error displaying the error else hiding it*/
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
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
    <Base title="Signup Page" description="A page for user to sign up">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;


//onSubmit = Executes the function when the page is loading like default constructor.

/*onSubmit() = Execute the function only when the the action when is tied to it is executed.
If the onSubmit was given as onSubmit() it would automatically run at the loading of the page
and would causes many error*/
