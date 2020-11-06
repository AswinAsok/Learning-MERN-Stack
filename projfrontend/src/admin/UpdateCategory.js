import React from "react";
import Base from "../core/Base";

function UpdateCategory() {
  const updateCategoryForm = () => (
    <form>
      <div className="form-group offset-3 col-md-6">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          //   onChange={handleChange}
          //   value={name}
          //   autoFocus
          //   required
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
}

export default UpdateCategory;
