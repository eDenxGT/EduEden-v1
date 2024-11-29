const Lecture = require("../models/lectureModel");
const Course = require("../models/courseModel");

const addLecture = async (req, res) => {
	const {
		course_id,
		_id,
		title,
		description,
		duration,
		video,
		thumbnail,
		pdf_notes,
	} = req.body;

	try {
		const lecture = new Lecture({
			course_id,
			lecture_id: _id,
			title,
			description,
			duration,
			video,
			video_thumbnail: thumbnail,
			lecture_note: pdf_notes,
		});

		await lecture.save();
		return res.status(200).json({ message: "Lecture added successfully!" });
	} catch (error) {
		console.log("Lecture Adding Error: ", error);
	}
};

const updateLecture = async (req, res) => {
	const { ...updatedData } = req.body;
	const { lecture_id } = req.params;
	try {
		console.log(updatedData, "lecture id", lecture_id);

		const lecture = await Lecture.findOneAndUpdate(
			{ lecture_id },
			updatedData,
			{ new: true, upsert: true }
		);
		if (lecture) {
			return res
				.status(200)
				.json({ message: "Lecture updated successfully!", lecture });
		}
	} catch (error) {
		console.log("Lecture Updating Error: ", error);
	}
};

// const deleteLecture = async (req, res) => {
// 	const { lecture_id } = req.params;
// 	try {
// 		const lecture = await Lecture.findOneAndDelete({ lecture_id });
// 		if (lecture) {
// 			return res
// 				.status(200)
// 				.json({ message: "Lecture deleted successfully!", lecture });
// 		}
// 	} catch (error) {
// 		console.log("Lecture Deleting Error: ", error);
// 	}
// };

module.exports = {
	addLecture,
	updateLecture,
};

// _id: 'lecture17324358904631732436888438',
// course_id: 'course17324354134121732436330752',
// title: 'Lecture 1dawdawd',
// description: 'wdadawdwada wadawd awd awd aw',
// duration: '0:05',
// video_preview: 'blob:http://localhost:5173/e7fed0ac-4617-418f-8ce8-048473c19e85',
// video_title: 'TEst vudei.mp4',
// video: 'https://res.cloudinary.com/edueden/video/upload/v1732452558/lecture_videos/lecture_video_TEstvudei.mp4_1732452547795.mp4',
// thumbnail: 'https://res.cloudinary.com/edueden/image/upload/v1732452563/lecture_thumbnails/lecture_thumbnail_ResetPassImage.png_1732452560291.png',
// pdf_notes: 'https://res.cloudinary.com/edueden/raw/upload/v1732452559/lecture_pdf_notes/lecture_notes_lecture_notes_Week8_React21.do_1732452559640.docx'
// }
