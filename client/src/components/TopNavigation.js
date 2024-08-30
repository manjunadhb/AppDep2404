import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    return store.loginReducer;
  });

  useEffect(() => {
    if (storeObj.loginDetails.email) {
    } else {
      navigate("/");
    }
  }, []);

  let highlightNavLink = (obj) => {
    if (obj.isActive == true) {
      return { backgroundColor: "dodgerblue", color: "white" };
    }
  };

  return (
    <nav>
      <NavLink
        style={(obj) => {
          return highlightNavLink(obj);
        }}
        to="/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/tasks"
        style={(obj) => {
          return highlightNavLink(obj);
        }}
      >
        Tasks
      </NavLink>
      <NavLink
        to="/editProfile"
        style={(obj) => {
          return highlightNavLink(obj);
        }}
      >
        Edit Profile
      </NavLink>
      <NavLink
        to="/leaves"
        style={(obj) => {
          return highlightNavLink(obj);
        }}
      >
        Leaves
      </NavLink>
      <NavLink
        to="/"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Logout
      </NavLink>
    </nav>
  );
}

export default TopNavigation;
