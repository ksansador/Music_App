import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbum, fetchTracks} from "../../store/actions/musicActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import Title from "../../components/UI/Title/Title";

const Tracks = ({match}) => {
     const dispatch = useDispatch();
     const loading = useSelector(state => state.music.tracksLoading);
     const tracks = useSelector(state => state.music.tracks);
     const album = useSelector(state => state.music.album);

     useEffect(() => {
         dispatch(fetchTracks(match.params.id));
         dispatch(fetchAlbum(match.params.id))
     }, [dispatch, match.params.id]);

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {loading ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : (
                    <>
                        { album && (
                            <Title
                                albumTitle={album.title}
                                artistTitle={album.artist.title}
                            />
                        )}
                        { tracks &&
                            tracks.map(item => (
                                <TrackItem
                                    key={item._id}
                                    title={item.title}
                                    duration={item.duration}
                                    number={item.number}
                                />
                            ))
                        }
                    </>
                )}
        </div>
    );
};

export default Tracks;