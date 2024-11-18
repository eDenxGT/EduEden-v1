/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const selectUser = (state) => {
   const studentToken = state.student.token;
   const tutorToken = state.tutor.token;
   const adminToken = state.admin.token;

   return { studentToken, tutorToken, adminToken };
};

const PrivateRoute = ({ allowedRoles, redirectTo, children }) => {
   const { studentToken, tutorToken, adminToken } = useSelector(selectUser);
   const tokens = [studentToken, tutorToken, adminToken];
   const roles = ["student", "tutor", "admin"];
   
   const isAuthorized = tokens.some((token, index) => token && allowedRoles.includes(roles[index]));

   if (!isAuthorized) {
      return <Navigate to={redirectTo} replace />;
   }

   return children;
};

export default PrivateRoute;
