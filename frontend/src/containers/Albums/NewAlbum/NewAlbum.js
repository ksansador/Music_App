import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";
import FormElement from "../../../components/UI/Form/FormElement/FormElement";
import FileInput from "../../../components/UI/Form/FileInput/FileInput";
import {fetchArtists} from "../../../store/actions/artistsActions";
import FormSelect from "../../../components/UI/Form/FormSelect/FormSelect";
import {createAlbum} from "../../../store/actions/albumsActions";

const NewAlbum = () => {
    const dispatch = useDispatch();
    const error = useSelector( state => state.albums.createAlbumError);
    const artists = useSelector(state => state.artists.artists);

    useEffect(() => {
        dispatch(fetchArtists(''));
    }, [dispatch]);

    const [state, setState] = useState({
        title: '',
        artist: '',
        year: '',
        image: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        await dispatch(createAlbum(formData));
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
                {artists && ( <FormSelect
                    label="Artist"
                    onChange={inputChangeHandler}
                    value={state.artist}
                    name="artist"
                    options={artists}
                    error={getFieldError('artist')}
                />) }


                <FormElement
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    required
                    error={getFieldError('title')}
                />
                <FormElement
                    label="Year"
                    required
                    type={'number'}
                    onChange={inputChangeHandler}
                    value={state.year}
                    name="year"
                    error={getFieldError('year')}
                />

                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewAlbum;