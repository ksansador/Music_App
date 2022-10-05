import React from 'react';
import {Avatar, Button, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {deleteAlbum, fetchAlbums} from "../../store/actions/albumsActions";

const AlbumItem = ({image, title, release, tracks, id, artistId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

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
                    src={`http://localhost:8000/${image}?w=248&fit=crop&auto=format`}
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
                            onClick={ async()=> {
                                await dispatch(deleteAlbum(id));
                                await dispatch(fetchAlbums(artistId));
                            }}
                            sx={{ color: 'rgba(148,148,148,0.54)' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                </div>



            </Paper>
    );
};

export default AlbumItem;