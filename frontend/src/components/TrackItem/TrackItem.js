import React, {useState} from 'react';
import {Button, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import NumbersIcon from '@mui/icons-material/Numbers';
import YouTubeIcon from "@mui/icons-material/YouTube";
import Modal from "../UI/Modal/Modal";
import ReactPlayer from "react-player";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTrack, fetchTracks, publishTrack} from "../../store/actions/tracksActions";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublishIcon from "@mui/icons-material/Publish";

const TrackItem = ({id, number, title, duration, url, onClick, albumId, show}) => {
    const [shown, setShown] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let player = <IconButton onClick={() => {
        onClick();
        toast.success('Tack added to history!', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }}>
        <PlayArrowIcon fontSize={'large'}/>
    </IconButton>;


    const modalHandler = () => {
        setShown(!shown);
    };

    if(!!url) {
        player =
                <IconButton onClick={() => {
                    modalHandler();
                    onClick();
                }}>
                    <Modal show={shown} closed={modalHandler}>
                        <ReactPlayer url={url} />
                    </Modal>
                    <YouTubeIcon fontSize={'large'}/>
                </IconButton>
    }

    return (
        <Paper  style={{
            display: 'flex',
            width: '70%',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px',
            padding: '10px 20px',
        }}
                elevation={3}
        >

            <Typography variant={'h6'} sx={{ textTransform: 'capitalize'}}>
                Track <NumbersIcon/>{number}
            </Typography>
            <Typography variant={'h5'}  sx={{textTransform: 'capitalize'}}>
                {title}
            </Typography>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography component={'p'} sx={{ textTransform: 'capitalize', marginRight: '10px'}}>
                    {duration}
                </Typography>

                {player}
                {
                    user?.role === 'admin' &&
                    <IconButton
                        component={Button}
                        onClick={ async()=> {
                            await dispatch(deleteTrack(id));
                            await dispatch(fetchTracks(albumId));
                        }}
                        sx={{ color: 'rgba(148,148,148,0.54)' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                }

                {
                    show  && user?.role === 'admin' &&
                    <IconButton
                        component={Button}
                        onClick={ async()=> {
                            await dispatch(publishTrack(id));
                            await dispatch(fetchTracks());
                        }}
                        sx={{ color: 'rgba(148,148,148,0.54)' }}
                    >
                        <PublishIcon />
                    </IconButton>
                }

            </div>

        </Paper>
    );
};

export default TrackItem;