import { useState } from "react";
import Google from "../../../../assets/icons/Google.svg";
import { PiGraduationCap } from "react-icons/pi";
import InputField from "../../../../components/commonComponents/InputField";
import Button from "../../../../components/commonComponents/Button";
import BoyPcImage from "../../../../assets/images/authPage/BoyPcImage.png";
import { FiArrowRight } from "react-icons/fi";
import "./SignIn.scss";
import { axiosInstance } from "../../../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerificationModal from "../../../../utils/Modals/OtpVerificationModal";

const SignIn = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [otpModalOpen, setOtpModalOpen] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingOtp, setIsLoadingOtp] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});

		let error = "";
		if (name === "email" && value.length < 3) {
			error = "Enter username or email";
		} else if (name === "password" && value.length < 6) {
			error = "Password must be at least 6 characters";
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

		try {
			const response = await axiosInstance.post("/auth/signin", formData);
			if (response.status === 200) {
				navigate("/home");
			}
		} catch (error) {
			console.error("SignIn Submit Error:", error);
			const errorMessage =
				error?.response?.data?.message ||
				"An error occurred during sign-in.";
			toast.error(errorMessage);

			if (!error?.response?.data?.verified) {
				setOtpModalOpen(true);
				resendOtp();
			}
		} finally {
			setIsLoading(false);
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
					navigate("/home");
				}, 2000);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
			console.log("Otp verify error :", error);
		} finally {
			setIsLoadingOtp(false);
		}
	};

	const handleOtpModalClose = () => {
		setOtpModalOpen(false);
	};

	const toSignUp = () => {
		navigate("/signup");
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
				<div className="signup-prompt">
					Don&apos;t have an account?
					<button onClick={toSignUp} className="signup-button">
						Create Account
					</button>
				</div>
			</div>

			<div className="signin-container">
				<div className="illustration-section">
					<img
						src={BoyPcImage}
						alt="Illustration"
						className="pc-image"
					/>
				</div>

				<div className="form-section">
					<div className="form-wrapper">
						<h1 className="title">Sign in to your account</h1>

						<form className="signin-form" onSubmit={handleSubmit}>
							<div style={{ position: "relative" }}>
								<InputField
									label="Email"
									placeholder="Username or email address..."
									name="email"
									onChange={handleChange}
								/>
								{errors.email && (
									<span className="error-text">
										{errors.email}
									</span>
								)}
							</div>

							<div style={{ position: "relative" }}>
								<InputField
									onChange={handleChange}
									label="Password"
									placeholder="Password"
									name="password"
									showPassword={showPassword}
									setShowPassword={() =>
										setShowPassword(!showPassword)
									}
								/>
								{errors.password && (
									<span className="error-text">
										{errors.password}
									</span>
								)}
							</div>

							<div className="remember-me">
								<label className="checkbox-label">
									<input
										type="checkbox"
										className="checkbox-input"
										name="remember"
										checked={formData.remember}
										onChange={handleChange}
									/>
									<span className="checkbox-text">
										Remember me
									</span>
								</label>
							</div>

							<Button
								type="submit"
								text={isLoading ? "" : "Sign In"}
								className="signin-btn"
								disabled={
									!isFormValid ||
									isLoading ||
									!formData.password ||
									!formData.email
								}>
								{isLoading ? (
									<Spinner size="small" />
								) : (
									<FiArrowRight />
								)}
							</Button>

							<div className="social-signin">
								<div className="divider">
									<div className="line"></div>
									<span className="divider-text">
										SIGN IN WITH
									</span>
									<div className="line"></div>
								</div>

								<div className="google-signin">
									<Button className="google-button">
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

export default SignIn;
