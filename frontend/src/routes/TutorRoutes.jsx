import { Route, Routes } from "react-router-dom";
import TutorSignIn from "../pages/tutor/AuthPages/TutorSignIn";
import TutorSignup from "../pages/tutor/AuthPages/TutorSignUp";
import TutorDashboard from "../components/TutorComponents/Dashboard/TutorDashboard";
import TutorLayout from "../pages/tutor/TutorLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";
import Error404Page from "../pages/Others/Error404Page";
import Settings from "../components/TutorComponents/Settings/Settings";
import ProfileManagement from "../components/TutorComponents/Settings/ProfileManagement";
import MyCourses from "../components/TutorComponents/Courses/MyCourses";

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
						<PrivateRoute
							allowedRoles={["tutor"]}
							redirectTo={"/tutor/signin"}>
							<TutorLayout />
						</PrivateRoute>
					}>
					<Route path="dashboard" element={<TutorDashboard />} />

					{/* TEST ROUTES */}
					<Route path="settings" element={<Settings />} />
					<Route path="profile" element={<ProfileManagement />} />
					<Route path="my-courses" element={<MyCourses />} />



				</Route>
				<Route path="/*" element={<Error404Page />} />
			</Routes>
		</>
	);
};

export default TutorRoutes;
