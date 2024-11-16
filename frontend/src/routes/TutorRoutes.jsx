import { Route, Routes } from "react-router-dom";
import TutorSignIn from "../pages/tutor/AuthPages/TutorSignIn";
import TutorSignup from "../pages/tutor/AuthPages/TutorSignUp";
import TutorDashboard from "../pages/tutor/TutorDashboard";

const TutorRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="signup" element={<TutorSignup />} />
				<Route path="signin" element={<TutorSignIn />} />
				<Route path="dashboard" element={<TutorDashboard />} />

			</Routes>
		</>
	);
};

export default TutorRoutes;
