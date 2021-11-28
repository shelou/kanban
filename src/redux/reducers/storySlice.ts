import {createSlice} from '@reduxjs/toolkit';


interface Props{
    stories: any[];
}
const initialState:Props ={
    stories: []
}

const storySlice = createSlice({
    name: "stories",
    initialState: initialState,
    reducers: {
        setAll: (state, action) => {
            console.log("set all stories")
            state.stories = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {setAll} = storySlice.actions;

export default storySlice.reducer;