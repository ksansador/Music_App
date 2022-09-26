import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchHistory} from "../../store/actions/trackHistoryActions";
import {Box} from "@mui/material";
import Title from "../../components/UI/Title/Title";
import HistoryIcon from '@mui/icons-material/History';
import TrackHistoryItem from "../../components/TrackHistoryItem/TrackHistoryItem";
import {addTrackToHistory} from "../../store/actions/musicActions";

const TrackHistory = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.trackHistory.trackHistoryLoading);
    const tracks = useSelector(state => state.trackHistory.tracks);

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login"/>;
    }

    const onTrackClick = async (id) => {
        await dispatch(addTrackToHistory(id));
        await dispatch(fetchHistory());
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
                        { user && (
                            <Title
                                albumTitle={user.username}
                                artistTitle={null}
                            >
                                's history <HistoryIcon sx={{marginLeft: 2}}/>
                            </Title>
                        )}
                        { tracks &&
                            tracks.map(item => (
                                <TrackHistoryItem
                                    key={item._id}
                                    title={item.track.title}
                                    artist={item.artist}
                                    datetime={item.datetime}
                                    number={item.track.number}
                                    duration={item.track.duration}
                                    url={item.track.url}
                                    onClick={() =>onTrackClick(item.track._id)}
                                />
                            ))

                        }
                    </>
                )}
        </div>
    );
};

export default TrackHistory;