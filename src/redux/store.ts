import {combineReducers, configureStore, getDefaultMiddleware,} from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {persistStore, persistReducer} from 'redux-persist';
import storySlice from "./reducers/storySlice";
import mySaga from '../sagas/index'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import columnsSlice from "./reducers/columnsSlice";
// configuring saga middleware in app and connecting it to redux using redux toolkit
const sagaMiddleware = createSagaMiddleware();

const allReducers = combineReducers({
    stories: storySlice,
    columns: columnsSlice
});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        'stories',
        'columns',
    ]
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [...getDefaultMiddleware({ thunk: false,
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }), sagaMiddleware],
})

export let persistor = persistStore(store)

// then run the saga
sagaMiddleware.run(mySaga);

export {store}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch