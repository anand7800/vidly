import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";
import { toast } from "react-toastify";

const ProtectedRoute = ({ path, component: Component, render }) => {
  return (
    <Route
      path={path}
      render={props => {
        if (!auth.getUsersData()) {
          toast.warn("Invalid permission, Please login first");
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
