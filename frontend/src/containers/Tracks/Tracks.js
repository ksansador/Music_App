import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import TrackItem from "../../components/TrackItem/TrackItem";
import Title from "../../components/UI/Title/Title";
import {Redirect} from "react-router-dom";
import {fetchAlbum} from "../../store/actions/albumsActions";
import {fetchTracks} from "../../store/actions/tracksActions";
import {addTrackToHistory} from "../../store/actions/trackHistoryActions";

const Tracks = ({match}) => {
     const dispatch = useDispatch();
     const loading = useSelector(state => state.tracks.tracksLoading);
     const tracks = useSelector(state => state.tracks.tracks);
     const album = useSelector(state => state.albums.album);
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
                        {( tracks && tracks.length !== 0) ?
                            tracks.map(item => (
                                <TrackItem
                                    key={item._id}
                                    title={item.title}
                                    duration={item.duration}
                                    number={item.number}
                                    url={item.url}
                                    onClick={() =>onTrackClick(item._id)}
                                />
                            )) :
                            <Box sx={{textAlign: 'center'}}>There are no tracks ...</Box>
                        }
                    </>
                )}
        </div>
    );
};

export default Tracks;