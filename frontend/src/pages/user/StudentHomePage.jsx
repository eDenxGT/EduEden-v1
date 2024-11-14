// import React from 'react';
// import { Star, Users, Code, Smartphone, Database, Palette, Network, Bot, Gamepad2 } from "lucide-react";
// import { IoIosGitBranch } from "react-icons/io";
// import Header from "../components/mainComponents/Header";
// import Card from "../components/commonComponents/Card";
// import Button from "../components/commonComponents/Button";
// import Footer from "../components/mainComponents/Footer";

// import Header from "../components/mainComponents/Header";
// import BrototypeLogo from "../assets/images/landingPage/platforms/brototype_logo.png";
// import OpenAi from "../assets/images/landingPage/platforms/openai.jpg";
// import W3Schools from "../assets/images/landingPage/platforms/w3.png";
// import Reactjs from "../assets/images/landingPage/Reactjs.png";
// import UiUx from "../assets/images/landingPage/Ui_Ux.jpg";
// import WebDev from "../assets/images/landingPage/web-dev.jpg";
// import PythonLogo from "../assets/images/landingPage/python.jpg";
// import MediumLogo from "../assets/images/landingPage/platforms/medium.jpg";
// import Geek4Geeks from "../assets/images/landingPage/platforms/gfg.jpg";
// import MernStack from "../assets/images/landingPage/MERN.png";
// import Google from "../assets/images/landingPage/platforms/google.png";
// import StackOverFlow from "../assets/images/landingPage/platforms/stack.png";
// import YouTube from "../assets/images/landingPage/platforms/yt.png";
// import JavaScript from "../assets/images/landingPage/java-script-360x270.jpg";

// export default function StudentHomePage() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <Header />

//       {/* Welcome Section */}
//       <section className="bg-[#FFEEE8] py-8">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
//           <p className="text-gray-600">Continue your learning journey</p>
//         </div>
//       </section>

