import React from 'react';
import {Avatar, Button, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import { fetchAlbums, publishAlbum} from "../../store/actions/albumsActions";
import PublishIcon from "@mui/icons-material/Publish";
import imageNotAvailable from '../../assets/no-photo.png';
import {apiUrl} from "../../config";

const AlbumItem = ({image, title, release, tracks, id, onDelete, show}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let avatar = imageNotAvailable;

    if (image) {
        avatar = apiUrl + '/' + image;
    }
    return (
            <Paper  sx={{
                width: '30%',
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
                    src={`${avatar}?w=248&fit=crop&auto=format`}
                    alt={title}
                    sx={{ width: 100, height: 100, marginBottom: '15px' }}
                />
                <Typography variant={'h5'} sx={{ textAlign: 'center', textTransform: 'capitalize', marginBottom: '15px'}}>
                    {title}
                </Typography>
                <Typography component={'p'}  sx={{margin: '0 0 10px', textAlign: 'center'}}>
                    Year of release: <i>{release}</i>
                </Typography>
                <Typography component={'p'} sx={{ textTransform: 'capitalize'}}>
                    Tracks: {tracks}
                </Typography>
                <div>
                    <IconButton
                        component={Link} to={'/tracks/' + id}
                        sx={{ color: 'rgba(148,148,148,0.54)' }}
                        aria-label={`info about ${title}`}
                    >
                        <ArrowDropDownCircleIcon />
                    </IconButton>
                    {
                        user?.role === 'admin' &&
                        <IconButton
                            component={Button}
                            onClick={onDelete}
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
                                await dispatch(publishAlbum(id));
                                await dispatch(fetchAlbums(''));
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

export default AlbumItem;