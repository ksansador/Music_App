import React from 'react';
import {Avatar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const AlbumItem = ({image, title, release, tracks}) => {
    return (
        <div  style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px',
            border: '1px solid #ccc',
            padding: '10px 20px',
            borderRadius: '20px'
        }}>
            <Avatar
                src={`${image}?w=248&fit=crop&auto=format`}
                alt={title}
                sx={{ width: 100, height: 100, marginBottom: '15px' }}
            />
            <Typography variant={'h3'} sx={{ textTransform: 'capitalize', marginBottom: '15px'}}>
                {title}
            </Typography>
            <Typography component={'p'}  sx={{textTransform: 'capitalize'}}>
                Year of release: <i>{release}</i>
            </Typography>
            <Typography component={'p'} sx={{ textTransform: 'capitalize'}}>
                Tracks: {tracks}
            </Typography>

            <IconButton
                component={Link} to={'/artist/' + id}
                sx={{ color: 'rgba(148,148,148,0.54)' }}
                aria-label={`info about ${title}`}
            >
                <InfoIcon />
            </IconButton>

        </div>
    );
};

export default AlbumItem;