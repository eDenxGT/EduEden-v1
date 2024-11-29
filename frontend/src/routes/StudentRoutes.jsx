import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/student/AuthPages/SignUp";
import SignIn from "../pages/student/AuthPages/SignIn";
import StudentHomePage from "../components/StudentComponents/StudentHomePage";
import StudentLayout from "../pages/student/StudentLayout";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";
import PrivateRoute from "../utils/ProtectRoutes/PrivateRoute";
import Error404Page from "../pages/Others/Error404Page";
import ProfileManagement from "../components/StudentComponents/Settings/ProfileManagement";
import Settings from "../components/StudentComponents/Settings/Settings";
import AllCourseListingPage from "../components/StudentComponents/Courses/AllCourseListingPage";
import SingleCourseDetails from "../components/StudentComponents/Courses/SingleCourseDetails";
import CoursePlayer from "../components/StudentComponents/Courses/CoursePlayer";
import CourseCart from "../components/StudentComponents/CourseCart";

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
							allowedRole="student">
							<StudentLayout />
						</PrivateRoute>
					}>
					<Route path="home" element={<StudentHomePage />} />
					<Route path="settings" element={<Settings />} />
					<Route path="settings/profile" element={<ProfileManagement />} />

					<Route path="cart/:student_id" element={<CourseCart />} />

					<Route path="courses" element={<AllCourseListingPage />} />
					<Route path="courses/:course_id" element={<SingleCourseDetails />} />
					<Route path="courses/play/:course_id/:lecture_id" element={<CoursePlayer />} />
				</Route>

				<Route path="/*" element={<Error404Page />} />
			</Routes>
		</>
	);
};

export default StudentRoutes;
