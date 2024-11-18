import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerificationModal from "./utils/Modals/OtpVerificationModal";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import StudentRoutes from "./routes/StudentRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { Toaster } from "sonner";
import LoadingUi from "./utils/Modals/LoadingUi";
import ConfirmationModal from "./utils/Modals/ConfirmtionModal";
import PublicRoutes from "./routes/PublicRoutes";
import Error404Page from "./pages/Others/Error404Page";

function App() {
	return (
		<Router>
			<Toaster position="top-right" richColors />

			<Routes>
				<Route path="/" element={<PublicRoutes />} />
				<Route path="/student/*" element={<StudentRoutes />} />
				<Route path="/tutor/*" element={<TutorRoutes />} />
				<Route path="/admin/*" element={<AdminRoutes />} />

				<Route path="/verify-otp" element={<OtpVerificationModal />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route
					path="/reset-password/:token"
					element={<ResetPassword />}
				/>

				<Route path="/test" element={<ConfirmationModal />} />
				<Route path="/loading" element={<LoadingUi />} />
				<Route path="/*" element={<Error404Page />} />
			</Routes>
		</Router>
	);
}

export default App;
