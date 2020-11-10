import React, { Fragment } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userDashboard = () => {
    return (
      <Fragment>
        <div className="card mb-4">
          <h4 className="card-header bg-dark text-white">User Information</h4>
          <ul className="list-group">
            <li className="list-group-item text-dark">
              <span className="badge badge-success mr-2 ">Name : </span> {name}
            </li>
            <li className="list-group-item text-dark">
              <span className="badge badge-success mr-2">Email : </span> {email}
            </li>
            <li className="list-group-item text-dark">
              <span className="badge badge-info">User Area</span>
            </li>
          </ul>
        </div>
        <Link to="/">
          <button className="btn btn-info">Buy Some Products</button>
        </Link>
      </Fragment>
    );
  };

  return (
    <Base title="User Dashboard">
      <div className="row">
        <div className="col-6 offset-3">{userDashboard()}</div>
      </div>
    </Base>
  );
};

export default UserDashboard;
