/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
	Search,
	Bell,
	Heart,
	ShoppingCart,
	Sun,
	Moon,
	User,
	Menu,
	LogOut,
} from "lucide-react";
import Button from "../CommonComponents/Button";
import { PiGraduationCap } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
	studentChangeTheme,
	studentLogout,
} from "../../store/slices/studentSlice";
import { FiArrowLeft } from "react-icons/fi";
import { tutorChangeTheme, tutorLogout } from "../../store/slices/tutorSlice";
import { adminChangeTheme, adminLogout } from "../../store/slices/adminSlice";
import NavItem from "./NavItems";
import SideBarMenu from "../../config/SidebarMenuConfig";
import { publicChangeTheme } from "../../store/slices/publicSlice";
import ConfirmationModal from "../../utils/Modals/ConfirmtionModal";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ role, onClose, handleLogout, isVisible, toggleTheme }) => {
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false);
	const [activeIndex, setActiveIndex] = useState(
		() => parseInt(localStorage.getItem("activeItem"), 10) || 0
	);

	useEffect(() => {
		localStorage.setItem("activeItem", activeIndex);
	}, [activeIndex]);

	const handleLogoutClick = () => {
		setIsConfirmationModalOpen(true);
	};
	const onConfirmModal = () => {
		handleLogout();
		localStorage.removeItem("activeItem");
		setIsConfirmationModalOpen(false);
	};

	const onSideBarClose = () => {
		onClose();
		setIsConfirmationModalOpen(false);
	};

	const onCloseModal = () => {
		setIsConfirmationModalOpen(false);
	};

	const navItems = SideBarMenu[role] || [];

	return (
		<div
			onClick={onSideBarClose}
			className={`fixed inset-0 z-40 transition-opacity duration-300 ${
				isVisible
					? "bg-black bg-opacity-50"
					: "opacity-0 pointer-events-none"
			}`}>
			<div
				className={`absolute top-0 left-0 h-full w-full sm:w-64 transform transition-transform duration-300 ${
					isVisible ? "translate-x-0" : "-translate-x-full"
				} bg-gray-900`}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex justify-between px-6 py-4 border-b border-gray-700">
						<div className="flex items-center gap-2">
							<PiGraduationCap className="h-8 w-8 text-[#FF5722]" />
							<span className="text-2xl font-bold text-white">
								Edu<span className="text-[#FF5722]">Eden</span>
							</span>
						</div>
						<button
							onClick={onSideBarClose}
							className="text-white hover:text-[#FF5722] transition-colors">
							<FiArrowLeft className="h-6 w-6" />
						</button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 mt-1 px-3 overflow-y-auto">
						<div className="space-y-1">
							{navItems.map((item, index) => (
								<NavItem
									key={index}
									item={item}
									isActive={index === activeIndex}
									onClick={() => setActiveIndex(index)}
								/>
							))}
						</div>
					</nav>

					{/* Logout */}
					{role !== "public" && (
						<div className="mt-auto p-4">
							<button
								onClick={() => {
									handleLogoutClick();
									localStorage.removeItem("activeItem");
								}}
								className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-red-600 hover:text-white transition-colors">
								<LogOut className="h-5 w-5" />
								Sign-out
							</button>
						</div>
					)}
				</div>
			</div>
			<ConfirmationModal
				className={"pointer-events-none"}
				isOpen={isConfirmationModalOpen}
				onConfirm={onConfirmModal}
				onClose={onCloseModal}
				icon="danger"
				title="Logout"
				description="Are you sure you want to logout from EduEden?"
				isDarkMode={toggleTheme}
			/>
		</div>
	);
};

