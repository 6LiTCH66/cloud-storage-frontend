import { createSlice } from '@reduxjs/toolkit';

interface DropdownState {
    openDropdownId: string | null;
}

const initialState: DropdownState = {
    openDropdownId: null,
};

export const cardSlice = createSlice({
    name: 'dropDown',
    initialState,
    reducers: {
        setOpenDropdownId: (state, action) => {
            state.openDropdownId = action.payload;
        },
    },
});

export const { setOpenDropdownId } = cardSlice.actions;

export default cardSlice.reducer;
