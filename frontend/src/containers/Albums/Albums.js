import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Title from "../../components/UI/Title/Title";
import {Redirect} from "react-router-dom";
import {fetchArtist} from "../../store/actions/artistsActions";
import {fetchAlbums} from "../../store/actions/albumsActions";

const Albums = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);
    const artist = useSelector(state => state.artists.artist);
    const loading = useSelector(state => state.albums.albumsLoading);
    const user = useSelector(state => state.users.user);

    useEffect( () => {
        dispatch(fetchArtist(match.params.id));
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch, match.params.id]);

    if (!user) {
        return <Redirect to="/login"/>
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {loading ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : (
                    <>
                        {artist && (
                            <Title
                                artistTitle={artist.title}
                            />
                        )}
                        { (albums && albums.length !== 0) ?
                            albums.map(item => (
                                <AlbumItem
                                    key={item._id}
                                    title={item.title}
                                    release={item.year}
                                    tracks={item.count}
                                    id={item._id}
                                    image={item.image}
                                />
                        )) :
                            <Box sx={{textAlign: 'center'}}>There are no albums ...</Box>
                        }
                    </>
                )}
        </div>
    );
};

export default Albums;