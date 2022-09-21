import React, {useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbum, fetchTracks} from "../../store/actions/musicActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            {loading ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                :
                tracks && (
                    <>
                        <Typography  style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'capitalize'
                        }}
                                      variant={'h4'}>
                            {album? album.artist.title : null} <ArrowForwardIosIcon style={{margin: '0 10px'}}/> {album? album.title : null}
                        </Typography>
                        {
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