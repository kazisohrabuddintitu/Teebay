import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthPorviders";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <button className="btn loading absolute top-0 right-0 bottom-0 left-0 m-auto w-20 h-20 bg-transparent border-0 text-indigo-500"></button>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" replace={true}></Navigate>;
};

export default PrivateRoute;
