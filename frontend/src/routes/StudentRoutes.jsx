import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/student/AuthPages/SignUp";
import SignIn from "../pages/student/AuthPages/SignIn";
import StudentHomePage from "../components/StudentComponents/StudentHomePage";
import StudentLayout from "../pages/student/StudentLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";

const StudentRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					path="signup"
					element={
						<PublicRoute>
							<SignUp />
						</PublicRoute>
					}
				/>
				<Route
					path="signin"
					element={
						<PublicRoute>
							<SignIn />
						</PublicRoute>
					}
				/>

				<Route
					path="/"
					element={
						<PrivateRoute
							redirectTo={"/student/signin"}
							allowedRoles={["student"]}>
							<StudentLayout />
						</PrivateRoute>
					}>
					<Route path="home" element={<StudentHomePage />} />
				</Route>
			</Routes>
		</>
	);
};

export default StudentRoutes;
