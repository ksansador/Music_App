import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {Avatar, Button, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {deleteArtist, fetchArtists, publishArtist} from "../../store/actions/artistsActions";
import PublishIcon from '@mui/icons-material/Publish';
import imageNotAvailable from "../../assets/no-photo.png";
import {apiUrl} from "../../config";

const  ArtistItem = ({image, title, id, show}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let avatar = imageNotAvailable;

    if (image) {
        avatar = apiUrl + '/' + image;
    }

    return (
        <Paper  sx={{
            width: '40%',
            margin: '20px',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}
                elevation={3}
        >
                <Avatar
                    src={`${avatar}?w=248&fit=crop&auto=format`}
                    alt={title}
                    sx={{ width: 90,height: 90}}
                />
                <Typography variant={'h4'} sx={{ textTransform: 'capitalize'}}>
                    {title}
                </Typography>
                <div>
                    <IconButton
                        component={Link} to={'/albums/' + id}
                        sx={{color: 'rgba(148,148,148,0.54)'}}
                        aria-label={`info about ${title}`}
                    >
                        <InfoIcon/>
                    </IconButton>

                    {
                        user?.role === 'admin' &&
                        <IconButton
                            component={Button}
                            onClick={ async()=> {
                                await dispatch(deleteArtist(id));
                                await dispatch(fetchArtists());
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
                                await dispatch(publishArtist(id));
                                await dispatch(fetchArtists());
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

export default ArtistItem;