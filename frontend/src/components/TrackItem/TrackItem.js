import React, {useState} from 'react';
import {Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import NumbersIcon from '@mui/icons-material/Numbers';
import YouTubeIcon from "@mui/icons-material/YouTube";
import Modal from "../UI/Modal/Modal";
import ReactPlayer from "react-player";

const TrackItem = ({number, title, duration, url, onClick}) => {
    const [show, setShow] = useState(false);
    let player = <Typography component={'p'}>
        No video here, but imagine what you listened it anyway...
    </Typography>;

    const modalHandler = () => {
        setShow(!show);
    };

    if(Boolean(url)) {
        player = <ReactPlayer url={url} />
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
            <Modal show={show} closed={modalHandler}>
                {player}
            </Modal>

            <Typography variant={'h5'} sx={{ textTransform: 'capitalize'}}>
                Track <NumbersIcon/>{number}
            </Typography>
            <Typography variant={'h4'}  sx={{textTransform: 'capitalize'}}>
                {title}
            </Typography>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography component={'p'} sx={{ textTransform: 'capitalize', marginRight: '10px'}}>
                    {duration}
                </Typography>
                <IconButton onClick={() => {
                    modalHandler();
                    onClick();
                }}>
                    <YouTubeIcon fontSize={'large'}/>
                </IconButton>

            </div>

        </Paper>
    );
};

export default TrackItem;