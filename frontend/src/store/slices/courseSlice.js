import { createSlice } from "@reduxjs/toolkit";
import {
	addCourse,
	fetchCoursesByTutorId,
	fetchCourses,
	fetchListedCourses,
	fetchCoursesByCourseId,
	updateCourse,
	deleteCourseById,
	handleCourseStatus,
	fetchCoursesByStudentId
} from "../thunks/courseThunks";

const courseSlice = createSlice({
	name: "courses",
	initialState: { courses: [], course: null, loading: false, error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addCourse.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addCourse.fulfilled, (state, action) => {
				state.loading = false;
				state.courses.push(action.payload);
			})
			.addCase(addCourse.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCoursesByTutorId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoursesByTutorId.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload;
			})
			.addCase(fetchCoursesByTutorId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchListedCourses.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchListedCourses.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload;
			})
			.addCase(fetchListedCourses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCourses.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload;
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCoursesByCourseId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoursesByCourseId.fulfilled, (state, action) => {
				state.loading = false;
				state.course = action.payload;
			})
			.addCase(fetchCoursesByCourseId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateCourse.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCourse.fulfilled, (state, action) => {
				state.loading = false;
				state.course = action.payload;
			})
			.addCase(updateCourse.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteCourseById.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteCourseById.fulfilled, (state, action) => {
				state.loading = false
				state.courses = state.courses.filter(course => course._id !== action.payload)
			})
			.addCase(deleteCourseById.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(handleCourseStatus.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(handleCourseStatus.fulfilled, (state, action) => {
				state.loading = false
				state.courses = state.courses.map(course => course._id === action.payload._id ? action.payload : course)
			})
			.addCase(handleCourseStatus.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(fetchCoursesByStudentId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCoursesByStudentId.fulfilled, (state, action) => {
				state.loading = false;
				state.courses = action.payload;
			})
			.addCase(fetchCoursesByStudentId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
	},
});

export default courseSlice.reducer;
