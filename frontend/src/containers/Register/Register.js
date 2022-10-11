import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {Avatar, Container, Grid, Link, Typography} from "@mui/material";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {LockOutlined} from "@mui/icons-material";
import {makeStyles} from "tss-react/mui";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";
import FileInput from "../../components/UI/Form/FileInput/FileInput";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    }
}));

const Register = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
        avatarImage: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        };
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setUser(prevState => ({...prevState, [name]: file}));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign up
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        required={true}
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                        error={getFieldError('email')}
                    />

                    <FormElement
                        required={true}
                        label="Display Name"
                        name="displayName"
                        value={user.displayName}
                        onChange={inputChangeHandler}
                        error={getFieldError('displayName')}
                    />

                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                    />

                    <Grid item>
                        <FileInput
                            label="Avatar"
                            name="avatarImage"
                            onChange={fileChangeHandler}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </ButtonWithProgress>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;