import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";
import FormElement from "../../../components/UI/Form/FormElement/FormElement";
import FileInput from "../../../components/UI/Form/FileInput/FileInput";
import {createArtist} from "../../../store/actions/artistsActions";
import {Redirect} from "react-router-dom";

const NewArtist = () => {
    const dispatch = useDispatch();
    const error = useSelector( state => state.artists.createArtistError);
    const user = useSelector(state => state.users.user);

    const [state, setState] = useState({
       title: '',
       description: '',
       image: '',
   });

    if (!user) {
        return <Redirect to="/login"/>
    }

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

        await dispatch(createArtist(formData));
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
                <FormElement
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    required
                    error={getFieldError('title')}
                />
                <FormElement
                    label="Description"
                    onChange={inputChangeHandler}
                    value={state.description}
                    name="description"
                    error={getFieldError('description')}
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

export default NewArtist;