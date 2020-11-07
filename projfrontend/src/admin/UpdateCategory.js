import React, { useEffect, useState } from "react";
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
  });

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const { name, error, formData, success } = values;

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
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            success: true,
          });
        }
      }
    );
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
        {updateCategoryForm()}
        <p className="text-white text-center">{`Match : ${match.params.categoryId}, Success: ${success}, Name : ${name}, Error : ${error}`}</p>
      </Base>
    </div>
  );
};

export default UpdateCategory;
