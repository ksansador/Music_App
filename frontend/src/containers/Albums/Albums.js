import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums, fetchArtist} from "../../store/actions/musicActions";
import {Box} from "@mui/material";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Title from "../../components/UI/Title/Title";
import {Redirect} from "react-router-dom";

const Albums = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.music.albums);
    const artist = useSelector(state => state.music.artist);
    const loading = useSelector(state => state.music.albumsLoading);
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
            justifyContent: 'space-between'
        }}>
            {loading ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                : (
                    <>
                        {artist && (
                            <Title
                                artistTitle={artist.title}
                            />
                        )}
                        { albums &&
                            albums.map(item => (
                                <AlbumItem
                                    key={item._id}
                                    title={item.title}
                                    release={item.year}
                                    tracks={item.count}
                                    id={item._id}
                                    image={item.image}
                                />
                        ))}
                    </>
                )}
        </div>
    );
};

export default Albums;