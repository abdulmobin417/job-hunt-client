import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
// import {  RotatingLines } from "react-loader-spinner";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const RoleWiseRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isRole, isRoleLoading } = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p>Loading....</p>
        {/* <RotatingLines
          strokeColor="green"
          strokeWidth="5"
          animationDuration="0.75"
          width="36"
          visible={true}
        /> */}
      </div>
    );
  }
  if (user && isRole) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

RoleWiseRoute.propTypes = {
  children: PropTypes.node,
};

export default RoleWiseRoute;