import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";
import FormElement from "../../../components/UI/Form/FormElement/FormElement";
import FormSelect from "../../../components/UI/Form/FormSelect/FormSelect";
import {createTrack} from "../../../store/actions/tracksActions";
import {fetchAlbums} from "../../../store/actions/albumsActions";
import {fetchArtists} from "../../../store/actions/artistsActions";
import {Redirect} from "react-router-dom";

const NewTrack = () => {
    const dispatch = useDispatch();
    const error = useSelector( state => state.tracks.createTrackError);
    const albums = useSelector(state => state.albums.albums);
    const artists = useSelector(state => state.artists.artists);
    const user = useSelector(state => state.users.user);

    const [state, setState] = useState({
        title: '',
        artist: '',
        album: '',
        duration: '',
        number: '',
        url: '',
    });

    useEffect(() => {
        dispatch(fetchArtists(''));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAlbums('?artist=' + state.artist));
    }, [dispatch, state.artist]);

    if (!user) {
        return <Redirect to="/login"/>
    }

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    const submitFormHandler = async e => {
        e.preventDefault();

        await dispatch(createTrack(state));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                {artists && <FormSelect
                    label="Artist"
                    required
                    onChange={inputChangeHandler}
                    value={state.artist}
                    name="artist"
                    options={artists}
                    error={getFieldError('artist')}
                />
                }{albums && <FormSelect
                    label="Album"
                    required
                    onChange={inputChangeHandler}
                    value={state.album}
                    name="album"
                    options={albums}
                    error={getFieldError('album')}
                />
                }
                <FormElement
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    required
                    error={getFieldError('title')}
                />
                <FormElement
                    label="Number"
                    type={'number'}
                    onChange={inputChangeHandler}
                    value={state.number}
                    name="number"
                    required
                    error={getFieldError('number')}
                />
                <FormElement
                    label="Duration"
                    onChange={inputChangeHandler}
                    value={state.duration}
                    name="duration"
                    required
                    error={getFieldError('duration')}
                />
                <FormElement
                    label=" YouTube Url"
                    onChange={inputChangeHandler}
                    value={state.url}
                    name="url"
                    error={getFieldError('url')}
                />


                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewTrack;