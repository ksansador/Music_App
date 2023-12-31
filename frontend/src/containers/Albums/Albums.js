import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button} from "@mui/material";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Title from "../../components/UI/Title/Title";
import {Link, Redirect} from "react-router-dom";
import {fetchArtist} from "../../store/actions/artistsActions";
import {deleteAlbum, fetchAlbums} from "../../store/actions/albumsActions";

const Albums = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);
    const artist = useSelector(state => state.artists.artist);
    const loading = useSelector(state => state.albums.albumsLoading);
    const user = useSelector(state => state.users.user);

    useEffect( () => {
        if (user) {
            dispatch(fetchArtist(match.params.id));
            dispatch(fetchAlbums('?artist=' + match.params.id));
        }

    }, [dispatch, match.params.id, user]);

    if (!user) {
        return <Redirect to="/login"/>
    }

    const onDelete = async(id)=> {
        await dispatch(deleteAlbum(id));
        await dispatch(fetchAlbums('?artist=' +match.params.id));
    };

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
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>

                            <Title
                                artistTitle={artist.title}
                            />
                                <Button sx={{width: '20%'}} color="primary" component={Link} to="/albums/new">
                                Add album
                            </Button>

                            </div>
                        )}
                        { (albums && albums.length !== 0) ?
                            albums.map(item => (
                                item?.publish === true &&
                                <AlbumItem
                                    key={item._id}
                                    title={item.title}
                                    release={item.year}
                                    tracks={item.count}
                                    id={item._id}
                                    show={false}
                                    image={item.image}
                                    onDelete={() => onDelete(item._id)}
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