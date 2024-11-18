/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createSelector } from "reselect";

const selectAuthState = (state) => state;

const selectTokens = createSelector([selectAuthState], (state) => ({
	studentToken: state.student.token,
	tutorToken: state.tutor.token,
	adminToken: state.admin.token,
}));

const PrivateRoute = ({ allowedRoles, redirectTo, children }) => {
	const { studentToken, tutorToken, adminToken } = useSelector(selectTokens);

	const tokens = [studentToken, tutorToken, adminToken];
	const roles = ["student", "tutor", "admin"];

	const isAuthorized = tokens.some(
		(token, index) => token && allowedRoles.includes(roles[index])
	);

	if (!isAuthorized) {
		return <Navigate to={redirectTo} replace />;
	}

	return children;
};

export default PrivateRoute;
