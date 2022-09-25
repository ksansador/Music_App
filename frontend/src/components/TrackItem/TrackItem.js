import React from 'react';
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import NumbersIcon from '@mui/icons-material/Numbers';
import YouTubeIcon from "@mui/icons-material/YouTube";

const TrackItem = ({number, title, duration, onClick}) => {
    return (
        <div  style={{
            display: 'flex',
            width: '70%',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px',
            border: '1px solid #ccc',
            padding: '10px 20px',
            borderRadius: '20px'
        }}>

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
                <IconButton onClick={onClick}> <YouTubeIcon fontSize={'large'}/> </IconButton>
                {/*<IconButton sx={{marginRight: '20px'}}></IconButton>*/}
                {/*<IconButton> <StopCircleIcon/> </IconButton>*/}

            </div>


            {/*<IconButton*/}
            {/*    component={Link} to={'/tracks/' + id}*/}
            {/*    sx={{ color: 'rgba(148,148,148,0.54)' }}*/}
            {/*    aria-label={`info about ${title}`}*/}
            {/*>*/}

            {/*    <InfoIcon />*/}
            {/*</IconButton>*/}

        </div>
    );
};

export default TrackItem;