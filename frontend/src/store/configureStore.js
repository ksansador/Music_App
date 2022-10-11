import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import usersReducer from "./reducers/usersReducer";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import thunk from "redux-thunk";
import axiosApi from "../axiosApi";
import trackHistoryReducer from "./reducers/trackHistoryReducer";
import artistsReducer from "./reducers/artistsReducer";
import albumsReducer from "./reducers/albumsReducer";
import tracksReducer from "./reducers/tracksReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
    trackHistory: trackHistoryReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = { data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;