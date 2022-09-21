import axiosApi from "../../axiosApi";
import AxiosApi from "../../axiosApi";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS= 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS= 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';


const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = errors => ({type: FETCH_ARTISTS_FAILURE, payload: errors});

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = errors => ({type: FETCH_ALBUMS_FAILURE, payload: errors});

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
  }
};

export const fetchAlbums = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());

            const response = await AxiosApi.get(`/albums?artist=${id}`);

            if(response) {
                dispatch(fetchAlbumsSuccess(response.data));
            }
        } catch (e) {
            dispatch(fetchAlbumsFailure(e));
        }
    }
}