const Header = ({ role }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const studentToggleTheme = useSelector(
		(state) => state.student?.toggleTheme
	);
	const tutorToggleTheme = useSelector((state) => state.tutor?.toggleTheme);
	const adminToggleTheme = useSelector((state) => state.admin?.toggleTheme);
	const publicToggleTheme = useSelector((state) => state.public?.toggleTheme);

	const tutorAvatar = useSelector((state) => state.tutor?.tutorData?.avatar);
	const studentAvatar = useSelector(
		(state) => state.student?.studentData?.avatar
	);
	const adminAvatar = useSelector((state) => state.admin?.adminData?.avatar);

	const studentIsAuthenticated = useSelector(
		(state) => state.student?.isAuthenticated
	);
	const tutorIsAuthenticated = useSelector(
		(state) => state.tutor?.isAuthenticated
	);
	const adminIsAuthenticated = useSelector(
		(state) => state.admin?.isAuthenticated
	);

	const toggleTheme =
		role === "student"
			? studentToggleTheme
			: role === "tutor"
			? tutorToggleTheme
			: role === "admin"
			? adminToggleTheme
			: role === "public" && publicToggleTheme;

	const isAuthenticated =
		role === "student"
			? studentIsAuthenticated
			: role === "tutor"
			? tutorIsAuthenticated
			: adminIsAuthenticated;

	const userAvatar =
		role === "student"
			? studentAvatar
			: role === "tutor"
			? tutorAvatar
			: adminAvatar;

	const handleChange = () => {
		role === "student"
			? dispatch(studentChangeTheme(!toggleTheme))
			: role === "tutor"
			? dispatch(tutorChangeTheme(!toggleTheme))
			: role === "admin"
			? dispatch(adminChangeTheme(!toggleTheme))
			: role === "public" && dispatch(publicChangeTheme(!toggleTheme));
	};

	const handleSideBarLogout = () => {
		if (role === "student") {
			dispatch(studentLogout());
			navigate("/student/signin");
		} else if (role === "tutor") {
			dispatch(tutorLogout());
			navigate("/tutor/signin");
		} else if (role === "admin") {
			dispatch(adminLogout());
			navigate("/admin/signin");
		}
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<header
				className={`${
					toggleTheme
						? "bg-gray-900 border-gray-700"
						: "bg-white border-gray-200"
				} border-b transition-colors duration-300 fixed top-0 left-0 right-0 z-40`}>
				<div className="mx-auto px-6">
					<div className="flex items-center h-16">
						{/* Hamburger menu button */}
						<button
							className="mr-2 text-gray-500 hover:text-gray-700"
							onClick={toggleSidebar}>
							<Menu className="h-6 w-6 mr-1" />
						</button>

						{/* Left section */}
						<div className="flex items-center gap-1">
							<PiGraduationCap className="h-6 w-6 text-[#FF5722]" />
							<a href="/" className="flex items-center">
								<span
									className={`text-2xl font-bold ${
										toggleTheme
											? "text-white"
											: "text-gray-900"
									}`}>
									Edu
									<span className="text-[#FF5722]">Eden</span>
								</span>
							</a>
						</div>

						{/* Search Bar */}
						<div className="flex-1 max-w-sm mx-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="text"
									placeholder="What do you want to learn..."
									className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-sm
                  ${
						toggleTheme
							? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-[#FF5722]"
							: "bg-white border-gray-300 text-gray-900 focus:border-[#FF5722]"
					}`}
								/>
							</div>
						</div>

						<div className="flex items-center gap-6 ml-auto">
							{/* Action Icons */}
							<div className="hidden sm:flex items-center gap-4">
								<button
									className={`${
										toggleTheme
											? "text-gray-400 hover:text-gray-200"
											: "text-gray-600 hover:text-gray-900"
									}`}>
									<Bell className="h-5 w-5" />
								</button>
								{role === "student" ||
									(role === "public" && (
										<>
											<button
												className={`${
													toggleTheme
														? "text-gray-400 hover:text-gray-200"
														: "text-gray-600 hover:text-gray-900"
												}`}>
												<Heart className="h-5 w-5" />
											</button>
											<button
												className={`${
													toggleTheme
														? "text-gray-400 hover:text-gray-200"
														: "text-gray-600 hover:text-gray-900"
												}`}>
												<ShoppingCart className="h-5 w-5" />
											</button>
										</>
									))}
							</div>

							{/* Theme Toggle Button */}
							<div className="relative">
								<button
									onClick={handleChange}
									className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 
                  ${toggleTheme ? "bg-gray-700" : "bg-gray-200"}`}
									aria-label={
										toggleTheme
											? "Switch to light mode"
											: "Switch to dark mode"
									}>
									<div
										className={`w-5 h-5 rounded-full transform duration-300 flex items-center justify-center
                    ${
						toggleTheme
							? "translate-x-6 bg-gray-800"
							: "translate-x-0 bg-white"
					}`}>
										{toggleTheme ? (
											<Moon className="h-3 w-3 text-gray-200" />
										) : (
											<Sun className="h-3 w-3 text-yellow-500" />
										)}
									</div>
								</button>
							</div>

							{/* Auth Section */}
							<div className="flex items-center gap-3">
								{isAuthenticated ? (
									<div className="flex items-center bg-black rounded-full overflow-hidden gap-3">
										<button>
											{userAvatar ? (
												<img
													src={userAvatar}
													alt="User Avatar"
													className="w-8 h-8 hover:scale-110 transition-transform delay-100 rounded-full"
												/>
											) : (
												<User
													className={`h-6 w-6 ${
														toggleTheme
															? "text-gray-200"
															: "text-gray-800"
													}`}
												/>
											)}
										</button>
									</div>
								) : (
									<Link to="/student/signup">
										<Button className={`bg-[#ff662e]`}>Create Account</Button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* spacer div dummy */}
			<div className="h-16"></div>

			{/* Sidebar */}
			<Sidebar
				role={role}
				isVisible={isSidebarOpen}
				onClose={toggleSidebar}
				handleLogout={handleSideBarLogout}
				toggleTheme={toggleTheme}
			/>
		</>
	);
};

// const MemoizedHeader = React.memo(Header);

export default Header;
