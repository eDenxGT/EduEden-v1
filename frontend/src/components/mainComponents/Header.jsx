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
	Users,
	Settings,
	ShoppingBag,
	PlusCircle,
	BookOpen,
	LayoutDashboard,
	LogOut,
	Home,
	BookOpenText,
	MessageCircleMore,
	Layers,
	ClipboardList,
	DollarSign,
} from "lucide-react";
import Button from "../commonComponents/Button";
import { PiGraduationCap } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { studentChangeTheme } from "../../store/slices/studentSlice";
import { FiArrowLeft } from "react-icons/fi";
import { tutorChangeTheme } from "../../store/slices/tutorSlice";
import { adminChangeTheme } from "../../store/slices/adminSlice";
import { FaChalkboardTeacher } from "react-icons/fa";

const Sidebar = ({ items, onClose, handleLogout, isVisible }) => {
	const [isClicked, setIsClicked] = useState(() => {
		const savedItem = localStorage.getItem("activeItem");
		return savedItem ? parseInt(savedItem, 10) : 0;
	});
	useEffect(() => {
		localStorage.setItem("activeItem", isClicked);
	}, [isClicked]);

	const handleLogoutClick = () => {
		handleLogout();
		localStorage.getItem("activeItem") &&
			localStorage.removeItem("activeItem");
	};

	const handleClick = (itemIndex) => {
		console.log(itemIndex);
		setIsClicked(itemIndex);
	};
	return (
		<div
			onClick={onClose}
			className={`fixed inset-0 z-50 transition-opacity duration-300 ${
				isVisible
					? "bg-black bg-opacity-50"
					: "opacity-0 pointer-events-none"
			}`}>
			<div
				className={`absolute top-0 left-0 h-full w-full sm:w-64 transition-transform duration-300 ease-in-out transform ${
					isVisible ? "translate-x-0" : "-translate-x-full"
				} bg-gray-900`}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex flex-col h-full">
					<div className="px-6 py-4 border-b-[1px] border-gray-700 mb-1 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<PiGraduationCap className="h-8 w-8 text-[#FF5722]" />
							<a href="/" className="flex items-center">
								<span className="text-2xl font-bold text-white">
									Edu
									<span className="text-[#FF5722]">Eden</span>
								</span>
							</a>
						</div>
						<button
							onClick={onClose}
							className="text-white hover:text-[#FF5722] transition-colors">
							<FiArrowLeft className="h-6 w-6" />
						</button>
					</div>
					<nav className="flex-1 px-3 overflow-y-auto">
						<div className="space-y-1">
							{items.map((item, index) => (
								<a
									onClick={() => handleClick(index)}
									key={index}
									// href={item.href}
									className={`user-select-none flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
										index === isClicked
											? "bg-[#FF5722] text-white hover:bg-[#FF5722]/90"
											: "text-gray-400 hover:bg-gray-800 hover:text-white"
									}`}>
									{item.icon}
									{item.title}
								</a>
							))}
						</div>
					</nav>
					<div className="mt-auto p-4">
						<button
							onClick={handleLogoutClick}
							className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
							<LogOut className="h-5 w-5" />
							Sign-out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Header = ({ role, handleSideBarLogout }) => {
	const dispatch = useDispatch();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const studentToggleTheme = useSelector(
		(state) => state.student?.toggleTheme
	);
	const tutorToggleTheme = useSelector((state) => state.tutor?.toggleTheme);
	const adminToggleTheme = useSelector((state) => state.admin?.toggleTheme);

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
			: adminToggleTheme;

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
			: dispatch(adminChangeTheme(!toggleTheme));
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const navItems =
		role === "student"
			? [
					{
						title: "Home",
						icon: <Home className="h-5 w-5" />,
						href: "/student/home",
					},
					{
						title: "Courses",
						icon: <BookOpenText className="h-5 w-5" />,
						href: "/student/courses",
					},
					{
						title: "Teachers",
						icon: <FaChalkboardTeacher className="h-5 w-5" />,
						href: "/student/teachers",
					},
					{
						title: "Chat",
						icon: <MessageCircleMore className="h-5 w-5" />,
						href: "/student/chat",
					},
					{
						title: "Wishlist",
						icon: <Heart className="h-5 w-5" />,
						href: "/student/wishlist",
					},
					{
						title: "Purchases",
						icon: <ShoppingBag className="h-5 w-5" />,
						href: "/student/purchases",
					},
					{
						title: "Settings",
						icon: <Settings className="h-5 w-5" />,
						href: "/student/settings",
					},
			  ]
			: role === "tutor"
			? [
					{
						title: "Dashboard",
						icon: <LayoutDashboard className="h-5 w-5" />,
						href: "/tutor/dashboard",
					},
					{
						title: "Create New Course",
						icon: <PlusCircle className="h-5 w-5" />,
						href: "/tutor/courses/new",
					},
					{
						title: "My Courses",
						icon: <BookOpen className="h-5 w-5" />,
						href: "/tutor/my-courses",
					},
					{
						title: "Earning",
						icon: <DollarSign className="h-5 w-5" />,
						href: "/tutor/earning",
					},
					{
						title: "Quiz",
						icon: <ClipboardList className="h-5 w-5" />,
						href: "/tutor/quiz",
					},
					{
						title: "Message",
						icon: <MessageCircleMore className="h-5 w-5" />,
						href: "/tutor/message",
					},
					{
						title: "Settings",
						icon: <Settings className="h-5 w-5" />,
						href: "/tutor/settings",
					},
			  ]
			: [
					{
						title: "Dashboard",
						icon: <LayoutDashboard className="h-5 w-5" />,
						href: "/admin/dashboard",
					},
					{
						title: "Create New Courses",
						icon: <PlusCircle className="h-5 w-5" />,
						href: "/admin/courses/new",
					},
					{
						title: "Courses",
						icon: <BookOpen className="h-5 w-5" />,
						href: "/admin/courses",
					},
					{
						title: "Create New Category",
						icon: <PlusCircle className="h-5 w-5" />,
						href: "/admin/categories/new",
					},
					{
						title: "Categories",
						icon: <Layers className="h-5 w-5" />,
						href: "/admin/categories",
					},
					{
						title: "Orders",
						icon: <ShoppingBag className="h-5 w-5" />,
						href: "/admin/orders",
					},
					{
						title: "Manage Users",
						icon: <Users className="h-5 w-5" />,
						href: "/admin/users",
					},
					{
						title: "Manage Mentors",
						icon: <Users className="h-5 w-5" />,
						href: "/admin/mentors",
					},
					{
						title: "Settings",
						icon: <Settings className="h-5 w-5" />,
						href: "/admin/settings",
					},
			  ];

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
									<div className="flex items-center gap-3">
										<button>
											{userAvatar ? (
												<img
													src={userAvatar}
													alt="User Avatar"
													className="w-6 h-6 rounded-full"
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
									<Button href="/login">Sign In</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Add a spacer div to push content below the fixed header */}
			<div className="h-16"></div>

			{/* Sidebar */}
			<Sidebar
				items={navItems}
				isVisible={isSidebarOpen}
				onClose={toggleSidebar}
				handleLogout={handleSideBarLogout}
			/>
		</>
	);
};

export default Header;
