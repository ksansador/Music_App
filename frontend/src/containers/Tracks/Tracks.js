import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTrackToHistory, fetchAlbum, fetchTracks} from "../../store/actions/musicActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import Title from "../../components/UI/Title/Title";
import {Redirect} from "react-router-dom";

const Tracks = ({match}) => {
     const dispatch = useDispatch();
     const loading = useSelector(state => state.music.tracksLoading);
     const tracks = useSelector(state => state.music.tracks);
     const album = useSelector(state => state.music.album);
     const user = useSelector(state => state.users.user);

     useEffect(() => {
         dispatch(fetchTracks(match.params.id));
         dispatch(fetchAlbum(match.params.id))
     }, [dispatch, match.params.id]);

    if (!user) {
        return <Redirect to="/login"/>
    }
     const onTrackClick = async (id) => {
         await dispatch(addTrackToHistory(id));
         console.log(id);
     };

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
                                    onClick={() =>onTrackClick(item._id)}
                                />
                            ))
                        }
                    </>
                )}
        </div>
    );
};

export default Tracks;