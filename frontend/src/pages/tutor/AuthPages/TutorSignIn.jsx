// import { useState } from "react";
// import TutorRocketImage from "../../../assets/images/tutorPage/TutorRocketImage.png";
// import { MdSchool } from "react-icons/md";
// import InputField from "../../../components/commonComponents/InputField";
// import Button from "../../../components/commonComponents/Button";
// import { axiosInstance } from "../../../api/axiosConfig";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../../../utils/Spinner/Spinner";
// import { FiArrowRight } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import GoogleAuthButton from "../../../utils/GoogleAuth/GoogleAuthButton";

// const TutorSignIn = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     let error = "";
//     if (name === "email") {
//       if (
//         !value.includes("@") ||
//         !value.includes(".") ||
//         /[^a-zA-Z0-9@.]/.test(value)
//       ) {
//         error = "Invalid email address";
//       }
//     } else if (name === "password") {
//       if (value.length < 6) {
//         error = "Password must be at least 6 characters";
//       }
//     }
//     setErrors({ ...errors, [name]: error });
//     setIsFormValid(Object.values({ ...errors, [name]: error }).every((err) => !err));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (!isFormValid) return;

//     try {
//       const response = await axiosInstance.post("/auth/tutor-signin", formData);
//       if (response.status === 200) {
//         toast.success(response?.data?.message);
//         setTimeout(() => {
//           navigate("/tutor-home");
//         }, 2000);
//       }
//     } catch (error) {
//       console.log("Tutor Sign In Submit Error: ", error);
//       toast.error(error?.response?.data?.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onGoogleSignInSuccess = async () => {
//     toast.success("Google sign-in was successful.");
//     setTimeout(() => {
//       navigate("/tutor-home");
//     }, 1500);
//   };

//   const toSignUp = () => {
//     navigate("/tutor-signup");
//   };

//   return (
//     <>
//       <div className="flex justify-around items-center p-4 border-b border-gray-200">
//         <div className="flex items-center">
//           <MdSchool className="h-6 w-6 text-[#ff5722]" />
//           <span className="ml-2 text-xl font-semibold">
//             <span className="text-gray-900">Edu</span>
//             <span className="text-[#ff5722]">Eden</span>
//           </span>
//         </div>
//         <div className="text-sm">
//           Don't have an account?
//           <button
//             onClick={toSignUp}
//             className="bg-[#ffeee8] text-[#ff5722] px-4 py-2 ml-4 rounded"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>

//       <div className="min-h-screen flex">
//         <div className="hidden lg:flex lg:w-1/2 bg-[#ebebff] items-center justify-center">
//           <img
//             src={TutorRocketImage}
//             alt="Illustration"
//             className="max-w-[28rem]"
//           />
//         </div>

//         <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
//           <div className="max-w-[28rem] w-full mx-auto">
//             <h1 className="text-2xl font-bold text-gray-900 mb-3">
//               Tutor Sign In
//             </h1>

//             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//               <div>
//                 <div className="mb-6">
//                   <GoogleAuthButton onSuccessRedirect={onGoogleSignInSuccess} />
//                 </div>
//                 <div className="flex items-center justify-center text-base font-semibold text-gray-600">
//                   <div className="flex-grow border-t border-gray-300"></div>
//                   <span className="px-2">OR</span>
//                   <div className="flex-grow border-t border-gray-300"></div>
//                 </div>
//               </div>
//               <div className="relative">
//                 <InputField
//                   label="Email"
//                   type="text"
//                   placeholder="Enter Email address"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   error={errors.email}
//                 />
//                 {errors.email && (
//                   <span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem]">
//                     {errors.email}
//                   </span>
//                 )}
//               </div>
//               <div className="relative">
//                 <InputField
//                   name="password"
//                   label="Password"
//                   placeholder="Enter password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   showPassword={showPassword}
//                   setShowPassword={() => setShowPassword(!showPassword)}
//                   error={errors.password}
//                 />
//                 {errors.password && (
//                   <span className="text-xs text-red-600 absolute -bottom-4 left-0">
//                     {errors.password}