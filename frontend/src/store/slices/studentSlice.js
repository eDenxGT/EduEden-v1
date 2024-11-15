import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	studentData: null,
	token: null,
	toggleTheme: false,
	isAuthenticated: false
};

const studentSlice = createSlice({
	name: "student",
	initialState: INITIAL_STATE,
	reducers: {
		studentLogin(state, action) {
			state.studentData = action.payload.studentData;
			state.token = action.payload.token;
			state.isAuthenticated = true
		},
		studentChangeTheme(state, action) {
			state.toggleTheme = action.payload;
		},
		studentLogout(state) {
			state.studentData = null;
			state.token = null;
			state.isAuthenticated = false
		},
	},
});

export const {studentChangeTheme, studentLogin, studentLogout} = studentSlice.actions;

export default studentSlice.reducer;
