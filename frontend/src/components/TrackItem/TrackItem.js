
import React, {useState} from 'react';
import {Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import NumbersIcon from '@mui/icons-material/Numbers';
import YouTubeIcon from "@mui/icons-material/YouTube";
import Modal from "../UI/Modal/Modal";
import ReactPlayer from "react-player";
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import {toast} from "react-toastify";
const TrackItem = ({number, title, duration, url, onClick}) => {
    const [show, setShow] = useState(false);
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
        <PlayCircleFilledTwoToneIcon fontSize={'large'}/>
    </IconButton>;

    const modalHandler = () => {
        setShow(!show);
    };

    if(!!url) {
        player =<IconButton onClick={() => {
            modalHandler();
            onClick();
        }}>
            <Modal show={show} closed={modalHandler}>
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
            <Typography variant={'h4'}  sx={{textTransform: 'capitalize'}}>
                {title}
            </Typography>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography component={'p'} sx={{ textTransform: 'capitalize', marginRight: '10px'}}>
                    {duration}
                </Typography>
                {player}

            </div>

        </Paper>
    );
};

export default TrackItem;