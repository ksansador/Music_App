import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/musicActions";
import {Box} from "@mui/material";
import ArtistItem from "../../components/ArtistItem/ArtistItem";
import {Redirect} from "react-router-dom";
const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector( state => state.music.artistLoading);
    const artists = useSelector( state => state.music.artists );
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login"/>
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {loading
                ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : artists &&
                    artists.map(artist => (
                        <ArtistItem
                            key={artist._id}
                            id={artist._id}
                            title={artist.title}
                            image={artist.image}
                        />
            ))}
        </div>
    );
};

export default Artists;