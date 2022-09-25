import React from 'react';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Typography} from "@mui/material";

const Title = ({artistTitle, albumTitle, children}) => {

    return (
        <Typography  style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            margin: '10px'
        }}
                     variant={'h4'}
        >

            {artistTitle}
            <ArrowForwardIosIcon style={{margin: '0 10px'}}/>
            {albumTitle}
            {children}
        </Typography>
    );
};

export default Title;