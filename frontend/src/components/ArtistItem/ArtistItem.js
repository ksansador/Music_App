import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {Avatar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const  ArtistItem = ({image, title, id}) => {

    return (
        <div  style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px 50px',
            border: '1px solid #ccc',
            padding: '10px 20px',
            borderRadius: '20px'
        }}>
            <Avatar
                src={`${image}?w=248&fit=crop&auto=format`}
                alt={title}
                sx={{ width: 100, height: 100, marginRight: '40px' }}
            />
            <Typography variant={'h4'} sx={{marginRight: '20px', textTransform: 'capitalize'}}>
                {title}
            </Typography>

            <IconButton
                component={Link} to={'/albums/' + id}
                sx={{ color: 'rgba(148,148,148,0.54)' }}
                aria-label={`info about ${title}`}
            >

                <InfoIcon />
            </IconButton>

        </div>
    );
};

export default ArtistItem;