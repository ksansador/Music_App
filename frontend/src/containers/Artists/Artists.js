import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import ArtistItem from "../../components/ArtistItem/ArtistItem";
import {Link, Redirect} from "react-router-dom";
import {fetchArtists} from "../../store/actions/artistsActions";
const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector( state => state.artists.artistLoading);
    const artists = useSelector( state => state.artists.artists );
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login"/>
    }

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
                        <ArtistItem
                            key={artist._id}
                            id={artist._id}
                            title={artist.title}
                            image={artist.image}
                        />
            )) :
                    <Box sx={{textAlign: 'center'}}>There are no artists ...</Box>
            }
        </div>
    );
};

export default Artists;