import {
	BookOpen,
	BookOpenText,
	ClipboardList,
	DollarSign,
	Heart,
	Home,
	Layers,
	LayoutDashboard,
	MessageCircleMore,
	PlusCircle,
	Settings,
	ShoppingBag,
	Users,
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";

const navItems = {
	student: [
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
	],
	tutor: [
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
	],
	admin: [
		{
			title: "Dashboard",
			icon: <LayoutDashboard className="h-5 w-5" />,
			link: "/admin/dashboard",
		},
		{
			title: "Create New Courses",
			icon: <PlusCircle className="h-5 w-5" />,
			link: "/admin/courses/new",
		},
		{
			title: "Courses",
			icon: <BookOpen className="h-5 w-5" />,
			link: "/admin/courses",
		},
		{
			title: "Create New Category",
			icon: <PlusCircle className="h-5 w-5" />,
			link: "/admin/categories/new",
		},
		{
			title: "Categories",
			icon: <Layers className="h-5 w-5" />,
			link: "/admin/categories",
		},
		{
			title: "Orders",
			icon: <ShoppingBag className="h-5 w-5" />,
			link: "/admin/orders",
		},
		{
			title: "Manage Students",
			icon: <Users className="h-5 w-5" />,
			link: "/admin/students",
		},
		{
			title: "Manage Mentors",
			icon: <Users className="h-5 w-5" />,
			link: "/admin/tutors",
		},
		{
			title: "Settings",
			icon: <Settings className="h-5 w-5" />,
			link: "/admin/settings",
		},
	],
	public: [
		{
			title: "Dashboard",
			icon: <LayoutDashboard className="h-5 w-5" />,
			link: "/admin/dashboard",
		},
	],
};

export default navItems;