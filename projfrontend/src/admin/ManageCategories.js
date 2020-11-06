import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    categories: [],
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { categories } = values;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const successMessage = () => {
    if (success && categories.length != 0) {
      return (
        <h4 className="text-success text-center mt-3">
          Category Deleted Successfully
        </h4>
      );
    }
  };

  const warningMessage = () => {
    if (categories.length === 0)
      return (
        <h4 className="text-danger text-center mt-3">
          No More Categories Left To Manage, Please Create Some.
        </h4>
      );
    if (error) {
      return (
        <h4 className="text-danger text-center mt-3">
          Failed to Delete Category
        </h4>
      );
    }
  };

  const removeaCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setValues({ ...values, success: true });
        preload();
        setError("");
        setSuccess(true);
      }
    });
  };

  const goTo = () => (
    <div className="mt-5 ">
      <Link className="btn btn-md btn-success mb-3 mr-2" to="/admin/dashboard">
        Go Back
      </Link>
      <Link
        className="btn btn-md btn-success mb-3 mr-2"
        to="/admin/create/category"
      >
        Create Categories
      </Link>
    </div>
  );

  const categoryCards = () => (
    <Fragment className="container">
      <div className="row">
        {categories.map((category) => (
          <div className="card bg-dark col-3 border border-success m-auto offset-3">
            <h5 className="card-header mt-2 border-primary">{category.name}</h5>
            <div className="btn-group m-4">
              <Link
                className="btn btn-success btn-sm col-md-6"
                to={`/admin/category/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
              <button
                type="submit"
                onClick={() => removeaCategory(category._id)}
                className="btn btn-danger btn-sm col-md-6 m-2"
              >
                Delete Category
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );

  return (
    <Base title="Manage Categories" description="Manage your categories here">
      {categoryCards()}
      {successMessage()}
      {warningMessage()}
      {goTo()}
    </Base>
  );
};

export default ManageCategories;
