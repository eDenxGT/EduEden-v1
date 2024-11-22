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
import CreateCourseLayout from "../components/TutorComponents/Courses/CreateCourseLayout";
import LectureVideoModal from "../components/TutorComponents/Courses/CreateCourse/Modals/VideoModal";
import LectureDescriptionModal from "../components/TutorComponents/Courses/CreateCourse/Modals/DescriptionModal";
import LectureNotesModal from "../components/TutorComponents/Courses/CreateCourse/Modals/NotesModal";
import ThumbnailUploadModal from "../components/TutorComponents/Courses/CreateCourse/Modals/ThumbnailModal";

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
					<Route path="settings/profile" element={<ProfileManagement />} />
					<Route path="my-courses" element={<MyCourses />} />

					<Route path="courses/new" element={<CreateCourseLayout />} />
					<Route path="courses/test" element={<LectureVideoModal isOpen={true} />} />
					<Route path="courses/note" element={<LectureNotesModal isOpen={true} />} />
					<Route path="courses/desc" element={<LectureDescriptionModal isOpen={true} />} />
					<Route path="courses/thumb" element={<ThumbnailUploadModal isOpen={true} />} />



				</Route>
				<Route path="/*" element={<Error404Page />} />
			</Routes>
		</>
	);
};

export default TutorRoutes;
