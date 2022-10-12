import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import ArtistItem from "../../components/ArtistItem/ArtistItem";
import {Link, Redirect} from "react-router-dom";
import {deleteArtist, fetchArtists} from "../../store/actions/artistsActions";
import {toast} from "react-toastify";
const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector( state => state.artists.artistLoading);
    const artists = useSelector( state => state.artists.artists );
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        if(user) {
            dispatch(fetchArtists(''));
        }  else {
            toast.warn('Need to login!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login"/>
    }


    const onDelete = async(id) => {
        await dispatch(deleteArtist(id));
        await dispatch(fetchArtists(''));
    };

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h5">
                    Artists
                </Typography>
                <Button color="primary" sx={{width: '10%'}} component={Link} to="/artists/new">
                    Add Artist
                </Button>
            </div>
            {loading
                ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : (artists && artists.length !== 0) ?
                    artists.map(artist => (
                        artist?.publish === true &&
                        <ArtistItem
                            key={artist._id}
                            id={artist._id}
                            show={false}
                            title={artist.title}
                            onDelete={() => onDelete(artist._id)}
                            image={artist.image}
                        />
            )) :
                    <Box sx={{textAlign: 'center'}}>There are no artists ...</Box>
            }
        </div>
    );
};

export default Artists;