import { useState } from "react";
import tutorSignupImage from "../../../assets/images/authPage/RocketGirlImage.png";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Button from "../../../components/commonComponents/Button";
import Input from "../../../components/commonComponents/InputField";
import Checkbox from "../../../components/commonComponents/Card";

const TutorSignup = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		location: "",
		subjects: [],
		availability: [],
		bio: "",
		agree: false,
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		location: "",
		subjects: "",
		availability: "",
		bio: "",
		agree: "",
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});

		// Validate fields and update errors
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
	};

	return (
		<div className="flex justify-between items-center h-screen">
			<div className="w-1/2 bg-[#F4F7FF] flex justify-center items-center">
				<img
					src={tutorSignupImage}
					alt="Tutor Signup"
					className="max-w-[24rem]"
				/>
			</div>
			<div className="w-1/2 p-8">
				<h1 className="text-3xl font-bold mb-6">Become a Tutor</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						name="name"
						label="Full Name"
						icon={<AiOutlineUser />}
						value={formData.name}
						onChange={handleChange}
						error={errors.name}
					/>
					<Input
						name="email"
						label="Email Address"
						icon={<AiOutlineMail />}
						value={formData.email}
						onChange={handleChange}
						error={errors.email}
					/>
					<Input
						name="phone"
						label="Phone Number"
						icon={<AiOutlinePhone />}
						value={formData.phone}
						onChange={handleChange}
						error={errors.phone}
					/>
					<Input
						name="password"
						label="Password"
						type="password"
						icon={<RiLockPasswordLine />}
						value={formData.password}
						onChange={handleChange}
						error={errors.password}
					/>
					<Input
						name="location"
						label="Location"
						icon={<MdLocationOn />}
						value={formData.location}
						onChange={handleChange}
						error={errors.location}
					/>
					<div className="flex items-center mt-5 mb-1">
						<input
							type="checkbox"
							className="h-4 w-4 text-[#ff5722] border-gray-300 focus:ring-[#ff5722]"
							name="agreeTerms"
							checked={formData.agreeTerms}
							onChange={handleChange}
						/>
						<label className="ml-2 text-xs text-gray-600">
							I Agree with all of your{" "}
							<a
								href="#"
								className="text-[#ff5722] hover:underline">
								Terms & Conditions
							</a>
						</label>
					</div>{" "}
					<Button type="submit" text="Become a Tutor" />
				</form>
			</div>
		</div>
	);
};

export default TutorSignup;
