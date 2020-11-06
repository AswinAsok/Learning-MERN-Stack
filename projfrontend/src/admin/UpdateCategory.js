import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getaCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    formData: "",
  });

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const { name, error, formData } = values;

  const preload = (categoryId) => {
    getaCategory(categoryId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  const updateCategoryForm = () => (
    <form>
      <div className="form-group offset-3 col-md-6">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          //   onChange={handleChange}
            value={name}
            autoFocus
            required
          //   placeholder="For Ex.Summer"
        />
        <button className="btn btn-outline-info">Update Category</button>
      </div>
    </form>
  );

  return (
    <div>
      <Base title="Update Categories" description="Update Your Category Name">
        {updateCategoryForm()}
      </Base>
    </div>
  );
};

export default UpdateCategory;
