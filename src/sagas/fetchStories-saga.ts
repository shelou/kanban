import {call, put, takeLatest} from 'redux-saga/effects'
import {setAll} from '../redux/reducers/storySlice';
import {sagaActions} from "./actions";
import {StoryService} from "../services/story.service";

function* fetchStories(): Generator<any, any, any> {
    try {
        console.log("Fetching sotirs")
        const storyService = new StoryService();
        const stories = yield call(storyService.getStories);
        yield put(setAll(stories));
    } catch (e) {
        console.log(e);
    }
}

// to allow concurrent fetches of stories, use takeEvery instead of takeLatest
function* mySaga() {
    yield takeLatest(sagaActions.FETCH_STORIES_SAGA, fetchStories);
}

export default mySaga;