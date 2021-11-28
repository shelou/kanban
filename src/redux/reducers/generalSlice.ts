import {createSlice} from '@reduxjs/toolkit';


interface Props{
    isLoading: boolean;
}
const initialState:Props ={
    isLoading: false
}

const generalSlice = createSlice({
    name: "generalStates",
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {setIsLoading} = generalSlice.actions;

export default generalSlice.reducer;