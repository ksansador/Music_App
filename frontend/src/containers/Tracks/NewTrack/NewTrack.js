import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";
import FormElement from "../../../components/UI/Form/FormElement/FormElement";
import FormSelect from "../../../components/UI/Form/FormSelect/FormSelect";
import {fetchAlbums} from "../../../store/actions/albumsActions";
import {createTrack} from "../../../store/actions/tracksActions";

const NewTrack = () => {
    const dispatch = useDispatch();
    const error = useSelector( state => state.tracks.createTrackError);
    const albums = useSelector(state => state.albums.albums);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const [state, setState] = useState({
        title: '',
        album: '',
        duration: '',
        number: '',
        url: '',
    });

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
                {albums && <FormSelect
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