import { Route, Routes } from "react-router-dom";
import AdminSignIn from "../pages/admin/AuthPages/AdminSignIn";
import AdminDashboard from "../components/AdminComponents/AdminDashboard";
import TutorMangement from "../components/AdminComponents/SideBar/TutorMangement";
import StudentManagement from "../components/AdminComponents/SideBar/StudentManagement";
// import AdminSettings from "../components/AdminComponents/SideBar/AdminSettings"
import AdminLayout from "../pages/admin/AdminLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";
import Error404Page from "../pages/Others/Error404Page";

const AdminRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					path="signin"
					element={
						<PublicRoute redirectToAdmin="/admin/dashboard">
							<AdminSignIn />
						</PublicRoute>
					}
				/>

				<Route
					path="/"
					element={
						<PrivateRoute
							allowedRoles={["admin"]}
							redirectTo="/admin/signin">
							<AdminLayout />
						</PrivateRoute>
					}>
					<Route path="dashboard" element={<AdminDashboard />} />
					<Route path="tutors" element={<TutorMangement />} />
					<Route path="students" element={<StudentManagement />} />
					{/* <Route path="settings" element={<AdminSettings />} /> */}
				</Route>

				<Route path="/*" element={<Error404Page />} />
			</Routes>
		</>
	);
};

export default AdminRoutes;
