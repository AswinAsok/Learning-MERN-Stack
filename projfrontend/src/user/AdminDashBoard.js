import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item bg-dark">
            <Link to="/admin/create/category" className="nav-list text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/categories" className="nav-list text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/create/product" className="nav-list text-success">
              Create Products
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/products" className="nav-list text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item bg-dark">
            <Link to="/admin/orders" className="nav-list text-success">
              Create Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item ">
            <span className="badge badge-success mr-2">Name : </span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email : </span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Area"
      description="Manage all of your products here."
      className="container bg-success p-1"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
