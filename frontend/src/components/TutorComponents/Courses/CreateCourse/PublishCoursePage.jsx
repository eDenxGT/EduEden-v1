/* eslint-disable react/prop-types */
import InputField from "../../../CommonComponents/InputField";
import Button from "../../../CommonComponents/Button";
import DummyImage from "../../../../assets/images/tutorVideoAdding/image.png";
import { ImageIcon } from "lucide-react";

const PublishCoursePage = ({ formData, isDarkMode }) => {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2 space-y-4">
					<InputField
						label="Title"
						value={formData.title}
						className={`${
							isDarkMode
								? "bg-gray-700 border-gray-600 text-white"
								: "bg-white border-gray-300 text-gray-900"
						}`}
						readOnly
					/>
					<InputField
						label="Description"
						value={formData.description}
						className={`${
							isDarkMode
								? "bg-gray-700 border-gray-600 text-white"
								: "bg-white border-gray-300 text-gray-900"
						}`}
						readOnly
					/>
					<InputField
						label="Course Category"
						value={formData.category}
						className={`${
							isDarkMode
								? "bg-gray-700 border-gray-600 text-white"
								: "bg-white border-gray-300 text-gray-900"
						}`}
						readOnly
					/>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							label="Course Language"
							value={formData.language}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							readOnly
						/>
						<InputField
							label="Course Level"
							value={formData.level}
							className={`${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
							readOnly
						/>
					</div>
					<InputField
						label="Number of Lectures"
						value={formData.lectures}
						className={`${
							isDarkMode
								? "bg-gray-700 border-gray-600 text-white"
								: "bg-white border-gray-300 text-gray-900"
						}`}
						readOnly
					/>
				</div>
				<div className="text-center">
					<label className="block text-xs font-medium mb-1">
						Course Thumbnail
					</label>
					{formData?.thumbnail ? (
						<img
							src={formData.thumbnail}
							alt="Course Thumbnail"
							className="mx-auto mb-2 w-32 h-32 object-cover"
						/>
					) : (
						<div className="w-32 h-32 mx-auto mb-2 flex items-center justify-center bg-gray-100">
							<ImageIcon className="w-12 h-12 text-gray-400" />
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-between mt-6">
				<Button
					text="Prev Step"
					className={`${
						isDarkMode
							? "bg-gray-700 text-gray-300 hover:bg-gray-600"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} max-w-fit px-6`}
				/>
				<Button
					text="Submit"
					className={`max-w-fit px-6 ${
						isDarkMode
							? "bg-orange-600 text-white hover:bg-orange-700"
							: "bg-orange-500 text-white hover:bg-orange-600"
					}`}
				/>
			</div>
		</div>
	);
};

export default PublishCoursePage;
