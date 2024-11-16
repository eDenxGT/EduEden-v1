import LandingPage from "./pages/LandingPage";
import Signin from "./pages/user/AuthPages/SignIn";
import SignUp from "./pages/user/AuthPages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerificationModal from "./utils/Modals/OtpVerificationModal";
import ForgotPassword from "./pages/user/AuthPages/ForgotPassword";
import ResetPassword from "./pages/user/AuthPages/ResetPassword";

import StudentHomePage from "./pages/user/StudentHomePage";
import TutorSignUp from "./pages/tutor/AuthPages/TutorSignUp";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />

				<Route path="/verify-otp" element={<OtpVerificationModal />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path="/tutor/signup" element={<TutorSignUp />} />

				<Route path="/home" element={<StudentHomePage />} />
			</Routes>
		</Router>
	);
}

export default App;
