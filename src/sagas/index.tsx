import fetchColumns from './fetchColumns-saga';
import fetchStories from './fetchStories-saga';
import {all} from "redux-saga/effects";

export default function* IndexSagas() {
    yield all([
        fetchColumns(),
        fetchStories()
    ])
}