//       {/* Progress Overview */}
//       <section className="container mx-auto xl:max-w-6xl px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Card className="p-4 bg-blue-50">
//             <h3 className="font-medium">Courses in Progress</h3>
//             <p className="text-2xl font-bold mt-2">3</p>
//           </Card>
//           <Card className="p-4 bg-green-50">
//             <h3 className="font-medium">Completed Courses</h3>
//             <p className="text-2xl font-bold mt-2">2</p>
//           </Card>
//           <Card className="p-4 bg-purple-50">
//             <h3 className="font-medium">Certificates Earned</h3>
//             <p className="text-2xl font-bold mt-2">1</p>
//           </Card>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="container border my-8 shadow-md bg-white xl:max-w-6xl mx-auto px-12 py-12">
//         <h2 className="mb-4 text-2xl font-bold">Browse Categories</h2>
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//           {categories.map((category) => (
//             <Card
//               key={category.name}
//               className={`p-4 ${category.bgColor} hover:shadow-lg transition-shadow cursor-pointer rounded-none`}>
//               <div className="flex items-center gap-3">
//                 <div className="bg-white shadow-md p-2 rounded-none">
//                   {category.icon}
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-sm">{category.name}</h3>
//                   <p className="text-xs text-muted-foreground">
//                     {category.count} Courses
//                   </p>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Recommended Courses */}
//       <div className="bg-[#e6ebf3] py-8">
//         <section className="container xl:max-w-6xl mx-auto px-4">
//           <h2 className="mb-4 text-2xl font-bold">Recommended for You</h2>
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {courses.slice(0, 3).map((course) => (
//               <Card key={course.title} className="overflow-hidden">
//                 <img
//                   alt={course.title}
//                   className="aspect-video w-full object-cover"
//                   src={course.image}
//                 />
//                 <div className="p-4">
//                   <h3 className="font-medium text-sm">{course.title}</h3>
//                   <div className="mt-2 flex items-center gap-2">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm">{course.rating}</span>
//                     <span className="text-sm text-muted-foreground">
//                       ({course.reviews})
//                     </span>
//                   </div>
//                   <div className="mt-2 flex items-center gap-2">
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">
//                       {course.students} students
//                     </span>
//                   </div>
//                   <div className="mt-4">
//                     <Button
//                       text="Continue Learning"
//                       className="w-full bg-[#ff6b35] hover:bg-[#ff6b35]/90"
//                     />
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* Upcoming Quiz Events */}
//       <section className="container mx-auto xl:max-w-6xl border bg-white border-gray-200 px-10 py-12">
//         <h2 className="mb-6 text-2xl font-bold">Upcoming Quiz Events</h2>
//         <div className="grid gap-4">
//           {events.map((event) => (
//             <Card
//               key={event.title}
//               className="flex flex-col border-gray-200 border sm:flex-row">
//               <img
//                 alt={event.title}
//                 className="w-full sm:w-32 h-48 sm:h-auto object-cover"
//                 src={event.image}
//               />
//               <div className="flex-1 p-4">
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//                   <div>
//                     <h3 className="font-medium text-lg">{event.title}</h3>
//                     <p className="mt-1 text-sm text-muted-foreground">
//                       {event.date}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col sm:flex-row items-end justify-end gap-2">
//                   <Button
//                     text="Join Now"
//                     className="text-[#ffffff] border border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white sm:w-24"
//                   />
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Learning Resources */}
//       <section className="bg-white mt-6 mx-auto px-4 py-8">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Learning Resources
//         </h2>
//         <div className="flex justify-center items-center gap-8 flex-wrap">
//           {platforms.map((platform) => (
//             <div
//               key={platform.name}
//               className="transition-opacity hover:opacity-100">
//               <img
//                 src={platform.logo}
//                 alt={`${platform.name} logo`}
//                 className={`object-contain ${platform.height}`}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }


// // Sample data
// const categories = [
// 	{
// 		name: "Web Development",
// 		count: "150",
// 		icon: <Code className="h-5 w-5 text-blue-600" />,
// 		bgColor: "bg-blue-50",
// 	},
// 	{
// 		name: "Mobile Development",
// 		count: "100",
// 		icon: <Smartphone className="h-5 w-5 text-green-600" />,
// 		bgColor: "bg-green-50",
// 	},
// 	{
// 		name: "Data Science",
// 		count: "120",
// 		icon: <Database className="h-5 w-5 text-purple-600" />,
// 		bgColor: "bg-purple-50",
// 	},
// 	{
// 		name: "UI Design",
// 		count: "80",
// 		icon: <Palette className="h-5 w-5 text-orange-600" />,
// 		bgColor: "bg-orange-50",
// 	},
// 	{
// 		name: "Game Development",
// 		count: "90",
// 		icon: <Gamepad2 className="h-5 w-5 text-red-600" />,
// 		bgColor: "bg-red-50",
// 	},
// 	{
// 		name: "Cyber Security",
// 		count: "70",
// 		icon: <Network className="h-5 w-5 text-indigo-600" />,
// 		bgColor: "bg-indigo-50",
// 	},
// 	{
// 		name: "Machine Learning",
// 		count: "110",
// 		icon: <Bot className="h-5 w-5 text-pink-600" />,
// 		bgColor: "bg-pink-50",
// 	},
// 	{
// 		name: "Git & Version Control",
// 		count: "95",
// 		icon: <IoIosGitBranch className="h-5 w-5 text-teal-600" />,
// 		bgColor: "bg-teal-50",
// 	},
// ];

// const courses = [
// 	{
// 		title: "Ui & Ux Designing",
// 		rating: "4.8",
// 		reviews: "2.5k",
// 		students: "15,000",
// 		price: "99.99",
// 		image: UiUx,
// 	},
// 	{
// 		title: "Web Development Bootcamp",
// 		rating: "4.9",
// 		reviews: "3.2k",
// 		students: "20,000",
// 		price: "89.99",
// 		image: WebDev,
// 	},
// 	{
// 		title: "Python Programming Masterclass",
// 		rating: "4.7",
// 		reviews: "1.8k",
// 		students: "12,000",
// 		price: "79.99",
// 		image: PythonLogo,
// 	},
// 	{
// 		title: "React.js Advanced Patterns",
// 		rating: "4.9",
// 		reviews: "1.2k",
// 		students: "8,000",
// 		price: "94.99",
// 		image: Reactjs,
// 	},
// 	{
// 		title: "React.js Advanced Patterns",
// 		rating: "4.9",
// 		reviews: "1.2k",
// 		students: "8,000",
// 		price: "94.99",
// 		image: Reactjs,
// 	},
// 	{
// 		title: "React.js Advanced Patterns",
// 		rating: "4.9",
// 		reviews: "1.2k",
// 		students: "8,000",
// 		price: "94.99",
// 		image: Reactjs,
// 	},
// ];

// const platforms = [
// 	{
// 		name: "Brototype",
// 		logo: BrototypeLogo,
// 		height: "h-24",
// 	},
// 	{
// 		name: "YouTube",
// 		logo: YouTube,
// 		height: "h-5",
// 	},
// 	{
// 		name: "Google",
// 		logo: Google,
// 		height: "h-6",
// 	},
// 	{
// 		name: "Stack Overflow",
// 		logo: StackOverFlow,
// 		height: "h-16",
// 	},
// 	{
// 		name: "Medium",
// 		logo: MediumLogo,
// 		height: "h-16",
// 	},
// 	{
// 		name: "W3Schools",
// 		logo: W3Schools,
// 		height: "h-14",
// 	},
// 	{
// 		name: "GeeksForGeeks",
// 		logo: Geek4Geeks,
// 		height: "h-10",
// 	},
// 	{
// 		name: "OpenAI",
// 		logo: OpenAi,
// 		height: "h-16",
// 	},
// ];

// const events = [
// 	{
// 		title: "JavaScript Quiz Competition",
// 		date: "Nov 15, 2024",
// 		participants: "500+",
// 		image: JavaScript,
// 	},
// 	{
// 		title: "Python Challenge",
// 		date: "Nov 20, 2024",
// 		participants: "750+",
// 		image: PythonLogo,
// 	},
// 	{
// 		title: "React Code Challenge",
// 		date: "Nov 25, 2024",
// 		participants: "600+",
// 		image: Reactjs,
// 	},
// ];

// const teachingSteps = [
// 	{
// 		title: "Apply to teach",
// 		description: "Complete your application to become an instructor",
// 	},
// 	{
// 		title: "Create your course",
// 		description: "Use our platform tools to build engaging content",
// 	},
// 	{
// 		title: "Start earning",
// 		description: "Get paid for every student who takes your course",
// 	},
// ];

// import Instructor from "../assets/images/landingPage/Instructor.png";
// import Footer from "../components/mainComponents/Footer";

// const instructors = [
// 	{
// 		name: "John Smith",
// 		title: "Web Development",
// 		image: Instructor,
// 	},
// 	{
// 		name: "Sarah Johnson",
// 		title: "Data Science",
// 		image: Instructor,
// 	},
// 	{
// 		name: "Michael Brown",
// 		title: "Mobile Development",
// 		image: Instructor,
// 	},
// 	{
// 		name: "Emily Davis",
// 		title: "UI/UX Design",
// 		image: Instructor,
// 	},
// 	{
// 		name: "David Wilson",
// 		title: "Machine Learning",
// 		image: Instructor,
// 	},
// ];
