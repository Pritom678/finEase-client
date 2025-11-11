import { use } from "react";

import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div><Spinner></Spinner></div>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
