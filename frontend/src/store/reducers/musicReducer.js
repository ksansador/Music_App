import {
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST, FETCH_ALBUMS_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS
} from "../actions/musicActions";

const initialState = {
    artists: null,
    artistErrors: null,
    artistLoading: false,

    albums: null,
    albumsErrors: null,
    albumsLoading: false,
};

const musicReducer = (state = initialState, actions ) => {
    switch (actions.type) {
        case FETCH_ARTISTS_REQUEST:
            return { ...state, artistLoading: true, artistErrors: null };
        case FETCH_ARTISTS_SUCCESS:
            return { ...state, artistLoading: false, artists: actions.payload };
        case FETCH_ARTISTS_FAILURE:
            return { ...state, artistLoading: false, artistErrors: actions.payload };

        case FETCH_ALBUMS_REQUEST:
            return { ...state, albumsLoading: true, albumsErrors: null };
        case FETCH_ALBUMS_SUCCESS:
            return { ...state, albumsLoading: false, albums: actions.payload };
        case FETCH_ALBUMS_FAILURE:
            return { ...state, albumsLoading: false, albumsErrors: actions.payload };

        default:
            return state;
    }
}

export default musicReducer;