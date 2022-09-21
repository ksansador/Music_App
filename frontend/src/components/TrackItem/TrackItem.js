import React from 'react';
import {Typography} from "@mui/material";


const TrackItem = ({number, title, duration}) => {
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

            <Typography variant={'h5'} sx={{ textTransform: 'capitalize', marginBottom: '15px'}}>
                Track #{number}
            </Typography>
            <Typography variant={'h4'}  sx={{textTransform: 'capitalize'}}>
                {title}
            </Typography>
            <Typography component={'p'} sx={{ textTransform: 'capitalize'}}>
                Duration: {duration}
            </Typography>

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