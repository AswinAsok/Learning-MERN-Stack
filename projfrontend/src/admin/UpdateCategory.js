import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getaCategory, updateaCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: "",
    formData: "",
    success: false,
    didRedirect: false,
  });

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const { name, error, formData, success, didRedirect } = values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          name: data.name,
          formData: new FormData(),
          didRedirect: false,
        });
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    var UpdatedName = JSON.stringify(object);
    updateaCategory(match.params.categoryId, user._id, token, UpdatedName).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            success: true,
            didRedirect: true,
          });
        }
      }
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-2 offset-3 col-md-6"
      style={{ display: success ? "" : "none" }}
    >
      <h4>Category Updated Successfully</h4>
    </div>
  );

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/categories"/>;
    }
  }
};

  const updateCategoryForm = () => (
    <form>
      <div className="form-group offset-3 col-md-6">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("name")}
          name="photo"
          value={name}
          autoFocus
          required
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <Base title="Update Categories" description="Update Your Category Name">
        {successMessage()}
        {updateCategoryForm()}
        {performRedirect()}
      </Base>
    </div>
  );
};

export default UpdateCategory
