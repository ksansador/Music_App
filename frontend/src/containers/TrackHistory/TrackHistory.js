import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addTrackToHistory, fetchHistory} from "../../store/actions/trackHistoryActions";
import {Box} from "@mui/material";
import Title from "../../components/UI/Title/Title";
import HistoryIcon from '@mui/icons-material/History';
import TrackHistoryItem from "../../components/TrackHistoryItem/TrackHistoryItem";
import {toast} from "react-toastify";

const TrackHistory = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.trackHistory.historyLoading);
    const tracks = useSelector(state => state.trackHistory.tracks);

    useEffect(() => {
        if(user) {
            dispatch(fetchHistory());
        }
    }, [dispatch, user]);

    if (!user) {
        toast.warn('You need to login!', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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