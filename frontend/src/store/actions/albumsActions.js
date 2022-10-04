import axiosApi from "../../axiosApi";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILURE = 'FETCH_ALBUM_FAILURE';

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = errors => ({type: FETCH_ALBUMS_FAILURE, payload: errors});

const fetchAlbumRequest = () => ({type: FETCH_ALBUM_REQUEST});
const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, payload: album});
const fetchAlbumFailure = errors => ({type: FETCH_ALBUM_FAILURE, payload: errors});

export const fetchAlbums = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());

            const response = await axiosApi.get(`/albums?artist=${id}`);

            if(response) {
                dispatch(fetchAlbumsSuccess(response.data));
            } else  {
                dispatch(fetchAlbumsSuccess([]));
            }
        } catch (e) {
            dispatch(fetchAlbumsFailure(e));
        }
    };
};

export const fetchAlbum = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumRequest());

            const response = await axiosApi('/albums/' +id);

            if(response.data) {
                dispatch(fetchAlbumSuccess(response.data));
            } else {
                dispatch(fetchAlbumSuccess({}));
            }
        }catch (e) {
            dispatch(fetchAlbumFailure(e));
        }
    };
};
