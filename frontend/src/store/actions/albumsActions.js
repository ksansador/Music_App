import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILURE = 'FETCH_ALBUM_FAILURE';

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_AALBUM_FAILURE';

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = errors => ({type: FETCH_ALBUMS_FAILURE, payload: errors});

const fetchAlbumRequest = () => ({type: FETCH_ALBUM_REQUEST});
const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, payload: album});
const fetchAlbumFailure = errors => ({type: FETCH_ALBUM_FAILURE, payload: errors});

const createAlbumRequest = () => ({type: CREATE_ALBUM_REQUEST});
const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});
const createAlbumFailure = error => ({type: CREATE_ALBUM_FAILURE, payload: error});

const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, payload: error});

export const fetchAlbums = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
    let response;
            if(!!id) {
                 response = await axiosApi.get(`/albums?artist=${id}`);
            } else {
                 response = await axiosApi.get('/albums')
            }


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

export const createAlbum = (albumData) => {
    return async dispatch => {
        try {
            dispatch(createAlbumRequest());
            await axiosApi.post('/albums', albumData);
            dispatch(createAlbumSuccess());
            dispatch(historyPush('/'));
            toast.success('Artist added!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createAlbumFailure(e.response.data));
            } else {
                dispatch(createAlbumFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};

export const deleteAlbum = id => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest());
            await axiosApi.delete('/albums/' + id);
            dispatch(deleteAlbumSuccess());
            toast.success('Delete success!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            dispatch(deleteAlbumFailure(e));
        }
    };
};