import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sortType: {
		name: 'популярность',
		sort: 'rating',
	},
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSortType: (state, action) => {
			state.sortType = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
});

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
