import * as React from 'react';
import {useEffect} from 'react';
import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import Lists from "./routes/lists";
import Layout from "./components/Layout";
import {Backlog} from "./routes/Backlog";
import {sagaActions} from "./sagas/actions";
import {useAppDispatch} from "./redux/hooks";
import {EditStory} from "./routes/EditStory";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({type: sagaActions.FETCH_COLUMNS_SAGA});
        dispatch({type: sagaActions.FETCH_STORIES_SAGA});
    }, [])

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Lists/>}/>
                    <Route path="/backlog" element={<Backlog/>}/>
                    <Route path="/stories/:id" element={<EditStory/>}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
