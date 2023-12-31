import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteArtist, fetchArtists} from "../../store/actions/artistsActions";
import {deleteAlbum, fetchAlbums} from "../../store/actions/albumsActions";
import {deleteTrack, fetchTracks} from "../../store/actions/tracksActions";
import {Box, Typography} from "@mui/material";
import {Redirect} from "react-router-dom";
import ArtistItem from "../../components/ArtistItem/ArtistItem";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import TrackItem from "../../components/TrackItem/TrackItem";
import {addTrackToHistory} from "../../store/actions/trackHistoryActions";

const PublishRequest = () => {
    const dispatch = useDispatch();
    const loading = useSelector( state => state.artists.artistLoading);
    const artists = useSelector( state => state.artists.artists );
    const user = useSelector(state => state.users.user);

    const albums = useSelector(state => state.albums.albums);
    const loadingAlbums = useSelector(state => state.albums.albumsLoading);
    const loadingTracks = useSelector(state => state.tracks.tracksLoading);
    const tracks = useSelector(state => state.tracks.tracks);

    useEffect(() => {
        if(user && user.role === 'user') {
            dispatch(fetchArtists('?user=' + user._id));
            dispatch(fetchAlbums('?user=' + user._id));
            dispatch(fetchTracks('?user=' + user._id));
        } else if (user.role === 'admin'){
            dispatch(fetchArtists(''));
            dispatch(fetchAlbums(''));
            dispatch(fetchTracks(''));
        }

    }, [dispatch, user]);

    if (!user) {
        return <Redirect to="/login"/>
    }

    const onTrackClick = async (id) => {
        await dispatch(addTrackToHistory(id));
    };

    const onDelete = async (id) => {
        await dispatch(deleteTrack(id));
        await dispatch(fetchTracks('?user=' + user._id));
    };

    const onAlbumDelete = async(id)=> {
        await dispatch(deleteAlbum(id));
        await dispatch(fetchAlbums('?user=' +user._id));
    };

    const onArtistDelete = async(id)=> {
        await dispatch(deleteArtist(id));
        await dispatch(fetchArtists('?user=' + user._id));
    };

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h5">
                    Request to public
                </Typography>
            </div>
            <div>
            <div style={{width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6">
                    Artists:
                </Typography>
            </div>
                {loading
                    ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                    : (artists &&
                        artists.map(artist => (
                            artist?.publish === false &&
                            <ArtistItem
                                key={artist._id}
                                id={artist._id}
                                show={true}
                                onDelete={() => onArtistDelete(artist._id)}
                                title={artist.title}
                                image={artist.image}
                            />
                        )))
                }

        </div>

            <div>

                <div style={{width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6">
                        Albums:
                    </Typography>
                </div>

                {loadingAlbums ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                    : (albums &&
                        albums.map(item => (
                            item?.publish === false &&
                            <AlbumItem
                                key={item._id}
                                title={item.title}
                                release={item.year}
                                tracks={item.count}
                                id={item._id}
                                show={true}
                                image={item.image}
                                onDelete={() => onAlbumDelete(item._id)}
                            />
                        )) )
                }
            </div>

            <div>

                <div style={{width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6">
                        Tracks:
                    </Typography>
                </div>

                {loadingTracks ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                    : ( tracks &&
                        tracks.map(item => (
                            item?.publish === false &&
                            <TrackItem
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                duration={item.duration}
                                number={item.number}
                                url={item.url}
                                show={true}
                                onDelete={()=>onDelete(item._id)}
                                onClick={() =>onTrackClick(item._id)}
                            />
                        )) )
                }
            </div>


        </div>
    );
};

export default PublishRequest;