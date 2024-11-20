import { useState } from "react";
import {
	User,
	Mail,
	Phone,
	Briefcase,
	Globe,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
	Youtube,
	Lock,
	Camera,
   ArrowRight,
} from "lucide-react";

import Button from "../../../components/CommonComponents/Button";
import InputField from "../../../components/CommonComponents/InputField";
import Card from "../../../components/CommonComponents/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileManagement = () => {
	const isDarkMode = useSelector(state=> state.tutor.toggleTheme)
	const [profileImage, setProfileImage] = useState(null);
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		phone: "",
		title: "",
		website: "",
		facebook: "",
		instagram: "",
		linkedin: "",
		twitter: "",
		whatsapp: "",
		youtube: "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
      <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
          <Card className={`mb-8 p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md rounded-lg`}>
            <div className="space-y-4">
              <h2 className={`text-xl font-semibold pb-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                Account Settings
              </h2>
              
              <div className="flex items-cente border-b-2 w-fit border-gray-300 text-sm">
                <Link 
                  to="/tutor/settings" 
                  className={`${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"}`}
                >
                  Settings
                </Link>
                <ArrowRight className="w-4 h-4 mt-1 mx-1" />
                <span className={`hover:cursor-pointer  ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}>
                  Profile
                </span>
              </div>
            </div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="md:col-span-2 space-y-6">
							<InputField
								label="Full Name"
								name="fullName"
								value={formData.fullName}
								onChange={handleChange}
								placeholder="Enter your full name"
								icon={<User size={18} />}
                        className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}							/>
							<InputField
								label="Username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								placeholder="Enter your username"
								icon={<User size={18} />}
                        className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}							/>
							<InputField
								label="Email"
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email address"
								icon={<Mail size={18} />}
                        className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<div>
								<InputField
									label="Phone Number"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="Your Phone Number"
									icon={<Phone size={18} />}
						
                           className={`flex-grow    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
								/>
							</div>
							<InputField
								label="Title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								placeholder="Your job title, role"
								icon={<Briefcase size={18} />}
                        className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<div>
								<label
									className={`block text-sm font-medium ${
										isDarkMode
											? "text-gray-300"
											: "text-gray-700"
									} mb-2`}>
									Biography
								</label>
								<textarea
									placeholder="Your small biography"
									rows={4}
									className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent resize-none ${
										isDarkMode
											? "bg-gray-700 border-gray-600 text-white"
											: "bg-white border-gray-300 text-gray-900"
									}`}
								/>
							</div>
							<div>
								<Button
									text="Save Changes"
									className="inline-block max-w-fit px-6 py-2 bg-[#FF5722] text-white rounded-md hover:bg-[#F4511E] transition-colors"
								/>
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
								<label
									className="absolute bottom-2 right-2 p-2 bg-[#FF5722] hover:bg-[#F4511E] rounded-full cursor-pointer
                                shadow-lg transition-transform duration-200 hover:scale-110">
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
				</Card>

				<Card
					className={`mb-8 p-8 ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-md rounded-lg`}>
					<h2
						className={`text-xl font-semibold mb-8 pb-4 border-b ${
							isDarkMode ? "border-gray-700" : "border-gray-100"
						}`}>
						Social Profile
					</h2>
					<div className="space-y-6">
						<InputField
							label="Personal Website"
							type="url"
							name="website"
							value={formData.website}
							onChange={handleChange}
							placeholder="Personal website or portfolio url"
							icon={<Globe size={18} />}
                     className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
						/>
						<div className="grid md:grid-cols-2 gap-6">
							<InputField
								label="Facebook"
								name="facebook"
								value={formData.facebook}
								onChange={handleChange}
								placeholder="Username"
								icon={<Facebook size={18} />}
								className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<InputField
								label="Instagram"
								name="instagram"
								value={formData.instagram}
								onChange={handleChange}
								placeholder="Username"
								icon={<Instagram size={18} />}
								isDarkMode={isDarkMode}
								className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<InputField
								label="LinkedIn"
								name="linkedin"
								value={formData.linkedin}
								onChange={handleChange}
								placeholder="Username"
								icon={<Linkedin size={18} />}
								className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<InputField
								label="Twitter"
								name="twitter"
								value={formData.twitter}
								onChange={handleChange}
								placeholder="Username"
								icon={<Twitter size={18} />}
								className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<InputField
								label="WhatsApp"
								name="whatsapp"
								value={formData.whatsapp}
								onChange={handleChange}
								placeholder="Phone number"
								icon={<Phone size={18} />}
								className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
							<InputField
								label="YouTube"
								name="youtube"
								value={formData.youtube}
								onChange={handleChange}
								placeholder="Username"
								icon={<Youtube size={18} />}
								className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}
							/>
						</div>
						<div>
							<Button
								text="Save Changes"
								className="inline-block max-w-fit px-6 py-2 bg-[#FF5722] text-white rounded-md hover:bg-[#F4511E] transition-colors"
							/>
						</div>
					</div>
				</Card>

				<Card
					className={`mb-8 p-8 ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-md rounded-lg`}>
					<h2
						className={`text-xl font-semibold mb-8 pb-4 border-b ${
							isDarkMode ? "border-gray-700" : "border-gray-100"
						}`}>
						Change Password
					</h2>
					<div className="space-y-6">
						<InputField
							label="Current Password"
							type="password"
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
							className={`    ${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
						/>
						<InputField
							label="New Password"
							icon={<Lock size={18} />}
							type="password"
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
                     className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}						/>
						<InputField
							icon={<Lock size={18} />}
							label="Confirm Password"
							type="password"
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
                     className={`    ${
									isDarkMode
										? "bg-gray-700 border-gray-600 text-white"
										: "bg-white border-gray-300 text-gray-900"
								}`}						/>
						<div>
							<Button
								text="Save Changes"
								className="inline-block max-w-fit px-6 py-2 bg-[#FF5722] text-white rounded-md hover:bg-[#F4511E] transition-colors"
							/>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default ProfileManagement;
