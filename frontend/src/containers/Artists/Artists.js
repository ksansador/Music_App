import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/musicActions";
import {Box} from "@mui/material";
import Artist from "../../components/Artist/Artist";

const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector( state => state.music.artistLoading);
    const artists = useSelector( state => state.music.artists );

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);


    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {loading
                ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : artists && artists.map(artist => (
                    <Artist
                        key={artist._id}
                        title={artist.title}
                        image={artist.image}
                    />
                ) )
            }
        </div>
    );
};

export default Artists;