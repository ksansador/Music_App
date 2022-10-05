import {
    CREATE_ALBUM_FAILURE,
    CREATE_ALBUM_REQUEST,
    CREATE_ALBUM_SUCCESS, DELETE_ALBUM_FAILURE, DELETE_ALBUM_REQUEST, DELETE_ALBUM_SUCCESS,
    FETCH_ALBUM_FAILURE,
    FETCH_ALBUM_REQUEST,
    FETCH_ALBUM_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS
} from "../actions/albumsActions";

const initialState = {
    albums: null,
    album: null,
    albumsErrors: null,
    albumsLoading: false,

    createAlbumLoading: false,
    createAlbumError: null,
};

const albumsReducer = (state = initialState, actions ) => {
    switch (actions.type) {

        case FETCH_ALBUMS_REQUEST:
            return { ...state, albumsLoading: true, albumsErrors: null };
        case FETCH_ALBUMS_SUCCESS:
            return { ...state, albumsLoading: false, albums: actions.payload };
        case FETCH_ALBUMS_FAILURE:
            return { ...state, albumsLoading: false, albumsErrors: actions.payload };

        case FETCH_ALBUM_REQUEST:
            return { ...state, albumsLoading: true, albumsErrors: null };
        case FETCH_ALBUM_SUCCESS:
            return { ...state, albumsLoading: false, album: actions.payload };
        case FETCH_ALBUM_FAILURE:
            return { ...state, albumsLoading: false, albumsErrors: actions.payload };

        case CREATE_ALBUM_REQUEST:
            return {...state, createAlbumLoading: true, createAlbumError: null};
        case CREATE_ALBUM_SUCCESS:
            return {...state, createAlbumLoading: false};
        case CREATE_ALBUM_FAILURE:
            return {...state, createAlbumError: actions.payload, createAlbumLoading: false};

        case DELETE_ALBUM_REQUEST:
            return {...state, createAlbumLoading: true, createAlbumError: null};
        case DELETE_ALBUM_SUCCESS:
            return {...state, createAlbumLoading: false};
        case DELETE_ALBUM_FAILURE:
            return {...state, createAlbumError: actions.payload, createAlbumLoading: false};

        default:
            return state;
    }
};

export default albumsReducer;