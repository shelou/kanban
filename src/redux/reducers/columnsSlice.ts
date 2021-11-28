import {createSlice} from '@reduxjs/toolkit';
import {columnObj} from "../../data/columns";

interface Props{
    columns: columnObj[];
}
const initialState:Props ={
    columns: []
}

const columnSlice = createSlice({
    name: "columns",
    initialState: initialState,
    reducers: {
        setAll: (state, action) => {
            state.columns = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {setAll} = columnSlice.actions;

export default columnSlice.reducer;