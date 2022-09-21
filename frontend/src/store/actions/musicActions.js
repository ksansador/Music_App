import axiosApi from "../../axiosApi";
import AxiosApi from "../../axiosApi";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS= 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS= 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS= 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILURE = 'FETCH_ALBUM_FAILURE';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS= 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = errors => ({type: FETCH_ARTISTS_FAILURE, payload: errors});

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = errors => ({type: FETCH_ALBUMS_FAILURE, payload: errors});

const fetchAlbumRequest = () => ({type: FETCH_ALBUM_REQUEST});
const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, payload: album});
const fetchAlbumFailure = errors => ({type: FETCH_ALBUM_FAILURE, payload: errors});

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = errors => ({type: FETCH_ALBUMS_FAILURE, payload: errors});

export const fetchArtists = () => {
  return async dispatch => {
      try{
          dispatch(fetchArtistsRequest());

          const response = await axiosApi('/artists');

          if(response) {
              dispatch(fetchArtistsSuccess(response.data));
          }
      } catch (e) {
          dispatch(fetchArtistsFailure(e));
      }
  };
};

export const fetchAlbums = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());

            const response = await AxiosApi.get(`/albums?artist=${id}`);

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

export const fetchTracks = id => {
  return async dispatch => {
      try {
          dispatch(fetchTracksRequest());

          const response = await AxiosApi(`/tracks?album=${id}`);

          if (response.data) {
              dispatch(fetchTracksSuccess(response.data));
          } else {
              dispatch(fetchTracksFailure([]));
          }
      } catch (e) {
          dispatch(fetchTracksFailure(e));
      }
  };
};

export const fetchAlbum = id => {
  return async dispatch => {
      try {
          dispatch(fetchAlbumRequest());

          const response = await AxiosApi('/albums/' +id);

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