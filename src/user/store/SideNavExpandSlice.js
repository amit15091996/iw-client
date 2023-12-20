import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: true,
}


export const SideNavExpandSlice = createSlice({
    name: 'expandNav',
    initialState,
    reducers: {
        toggleExpandNav: (state,action) => {
            console.log('before',state.value);
            state.value = action.payload?false:true;
            console.log('After',state.value);
        },
    },
})


export const { toggleExpandNav, } = SideNavExpandSlice.actions;
export default SideNavExpandSlice.reducer;