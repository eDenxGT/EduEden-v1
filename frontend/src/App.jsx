import LandingPage from "./pages/LandingPage";
import Signin from "./pages/user/AuthPages/SignIn/SignIn";
import SignUp from "./pages/user/AuthPages/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerificationModal from "./utils/Modals/OtpVerificationModal";
// import StudentHomePage from "./pages/user/StudentHomePage";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/signup" element={<SignUp  />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/verify-otp" element={<OtpVerificationModal />} />

				{/* <Route path="/home" element={<StudentHomePage />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
