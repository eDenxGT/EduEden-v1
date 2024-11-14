import BoyImage from "../assets/images/landingPage/Boy1.jpg";
import Button from "../components/commonComponents/Button";
import Card from "../components/commonComponents/Card";
import { IoIosGitBranch } from "react-icons/io";
import {
	Star,
	Users,
	Code,
	Smartphone,
	Database,
	Palette,
	Network,
	Bot,
	Gamepad2,
} from "lucide-react";
import Header from "../components/mainComponents/Header";
import BrototypeLogo from "../assets/images/landingPage/platforms/brototype_logo.png";
import OpenAi from "../assets/images/landingPage/platforms/openai.jpg";
import W3Schools from "../assets/images/landingPage/platforms/w3.png";
import Reactjs from "../assets/images/landingPage/Reactjs.png";
import UiUx from "../assets/images/landingPage/Ui_Ux.jpg";
import WebDev from "../assets/images/landingPage/web-dev.jpg";
import PythonLogo from "../assets/images/landingPage/python.jpg";
import MediumLogo from "../assets/images/landingPage/platforms/medium.jpg";
import Geek4Geeks from "../assets/images/landingPage/platforms/gfg.jpg";
import MernStack from "../assets/images/landingPage/MERN.png";
import Google from "../assets/images/landingPage/platforms/google.png";
import StackOverFlow from "../assets/images/landingPage/platforms/stack.png";
import YouTube from "../assets/images/landingPage/platforms/yt.png";
import JavaScript from "../assets/images/landingPage/java-script-360x270.jpg";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<Header />

			{/* Hero Section */}
			<section className="bg-[#FFEEE8] mx-auto grid grid-cols-1 md:grid-cols-2">
				<div className="container px-4 py-16 md:py-24 flex items-center justify-center">
					<div className="space-y-6">
						<h1 className="text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
							Master <span className="text-[#FF5722]">Code,</span>
							<br />
							Step by Step
						</h1>
						<p className="text-sm xl:text-xl md:text-base text-gray-600 max-w-lg xl:max-w-screen-sm md:max-w-md">
							Skip the "what should I learn next?" confusion.
							Follow our structured paths, build awesome projects,
							and get expert help whenever you need it.
						</p>
						<Button
							text="Become A Developer"
							className="w-auto max-w-52 px-6"
						/>
					</div>
				</div>
				<div className="relative h-full">
					<img
						alt="Learning environment"
						className="h-full w-full object-cover"
						src={BoyImage}
					/>
				</div>
			</section>

			{/* Categories */}
			<section className="container border my-14 shadow-md bg-white xl:max-w-6xl mx-auto px-12  py-12">
				<h2 className="mb-4 text-2xl font-bold text-center">
					Browse top category
				</h2>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
					{categories.map((category) => (
						<Card
							key={category.name}
							className={`p-4 ${category.bgColor} hover:shadow-lg transition-shadow cursor-pointer rounded-none`}>
							<div className="flex items-center gap-3">
								<div
									className={` bg-white shadow-md  p-2 rounded-none `}>
									{category.icon}
								</div>
								<div>
									<h3 className="font-medium text-sm">
										{category.name}
									</h3>
									<p className="text-xs text-muted-foreground">
										{category.count} Courses
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</section>

			{/* Best Selling Courses */}
			<div className="bg-[#e6ebf3] my-10 ">
				<section className="container xl:max-w-6xl mx-auto px-4  py-8">
					<h2 className="mb-4 text-2xl font-bold text-center">
						Best selling courses
					</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
						{courses.map((course) => (
							<Card
								key={course.title}
								className="overflow-hidden">
								<img
									alt={course.title}
									className="aspect-video w-full object-cover"
									src={course.image}
								/>
								<div className="p-4">
									<h3 className="font-medium text-sm">
										{course.title}
									</h3>
									<div className="mt-2 flex items-center gap-2">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="text-sm">
											{course.rating}
										</span>
										<span className="text-sm text-muted-foreground">
											({course.reviews})
										</span>
									</div>
									<div className="mt-2 flex items-center gap-2">
										<Users className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm text-muted-foreground">
											{course.students} students
										</span>
									</div>
									<div className="mt-4">
										<span className="font-bold text-[#ff6b35]">
											${course.price}
										</span>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>
			</div>

			{/* Quiz Events */}
			<section className="container mx-auto xl:max-w-6xl border bg-white border-gray-200 px-10 py-12">
				<h2 className="mb-6 text-2xl md:text-3xl font-bold text-center">
					Join Quiz Events and Win Prizes
				</h2>
				<div className="grid gap-4 md:gap-6">
					{events.map((event) => (
						<Card
							key={event.title}
							className="flex flex-col border-gray-200 border  sm:flex-row">
							<img
								alt={event.title}
								className="w-full sm:w-32 h-48 sm:h-auto object-cover"
								src={event.image}
							/>
							<div className="flex-1 p-4">
								<div className="flex flex-col sm:flex-row justify-between  items-start gap-4">
									<div>
										<h3 className="font-medium text-lg">
											{event.title}
										</h3>
										<p className="mt-1 text-sm text-muted-foreground">
											{event.date}
										</p>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row items-end justify-end gap-2 w-full sm:w-auto">
									<Button
										text="Join Now"
										className="text-[#ffffff] border border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white sm:w-24"
									/>
								</div>
							</div>
						</Card>
					))}
				</div>
			</section>

			{/* Become a Mentor */}
			<section className="container mx-auto xl:max-w-6xl px-4 py-8">
				<div className="grid md:grid-cols-2 gap-8">
					<Card className="bg-[#ff6b35]/10 p-8">
						<div>
							<h2 className="text-2xl font-bold text-[#ff6b35]">
								Become a Mentor
							</h2>
							<p className="mt-2 text-muted-foreground">
								Join our community of expert instructors and
								share your knowledge with students worldwide.
							</p>
							<Button
								text="Apply Now"
								className="mt-4 bg-[#ff6b35] max-w-32 hover:bg-[#ff6b35]/90"
							/>
						</div>
					</Card>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">
							Your teaching & earning steps
						</h3>
						{teachingSteps.map((step, index) => (
							<div key={index} className="flex gap-4 items-start">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6b35]/10 text-[#ff6b35]">
									{index + 1}
								</div>
								<div>
									<h4 className="font-medium">
										{step.title}
									</h4>
									<p className="text-sm text-muted-foreground">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Top Instructors */}
			<section className="container mx-auto bg-cyan-50 border border-gray-200 shadow-md xl:max-w-6xl px-4 py-8">
				<h2 className="mb-6 text-2xl font-bold text-center">
					Top Instructor of the month
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{instructors.map((instructor) => (
						<div key={instructor.name} className="text-center">
							<img
								src={instructor.image}
								alt={instructor.name}
								className="w-24 h-24 rounded-full mx-auto mb-2"
							/>
							<h3 className="font-medium text-sm">
								{instructor.name}
							</h3>
							<p className="text-xs text-muted-foreground">
								{instructor.title}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Trusted Platforms */}
			<section className="bg-white mt-6 mx-auto px-4 py-8">
				<h2 className="text-2xl font-semibold text-center mb-4">
					Trusted Platforms We Rely On
				</h2>
				<p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
					We rely on trusted platforms to deliver up-to-date, reliable
					resources, ensuring that learners receive comprehensive
					guidance and practical skills.
				</p>

				<div className="flex justify-center items-center gap-8 flex-wrap">
					{platforms.map((platform) => (
						<div
							key={platform.name}
							className="transition-opacity hover:opacity-100">
							<img
								src={platform.logo}
								alt={`${platform.name} logo`}
								className={`object-contain ${platform.height}`}
							/>
						</div>
					))}
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}

// Sample data
const categories = [
	{
		name: "Web Development",
		count: "150",
		icon: <Code className="h-5 w-5 text-blue-600" />,
		bgColor: "bg-blue-50",
	},
	{
		name: "Mobile Development",
		count: "100",
		icon: <Smartphone className="h-5 w-5 text-green-600" />,
		bgColor: "bg-green-50",
	},
	{
		name: "Data Science",
		count: "120",
		icon: <Database className="h-5 w-5 text-purple-600" />,
		bgColor: "bg-purple-50",
	},
	{
		name: "UI Design",
		count: "80",
		icon: <Palette className="h-5 w-5 text-orange-600" />,
		bgColor: "bg-orange-50",
	},
	{
		name: "Game Development",
		count: "90",
		icon: <Gamepad2 className="h-5 w-5 text-red-600" />,
		bgColor: "bg-red-50",
	},
	{
		name: "Cyber Security",
		count: "70",
		icon: <Network className="h-5 w-5 text-indigo-600" />,
		bgColor: "bg-indigo-50",
	},
	{
		name: "Machine Learning",
		count: "110",
		icon: <Bot className="h-5 w-5 text-pink-600" />,
		bgColor: "bg-pink-50",
	},
	{
		name: "Git & Version Control",
		count: "95",
		icon: <IoIosGitBranch className="h-5 w-5 text-teal-600" />,
		bgColor: "bg-teal-50",
	},
];

const courses = [
	{
		title: "Ui & Ux Designing",
		rating: "4.8",
		reviews: "2.5k",
		students: "15,000",
		price: "99.99",
		image: UiUx,
	},
	{
		title: "Web Development Bootcamp",
		rating: "4.9",
		reviews: "3.2k",
		students: "20,000",
		price: "89.99",
		image: WebDev,
	},
	{
		title: "Python Programming Masterclass",
		rating: "4.7",
		reviews: "1.8k",
		students: "12,000",
		price: "79.99",
		image: PythonLogo,
	},
	{
		title: "React.js Advanced Patterns",
		rating: "4.9",
		reviews: "1.2k",
		students: "8,000",
		price: "94.99",
		image: Reactjs,
	},
	{
		title: "React.js Advanced Patterns",
		rating: "4.9",
		reviews: "1.2k",
		students: "8,000",
		price: "94.99",
		image: Reactjs,
	},
	{
		title: "React.js Advanced Patterns",
		rating: "4.9",
		reviews: "1.2k",
		students: "8,000",
		price: "94.99",
		image: Reactjs,
	},
];

const platforms = [
	{
		name: "Brototype",
		logo: BrototypeLogo,
		height: "h-24",
	},
	{
		name: "YouTube",
		logo: YouTube,
		height: "h-5",
	},
	{
		name: "Google",
		logo: Google,
		height: "h-6",
	},
	{
		name: "Stack Overflow",
		logo: StackOverFlow,
		height: "h-16",
	},
	{
		name: "Medium",
		logo: MediumLogo,
		height: "h-16",
	},
	{
		name: "W3Schools",
		logo: W3Schools,
		height: "h-14",
	},
	{
		name: "GeeksForGeeks",
		logo: Geek4Geeks,
		height: "h-10",
	},
	{
		name: "OpenAI",
		logo: OpenAi,
		height: "h-16",
	},
];

const events = [
	{
		title: "JavaScript Quiz Competition",
		date: "Nov 15, 2024",
		participants: "500+",
		image: JavaScript,
	},
	{
		title: "Python Challenge",
		date: "Nov 20, 2024",
		participants: "750+",
		image: PythonLogo,
	},
	{
		title: "React Code Challenge",
		date: "Nov 25, 2024",
		participants: "600+",
		image: Reactjs,
	},
];

const teachingSteps = [
	{
		title: "Apply to teach",
		description: "Complete your application to become an instructor",
	},
	{
		title: "Create your course",
		description: "Use our platform tools to build engaging content",
	},
	{
		title: "Start earning",
		description: "Get paid for every student who takes your course",
	},
];

import Instructor from "../assets/images/landingPage/Instructor.png";
import Footer from "../components/mainComponents/Footer";

const instructors = [
	{
		name: "John Smith",
		title: "Web Development",
		image: Instructor,
	},
	{
		name: "Sarah Johnson",
		title: "Data Science",
		image: Instructor,
	},
	{
		name: "Michael Brown",
		title: "Mobile Development",
		image: Instructor,
	},
	{
		name: "Emily Davis",
		title: "UI/UX Design",
		image: Instructor,
	},
	{
		name: "David Wilson",
		title: "Machine Learning",
		image: Instructor,
	},
];
