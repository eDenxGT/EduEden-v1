import { Route, Routes } from "react-router-dom";
import TutorSignIn from "../pages/tutor/AuthPages/TutorSignIn";
import TutorSignup from "../pages/tutor/AuthPages/TutorSignUp";
import TutorDashboard from "../components/TutorComponents/TutorDashboard";
import TutorLayout from "../pages/tutor/TutorLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";

const TutorRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					path="signup"
					element={
						<PublicRoute>
							<TutorSignup />
						</PublicRoute>
					}
				/>
				<Route
					path="signin"
					element={
						<PublicRoute>
							<TutorSignIn />
						</PublicRoute>
					}
				/>
				<Route
					path="/"
					element={
						<PrivateRoute allowedRoles={["tutor"]} redirectTo={"/tutor/signin"}>
							<TutorLayout />
						</PrivateRoute>
					}>
					<Route path="dashboard" element={<TutorDashboard />} />
				</Route>
			</Routes>
		</>
	);
};

export default TutorRoutes;
