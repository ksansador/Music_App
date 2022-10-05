import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {Avatar, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const  ArtistItem = ({image, title, id}) => {

    return (
        <Paper  sx={{
            width: '40%',
            margin: '20px',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // flexWrap: 'wrap',
        }}
                elevation={3}
        >
                <Avatar
                    src={`http://localhost:8000/${image}?w=248&fit=crop&auto=format`}
                    alt={title}
                    sx={{ width: 90,height: 90}}
                />
                <Typography variant={'h4'} sx={{ textTransform: 'capitalize'}}>
                    {title}
                </Typography>

                <IconButton
                    component={Link} to={'/albums/' + id}
                    sx={{ color: 'rgba(148,148,148,0.54)' }}
                    aria-label={`info about ${title}`}
                >
                    <InfoIcon />
                </IconButton>
        </Paper>
    );
};

export default ArtistItem;