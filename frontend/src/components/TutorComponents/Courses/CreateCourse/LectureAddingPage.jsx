/* eslint-disable react/prop-types */
import Button from "../../../CommonComponents/Button";
import SelectInputField from "../../../CommonComponents/SelectInputField";
import { Edit, Trash } from "lucide-react";

const LectureAddingPage = ({
	formData,
	updateFormData,
	goToPreviousPage,
	goToNextPage,
	isDarkMode,
}) => {
	const handleAddLecture = () => {
		const newLecture = {
			id: Date.now()+Math.floor(Math.random() * 100000+ Date.now() +900000),
			title: "New Lecture",
			contents: [],
		};
		updateFormData({
			lectures: [...(formData.lectures || []), newLecture],
		});
	};

	const handleUpdateLecture = (lectureId, field, value) => {
		const updatedLectures = formData.lectures.map((lecture) =>
			lecture.id === lectureId ? { ...lecture, [field]: value } : lecture
		);
		updateFormData({ lectures: updatedLectures });
	};

	const handleDeleteLecture = (lectureId) => {
		const updatedLectures = formData.lectures.filter(
			(lecture) => lecture.id !== lectureId
		);
		updateFormData({ lectures: updatedLectures });
	};

  const handleOptionChange = (option, lectureId) => {
    switch (option) {
      case "Attach Video" : 
      console.log(`video adding to lecture ${lectureId}`)
      break;
      case "Description" : 
      console.log("description adding")
      break;
      case "Lecture Notes" : 
      console.log("notes adding")
      break;
      default :
      console.log("error")
      break;
    }
  }

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				{formData.lectures &&
					formData.lectures.map((lecture) => (
						<div
							key={lecture.id}
							className={`flex justify-between items-center border p-3 rounded-md ${
								isDarkMode
									? "bg-gray-800 border-gray-700"
									: "bg-white border-gray-300"
							}`}>
							<span
								className={`flex-grow ${
									isDarkMode ? "text-white" : "text-gray-900"
								}`}>
								{lecture.title}
							</span>
							<div className="flex space-x-2 items-center">
								<SelectInputField
									options={[
										"Attach Video",
										"Description",
										"Lecture Notes",
									]}
									value=""
									onChange={(option) => {
										handleOptionChange(option, lecture.id);
									}}
									isDarkMode={isDarkMode}
									placeholder="Contents"
									className="max-w-fit "
									listClassName="w-44 max-w-max"
								/>
								<button
									onClick={() =>
										handleUpdateLecture(
											lecture.id,
											"title",
											"Updated Title"
										)
									}
									className={`p-2 rounded-full ${
										isDarkMode
											? "text-gray-400 hover:text-gray-300"
											: "text-gray-600 hover:text-gray-800"
									}`}>
									<Edit size={18} />
								</button>
								<button
									onClick={() =>
										handleDeleteLecture(lecture.id)
									}
									className={`p-2 rounded-full ${
										isDarkMode
											? "text-gray-400 hover:text-gray-300"
											: "text-gray-600 hover:text-gray-800"
									}`}>
									<Trash size={18} />
								</button>
							</div>
						</div>
					))}
				<div className="flex justify-center">
					<Button
						text="Add Lecture"
						className={`px-4 py-2 bg-orange-600 text-white hover:opacity-80 max-w-fit`}
						onClick={handleAddLecture}
					/>
				</div>
			</div>
			<div className="flex justify-between mt-6">
				<Button
					text="Previous"
					className={`${
						isDarkMode
							? "bg-gray-700 text-gray-300 hover:bg-gray-600"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} max-w-fit px-6 transition-colors duration-200`}
					onClick={goToPreviousPage}
				/>
				<Button
					text="Save & Next"
					className={`max-w-fit px-6 ${
						isDarkMode
							? "bg-orange-600 text-white hover:bg-orange-700"
							: "bg-orange-600 text-white hover:bg-orange-600"
					} transition-colors duration-200`}
					onClick={goToNextPage}
				/>
			</div>
		</div>
	);
};

export default LectureAddingPage;
