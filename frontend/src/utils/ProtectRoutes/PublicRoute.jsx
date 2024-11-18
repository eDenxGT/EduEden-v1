/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({
	children,
}) => {
	const studentToken = useSelector((state) => state.student.token);
	const tutorToken = useSelector((state) => state.tutor.token);
	const adminToken = useSelector((state) => state.admin.token);

	if (studentToken) {
		return <Navigate to="/student/home" replace />;
	}

	if (tutorToken) {
		return <Navigate to="/tutor/dashboard" replace />;
	}

	if (adminToken) {
		return <Navigate to="/admin/dashboard" replace />;
	}
	return children;
};

export default PublicRoute;
