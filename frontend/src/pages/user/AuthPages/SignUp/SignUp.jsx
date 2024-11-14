import { useState } from "react";
import GirlRocket from "../../../../assets/images/authPage/RocketGirlImage.png";
import Google from "../../../../assets/icons/Google.svg";
import { PiGraduationCap } from "react-icons/pi";
import InputField from "../../../../components/commonComponents/InputField";
import Button from "../../../../components/commonComponents/Button";
import "./SignUp.scss";
import { axiosInstance } from "../../../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner/Spinner";
import { FiArrowRight } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerificationModal from "../../../../utils/Modals/OtpVerificationModal";

const SignUp = () => {
	const [formData, setFormData] = useState({
		full_name: "",
		user_name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		agreeTerms: false,
	});
	const [errors, setErrors] = useState({
		full_name: "",
		user_name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		agreeTerms: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingOtp, setIsLoadingOtp] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [otpModalOpen, setOtpModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});

		let error = "";
		if (name === "email") {
			if (
				!value.includes("@") ||
				!value.includes(".") ||
				/[^a-zA-Z0-9@.]/.test(value)
			) {
				error = "Invalid email address";
			}
		} else if (name === "password") {
			if (value.length < 6) {
				error = "Password must be at least 6 characters";
			}
		} else if (name === "confirmPassword") {
			if (value !== formData.password) {
				error = "Passwords do not match";
			}
		} else if (name === "full_name") {
			if (value.length < 3) {
				error = "At least 3 characters";
			}
		} else if (name === "user_name") {
			if (value.length < 3) {
				error = "At least 3 characters";
			}
		} else if (name === "phone") {
			if (!/^\d+$/.test(value) || value.length !== 10) {
				error = "Must be 10 digits";
			}
		} else if (name === "agreeTerms" && !checked) {
			error = "You must agree to the terms";
		}
		setErrors({ ...errors, [name]: error });
		setIsFormValid(
			Object.values({ ...errors, [name]: error }).every((err) => !err)
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (!isFormValid) return;

		const formDataToSend = new FormData();

		Object.keys(formData).forEach((key) => {
			if (formData[key] !== "") {
				formDataToSend.append(key, formData[key]);
			}
		});

		try {
			const response = await axiosInstance.post(
				"/auth/signup",
				formDataToSend
			);
			if (response.status === 201) {
				setOtpModalOpen(true);
					setTimeout(() => {
						toast.success(response?.data?.message);
					}, 2000);
			}
		} catch (error) {
			console.log("Sign Up Submit Error: ", error);
			toast.error(error?.response?.data?.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleOtpModalClose = () => {
		setOtpModalOpen(false);
	};

	const handleOtpVerify = async (otpString) => {
		try {
			setIsLoadingOtp(true);

			const response = await axiosInstance.post("/auth/verify-otp", {
				email: formData.email,
				otp: otpString,
			});

			if (response.status === 200) {
				toast.success(response?.data?.message);
				setOtpModalOpen(false);
				setTimeout(() => {
					navigate("/signin");
				}, 2000);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
			console.log("Otp verify error :", error);
		} finally {
			setIsLoadingOtp(false);
		}
	};

	const resendOtp = async () => {
		try {
			const response = await axiosInstance.post("auth/resend-otp", {
				email: formData.email,
			});
			if (response.status === 200) {
				setTimeout(() => {
					toast.success(response?.data?.message);
				}, 2000);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
			console.error("Failed to resend OTP:", error);
		}
	};

	const toSignIn = () => {
		navigate("/signin");
	};

	return (
		<>
			<div className="header">
				<div className="logo">
					<PiGraduationCap className="icon" />
					<span className="brand">
						<span className="brand-edu">Edu</span>
						<span className="brand-eden">Eden</span>
					</span>
				</div>
				<div className="login-prompt">
					Already have an account?
					<button onClick={toSignIn} className="login-button">
						Login
					</button>
				</div>
			</div>
			<div className="signup-container">
				<div className="illustration-section">
					<img
						src={GirlRocket}
						alt="Rocket illustration"
						className="rocket-image"
					/>
				</div>
				<div className="form-section">
					<div className="form-wrapper">
						<h1 className="title">Create your account</h1>
						<form className="signup-form" onSubmit={handleSubmit}>
							<div className="input-wrapper">
								<InputField
									label="Full Name"
									placeholder="Enter Full name"
									name="full_name"
									value={formData.full_name}
									onChange={handleChange}
									error={errors.full_name}
								/>
								{errors.full_name && (
									<span className="error-text">
										{errors.full_name}
									</span>
								)}
							</div>

							<div className="input-wrapper">
								<InputField
									label="Username"
									placeholder="Enter Username"
									name="user_name"
									value={formData.user_name}
									onChange={handleChange}
									error={errors.user_name}
								/>
								{errors.user_name && (
									<span className="error-text">
										{errors.user_name}
									</span>
								)}
							</div>

							<div className="input-wrapper">
								<InputField
									label="Email"
									type="text"
									placeholder="Enter Email address"
									name="email"
									value={formData.email}
									onChange={handleChange}
									error={errors.email}
								/>
								{errors.email && (
									<span className="error-text">
										{errors.email}
									</span>
								)}
							</div>

							<div className="input-wrapper">
								<InputField
									label="Phone"
									type="tel"
									placeholder="Enter Phone number"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									error={errors.phone}
								/>
								{errors.phone && (
									<span className="error-text">
										{errors.phone}
									</span>
								)}
							</div>

							<div className="password-fields">
								<div className="input-wrapper">
									<InputField
										name="password"
										label="Password"
										placeholder="Create password"
										type={
											showPassword ? "text" : "password"
										}
										value={formData.password}
										onChange={handleChange}
										showPassword={showPassword}
										setShowPassword={() =>
											setShowPassword(!showPassword)
										}
										error={errors.password}
									/>
									{errors.password && (
										<span className="error-text-password">
											{errors.password}
										</span>
									)}
								</div>

								<div className="input-wrapper">
									<InputField
										name="confirmPassword"
										label="Confirm Password"
										placeholder="Confirm password"
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
										value={formData.confirmPassword}
										onChange={handleChange}
										showPassword={showConfirmPassword}
										setShowPassword={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
										error={errors.confirmPassword}
									/>
									{errors.confirmPassword && (
										<span className="error-text-password">
											{errors.confirmPassword}
										</span>
									)}
								</div>
							</div>

							<div className="terms">
								<input
									type="checkbox"
									id="terms"
									className="terms-checkbox"
									name="agreeTerms"
									checked={formData.agreeTerms}
									onChange={handleChange}
								/>
								<label htmlFor="terms" className="terms-label">
									I Agree with all of your{" "}
									<a href="#" className="terms-link">
										Terms & Conditions
									</a>
								</label>
							</div>

							<Button
								type="submit"
								text={isLoading ? "" : "Create Account"}
								className="create-account-btn"
								disabled={
									!isFormValid ||
									!formData.full_name ||
									!formData.phone ||
									!formData.password ||
									!formData.email ||
									!formData.user_name ||
									!formData.confirmPassword ||
									!formData.agreeTerms ||
									isLoading
								}>
								{isLoading ? (
									<Spinner size="small" />
								) : (
									<FiArrowRight />
								)}
							</Button>

							<div className="social-signup">
								<div className="divider">
									<div className="line"></div>
									<span className="divider-text">
										SIGN UP WITH
									</span>
									<div className="line"></div>
								</div>
								<div className="google-signup">
									<Button
										className="google-button"
										disabled={!formData.agreeTerms}>
										<img
											src={Google}
											alt="Google logo"
											className="google-icon"
										/>
										Google
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/* OTP Modal */}
			<OtpVerificationModal
				isOpen={otpModalOpen}
				onClose={handleOtpModalClose}
				onVerify={handleOtpVerify}
				isLoading={isLoadingOtp}
				onResendOtp={resendOtp}
			/>
			<ToastContainer position="top-left" autoClose={2000} />
		</>
	);
};

export default SignUp;
