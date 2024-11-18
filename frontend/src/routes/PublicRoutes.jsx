import { Route, Routes } from "react-router-dom";
import PublicLayout from "../pages/PublicPage/PublicLayout";
import LandingPage from "../components/PubicPages/LandingPage";
import PublicRoute from "../utils/ProtectRoutes/PublicRoute";

const PublicRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<PublicLayout />
					</PublicRoute>
				}>
				<Route path="" element={<LandingPage />} />
				{/* <Route path="contact" element={<ContactPage />} /> */}
			</Route>
		</Routes>
	);
};

export default PublicRoutes;
