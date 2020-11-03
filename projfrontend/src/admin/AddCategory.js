import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to Create Category</h4>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex.Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
        <p className="text-black text-center">{JSON.stringify(name)}</p>
      </div>
    </form>
  );

  return (
    <Base
      title="Create A Category"
      description="Add a new Cateogry for new T-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {myCategoryForm()}
          {successMessage()}
          {warningMessage()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
