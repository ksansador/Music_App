import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums} from "../../store/actions/musicActions";
import {Box, Typography} from "@mui/material";
import AlbumItem from "../../components/AlbumItem/AlbumItem";

const Albums = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.music.albums);
    const loading = useSelector(state => state.music.albumsLoading);

    useEffect( () => {
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch, match.params.id]);


    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {loading ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                :
                albums && (
                    <>
                        <Typography  style={{
                            width: '100%',
                            textTransform: 'capitalize'
                        }}
                                     variant={'h4'}>{albums[0]? albums[0].artist.title : null}</Typography>
                        {albums.map(item => (
                                <AlbumItem
                                    key={item._id}
                                    title={item.title}
                                    release={item.year}
                                    tracks={item.count}
                                    id={item._id}
                                />
                        ))}
                    </>
                )}
        </div>
    );
};

export default Albums;