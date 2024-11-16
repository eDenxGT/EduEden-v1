import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerificationModal from "./utils/Modals/OtpVerificationModal";
import ForgotPassword from "./pages/user/AuthPages/ForgotPassword";
import ResetPassword from "./pages/user/AuthPages/ResetPassword";

import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Toaster } from "sonner";
import LoadingUi from "./utils/Modals/LoadingUi";

function App() {
	return (
		<Router>
			<Toaster position="top-left" richColors />

			<Routes>
				<Route path="/loading" element={<LoadingUi />} />
				<Route path="/" element={<LandingPage />} />
				<Route path="/student/*" element={<StudentRoutes />} />
				<Route path="/tutor/*" element={<TutorRoutes />} />
				<Route path="/admin/*" element={<AdminRoutes />} />

				<Route path="/verify-otp" element={<OtpVerificationModal />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route
					path="/reset-password/:token"
					element={<ResetPassword />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
