import {call, put, takeLatest} from 'redux-saga/effects'
import {setAll} from '../redux/reducers/columnsSlice';
import {sagaActions} from "./actions";
import {ColumnService} from "../services/column.service";

function* fetchColumns(): Generator<any, any, any> {
    try {
        console.log("FETCHING COLUMNS")
        const columnService = new ColumnService();
        const columns = yield call(columnService.getColumns);
        yield put(setAll(columns));
    } catch (e) {
        console.log(e);
    }
}

function* mySaga() {
    yield takeLatest(sagaActions.FETCH_COLUMNS_SAGA, fetchColumns);
}

export default mySaga;