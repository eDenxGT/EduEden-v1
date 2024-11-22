import { useState } from "react";
import {
	User,
	Mail,
	Phone,
	Briefcase,
	Globe,
	Instagram,
	Linkedin,
	Youtube,
	Lock,
	Camera,
	ArrowRight,
	AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useLoading } from "../../../contexts/LoadingContext";

import Button from "../../../components/CommonComponents/Button";
import InputField from "../../../components/CommonComponents/InputField";
import Card from "../../../components/CommonComponents/Card";
import {
	axiosInstance,
	axiosMultipartInstance,
} from "../../../api/axiosConfig";
import { tutorUpdate } from "../../../store/slices/tutorSlice";

const ProfileManagement = () => {
	const isDarkMode = useSelector((state) => state.tutor.toggleTheme);
	const tutorData = useSelector((state) => state.tutor.tutorData);

	const { startLoading, stopLoading } = useLoading();
	const [profileImage, setProfileImage] = useState(tutorData?.avatar || null);
	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [formData, setFormData] = useState({
		full_name: tutorData?.full_name || "",
		user_name: tutorData?.user_name || "",
		email: tutorData?.email || "",
		phone: tutorData?.phone || "",
		title: tutorData?.job_title || "",
		website: tutorData?.social_profiles?.personal_website || "",
		instagram: tutorData?.social_profiles?.instagram || "",
		linkedin: tutorData?.social_profiles?.linkedin || "",
		whatsapp: tutorData?.social_profiles?.whatsapp || "",
		youtube: tutorData?.social_profiles?.youtube || "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		biography: tutorData?.bio || "",
	});
	const [errors, setErrors] = useState({
		full_name: "",
		user_name: "",
		email: "",
		phone: "",
		title: "",
		website: "",
		instagram: "",
		linkedin: "",
		whatsapp: "",
		youtube: "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		biography: "",
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const validateField = (name, value) => {
		let error = "";
		switch (name) {
			case "full_name":
				if (value.length < 3) error = "At least 3 characters";
				break;
			case "user_name":
				if (!/^[a-z._]+$/.test(value) && value.length !== 0)
					error =
						"Only lowercase letters, underscores and dots allowed";
				break;
			case "email":
				if (
					!value.includes("@") ||
					!value.includes(".") ||
					/[^a-zA-Z0-9@.]/.test(value)
				) {
					error = "Invalid email address";
				}
				break;
			case "phone":
				if (!/^\d+$/.test(value) || value.length !== 10)
					error = "Must be 10 digits";
				break;
			case "website":
			case "youtube":
			case "whatsapp":
			case "linkedin":
			case "instagram":
				if (!/^https?:\/\/.+/.test(value) && value.length !== 0)
					error = "Enter a valid link";
				break;
			case "currentPassword":
				if (value && value.length < 6 && value.length !== 0)
					error = "At least 6 characters";
				break;
			case "newPassword":
				if (value && value.length < 6 && value.length !== 0)
					error = "At least 6 characters";
				break;
			case "confirmPassword":
				if (value !== formData.newPassword && value.length !== 0)
					error = "Passwords do not match";
				break;
			default:
				break;
		}
		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		const error = validateField(name, value);
		setErrors((prev) => ({ ...prev, [name]: error }));

		const newErrors = { ...errors, [name]: error };
		setIsFormValid(Object.values(newErrors).every((err) => !err));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.info("Image size must be less than 5MB");
				return;
			}
			if (!["image/jpeg", "image/png"].includes(file.type)) {
				toast.info("Invalid file type. Only JPEG, or PNG are allowed.");
				return;
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
			setFile(file);
		}
	};

	const handleUploadToCloudinary = async () => {
		try {
			const sanitizedName = file.name
				.replace(/[^a-z0-9.\-_]/gi, "")
				.slice(0, 30);
			const public_id = `tutor_avatar_${sanitizedName}_${Date.now()}`;
			const folder = "profile_images";
			const timestamp = Math.floor(Date.now() / 1000);
         const transformation = "c_fill,w_500,h_500,g_face,r_max,f_auto";

			const response = await axiosInstance.post(
				"api/upload/generate-sign",
				{
					folder,
					timestamp,
					public_id,
               transformation
				}
			);

			if (response.status !== 200) {
				toast.error("Something went wrong while uploading the image.");
				return;
			}

			const { apiKey, cloudName, signature } = response.data;

			const data = new FormData();
			data.append("file", file);
			data.append("folder", folder);
			data.append("signature", signature);
			data.append("api_key", apiKey);
			data.append("public_id", public_id);
			data.append("timestamp", timestamp);
         data.append("transformation", transformation);

			const cloudinaryResponse = await axiosMultipartInstance.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				data
			);

			return cloudinaryResponse.data;
		} catch (error) {
			console.error("Cloudinary Upload Error: ", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!isFormValid) {
			toast.error("Please correct the errors in the form");
			return;
		}

		startLoading();
		try {
			const updatedFields = {};

			Object.keys(formData).forEach((key) => {
				if (formData[key] !== tutorData[key]) {
					updatedFields[key] = formData[key];
				}
			});

			if (file) {
				const imageUploaded = await handleUploadToCloudinary();
				if (!imageUploaded) {
					return toast.error(
						"Something went wrong while uploading the image."
					);
				}
				updatedFields.avatar = imageUploaded.secure_url;
			}

			if (Object.keys(updatedFields).length === 0) {
				toast.info("No changes detected to update.");
				return;
			}

			updatedFields.tutorId = tutorData._id;

			const response = await axiosInstance.put(
				"/tutor/update-profile",
				updatedFields
			);

			if (response.status !== 200) {
				toast.error("Failed to update profile");
				return;
			}

			dispatch(tutorUpdate(response.data.tutorData));

			console.log("Profile Updated: ", response.data);
			toast.success("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error(
				error?.response?.data?.message || "Failed to update profile"
			);
		} finally {
			stopLoading();
		}
	};

	return (
		<div
			className={`${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-50 text-gray-900"
			}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
				<Card
					className={`mb-8 p-8 ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-md rounded-lg`}>
					<div className="space-y-4">
						<h2
							className={`text-xl font-semibold pb-4 border-b ${
								isDarkMode
									? "border-gray-700"
									: "border-gray-200"
							}`}>
							Profile Management
						</h2>

						<div
							className={`flex items-center border-b-[1px] w-fit ${
								isDarkMode
									? "border-gray-400"
									: "border-gray-300"
							} text-sm`}>
							<Link
								to="/tutor/settings"
								className={`${
									isDarkMode
										? "text-gray-400 hover:text-gray-300"
										: "text-gray-500 hover:text-gray-800"
								}`}>
								Settings
							</Link>
							<ArrowRight className="w-4 h-4 mt-1 mx-1" />
							<span
								className={`hover:cursor-pointer ${
									isDarkMode
										? "text-gray-200"
										: "text-gray-900"
								}`}>
								Profile
							</span>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="md:col-span-2 space-y-6">
								<div className="relative">
									<InputField
										label="Full Name"
										name="full_name"
										value={formData.full_name}
										onChange={handleChange}
										placeholder="Enter your full name"
										icon={<User size={18} />}
										error={errors.full_name}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.full_name && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.full_name}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										label="Username"
										name="user_name"
										value={formData.user_name}
										onChange={handleChange}
										placeholder="Enter your username"
										icon={<User size={18} />}
										error={errors.user_name}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.user_name && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.user_name}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										label="Email"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="Email address"
										icon={<Mail size={18} />}
										error={errors.email}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.email && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.email}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										label="Phone Number"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										placeholder="Your Phone Number"
										icon={<Phone size={18} />}
										error={errors.phone}
										className={`flex-grow ${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.phone && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.phone}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										label="Title"
										name="title"
										value={formData.title}
										onChange={handleChange}
										placeholder="Your job title, role"
										icon={<Briefcase size={18} />}
										error={errors.title}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.title && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.title}
										</span>
									)}
								</div>
								<div className="relative">
									<label
										className={`block text-sm font-medium ${
											isDarkMode
												? "text-gray-300"
												: "text-gray-700"
										} mb-2`}>
										Biography
									</label>
									<textarea
										name="biography"
										value={formData.biography}
										onChange={handleChange}
										placeholder="Your small biography"
										rows={4}
										className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent resize-none ${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.biography && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.biography}
										</span>
									)}
								</div>
							</div>
							<div className="space-y-6">
								<div className="relative w-48 h-48 mx-auto">
									<div
										className={`w-full h-full rounded-full overflow-hidden ring-4 ${
											isDarkMode
												? "ring-gray-600"
												: "ring-gray-200"
										}`}>
										{profileImage ? (
											<img
												src={profileImage}
												alt="Profile"
												className="w-full h-full object-cover"
											/>
										) : (
											<div
												className={`w-full h-full flex items-center justify-center ${
													isDarkMode
														? "bg-gray-700"
														: "bg-gray-100"
												}`}>
												<User
													className={`w-20 h-20 ${
														isDarkMode
															? "text-gray-500"
															: "text-gray-400"
													}`}
												/>
											</div>
										)}
									</div>
									<label className="absolute bottom-2 right-2 p-2 bg-[#FF5722] hover:bg-[#F4511E] rounded-full cursor-pointer shadow-lg transition-transform duration-200 hover:scale-110">
										<Camera className="w-5 h-5 text-white" />
										<input
											type="file"
											accept="image/*"
											onChange={handleImageUpload}
											className="hidden"
										/>
									</label>
								</div>
								<p
									className={`text-sm ${
										isDarkMode
											? "text-gray-400"
											: "text-gray-500"
									} text-center`}>
									Must be JPEG, PNG, or GIF and cannot exceed
									10MB.
								</p>
							</div>
						</div>

						<Card
							className={`mt-8 p-8 ${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} rounded-lg`}>
							<h2
								className={`text-xl font-semibold mb-8 pb-4 border-b ${
									isDarkMode
										? "border-gray-600"
										: "border-gray-300"
								}`}>
								Social Profile
							</h2>
							<div className="space-y-6">
								<div className="relative">
									<InputField
										label="Personal Website"
										type="url"
										name="website"
										value={formData.website}
										onChange={handleChange}
										placeholder="Personal website or portfolio url"
										icon={<Globe size={18} />}
										error={errors.website}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.website && (
										<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.website}
										</span>
									)}
								</div>
								<div className="grid md:grid-cols-2 gap-6">
									<div className="relative">
										<InputField
											label="Instagram"
											name="instagram"
											value={formData.instagram}
											onChange={handleChange}
											placeholder="Instagram Link"
											icon={<Instagram size={18} />}
											error={errors.instagram}
											className={`${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										{errors.instagram && (
											<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.instagram}
											</span>
										)}
									</div>
									<div className="relative">
										<InputField
											label="LinkedIn"
											name="linkedin"
											value={formData.linkedin}
											onChange={handleChange}
											placeholder="Linkedin Link"
											icon={<Linkedin size={18} />}
											error={errors.linkedin}
											className={`${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										{errors.linkedin && (
											<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.linkedin}
											</span>
										)}
									</div>
									<div className="relative">
										<InputField
											label="WhatsApp"
											name="whatsapp"
											value={formData.whatsapp}
											onChange={handleChange}
											placeholder="https://wa.me/1234567890"
											icon={<Phone size={18} />}
											error={errors.whatsapp}
											className={`${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										{errors.whatsapp && (
											<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.whatsapp}
											</span>
										)}
									</div>
									<div className="relative">
										<InputField
											label="YouTube"
											name="youtube"
											value={formData.youtube}
											onChange={handleChange}
											placeholder="Youtube Link"
											icon={<Youtube size={18} />}
											error={errors.youtube}
											className={`${
												isDarkMode
													? "bg-gray-700 border-gray-600 text-white"
													: "bg-white border-gray-300 text-gray-900"
											}`}
										/>
										{errors.youtube && (
											<span className="text-xs text-red-600 absolute bottom-[0.65rem] right-[0.4rem] flex items-center">
												<AlertTriangle
													size={12}
													className="mr-1"
												/>
												{errors.youtube}
											</span>
										)}
									</div>
								</div>
							</div>
						</Card>

						<Card
							className={`mt-8 p-8 ${
								isDarkMode ? "bg-gray-800" : "bg-white"
							} rounded-lg`}>
							<h2
								className={`text-xl font-semibold mb-8 pb-4 border-b ${
									isDarkMode
										? "border-gray-700"
										: "border-gray-100"
								}`}>
								Change Password
							</h2>
							<div className="space-y-6">
								<div className="relative">
									<InputField
										label="Current Password"
										type={
											showPassword.current
												? "text"
												: "password"
										}
										name="currentPassword"
										icon={<Lock size={18} />}
										value={formData.currentPassword}
										onChange={handleChange}
										placeholder="Enter current password"
										showPassword={showPassword.current}
										setShowPassword={() =>
											setShowPassword((prev) => ({
												...prev,
												current: !prev.current,
											}))
										}
										error={errors.currentPassword}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.currentPassword && (
										<span className="text-xs text-red-600 absolute bottom-[0.73rem] right-[2.3rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.currentPassword}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										label="New Password"
										icon={<Lock size={18} />}
										type={
											showPassword.new
												? "text"
												: "password"
										}
										name="newPassword"
										value={formData.newPassword}
										onChange={handleChange}
										placeholder="Enter new password"
										showPassword={showPassword.new}
										setShowPassword={() =>
											setShowPassword((prev) => ({
												...prev,
												new: !prev.new,
											}))
										}
										error={errors.newPassword}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.newPassword && (
										<span className="text-xs text-red-600 absolute bottom-[0.73rem] right-[2.3rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.newPassword}
										</span>
									)}
								</div>
								<div className="relative">
									<InputField
										icon={<Lock size={18} />}
										label="Confirm Password"
										type={
											showPassword.confirm
												? "text"
												: "password"
										}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										placeholder="Confirm new password"
										showPassword={showPassword.confirm}
										setShowPassword={() =>
											setShowPassword((prev) => ({
												...prev,
												confirm: !prev.confirm,
											}))
										}
										error={errors.confirmPassword}
										className={`${
											isDarkMode
												? "bg-gray-700 border-gray-600 text-white"
												: "bg-white border-gray-300 text-gray-900"
										}`}
									/>
									{errors.confirmPassword && (
										<span className="text-xs text-red-600 absolute bottom-[0.73rem] right-[2.3rem] flex items-center">
											<AlertTriangle
												size={12}
												className="mr-1"
											/>
											{errors.confirmPassword}
										</span>
									)}
								</div>
							</div>
						</Card>

						<div className="mt-8">
							<Button
								text="Save Changes"
								type="submit"
								className="disabled:bg-[#ffc4b1] inline-block max-w-fit px-6 py-2 bg-[#FF5722] text-white rounded-md hover:bg-[#F4511E] transition-colors"
								disabled={
									!isFormValid ||
									formData.confirmPassword !==
										formData.newPassword ||
									(formData.newPassword.length > 0 &&
										formData.currentPassword.length === 0)
								}
							/>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default ProfileManagement;
