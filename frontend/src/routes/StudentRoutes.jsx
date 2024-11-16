import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/user/AuthPages/SignUp";
import SignIn from "../pages/user/AuthPages/SignIn";
import StudentHomePage from "../pages/user/StudentHomePage";

const StudentRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="signup" element={<SignUp />} />
				<Route path="signin" element={<SignIn />} />

				<Route path="home" element={<StudentHomePage />} />
			</Routes>
		</>
	);
};

export default StudentRoutes;
