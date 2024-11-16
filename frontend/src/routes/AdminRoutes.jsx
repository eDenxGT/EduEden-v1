import { Route, Routes } from "react-router-dom";
import AdminSignIn from "../pages/admin/AdminSignIn";

const AdminRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="signin" element={<AdminSignIn />} />

				{/* <Route path="home" element={<StudentHomePage />} /> */}
			</Routes>
		</>
	);
};

export default AdminRoutes;
