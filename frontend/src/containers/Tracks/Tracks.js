import React, {useEffect} from 'react';
import {Box, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import TrackItem from "../../components/TrackItem/TrackItem";
import Title from "../../components/UI/Title/Title";
import {Link, Redirect} from "react-router-dom";
import {fetchAlbum} from "../../store/actions/albumsActions";
import {deleteTrack, fetchTracks} from "../../store/actions/tracksActions";
import {addTrackToHistory} from "../../store/actions/trackHistoryActions";

const Tracks = ({match}) => {
     const dispatch = useDispatch();
     const loading = useSelector(state => state.tracks.tracksLoading);
     const tracks = useSelector(state => state.tracks.tracks);
     const album = useSelector(state => state.albums.album);
     const user = useSelector(state => state.users.user);

     useEffect(() => {
         if(user) {
             dispatch(fetchTracks('?album=' + match.params.id));
             dispatch(fetchAlbum(match.params.id))
         }

     }, [dispatch, match.params.id, user]);

    if (!user) {
        return <Redirect to="/login"/>
    }

     const onTrackClick = async (id) => {
         await dispatch(addTrackToHistory(id));
     };

    const onDelete = async (id) => {
        await dispatch(deleteTrack(id));
        await dispatch(fetchTracks('?album=' + match.params.id));
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
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                <Title
                                    albumTitle={album.title}
                                    artistTitle={album.artist.title}
                                />

                                <Button sx={{width: '20%'}} color="primary" component={Link} to="/tracks/new">
                                    Add track
                                </Button>

                            </div>

                        )}
                        {( tracks && tracks.length !== 0) ?
                            tracks.map(item => (
                                item?.publish === true &&
                                <TrackItem
                                    key={item._id}
                                    id={item._id}
                                    title={item.title}
                                    duration={item.duration}
                                    number={item.number}
                                    url={item.url}
                                    show={false}
                                    onDelete={() =>onDelete(item._id)}
                                    albumId={match.params.id}
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