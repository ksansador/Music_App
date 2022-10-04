import React from 'react';
import {Avatar, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const AlbumItem = ({image, title, release, tracks, id}) => {
    return (
            <Paper  sx={{
                width: '25%',
                margin: '20px',
                padding: '10px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
                    elevation={3}
            >
                <Avatar
                    src={`https://localhost:8000/uploads/${image}?w=248&fit=crop&auto=format`}
                    alt={title}
                    sx={{ width: 100, height: 100, marginBottom: '15px' }}
                />
                <Typography variant={'h3'} sx={{ textTransform: 'capitalize', marginBottom: '15px'}}>
                    {title}
                </Typography>
                <Typography component={'p'}  sx={{margin: '0 0 10px', textAlign: 'center'}}>
                    Year of release: <i>{release}</i>
                </Typography>
                <Typography component={'p'} sx={{ textTransform: 'capitalize'}}>
                    Tracks: {tracks}
                </Typography>

                <IconButton
                    component={Link} to={'/tracks/' + id}
                    sx={{ color: 'rgba(148,148,148,0.54)' }}
                    aria-label={`info about ${title}`}
                >
                    <ArrowDropDownCircleIcon />
                </IconButton>
            </Paper>
    );
};

export default AlbumItem;