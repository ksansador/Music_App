import React from 'react';
import GoogleLoginButton from "react-google-login";
import {googleClientId} from "../../config";
import {Button} from "@mui/material";
import {Google} from "@mui/icons-material";

const GoogleLogin = () => {
    const googleResponse = response => {
        console.log(response)
    };

    return (
        <GoogleLoginButton
            clientId={googleClientId}
            cookiePolicy={'single_host_origin'}
            onSuccess={googleResponse}
            render={props => (
                <Button
                    fullWidth
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<Google/>}
                    onClick={props.onClick}
                >
                    Enter with Google
                </Button>
            )}
        />

    );
};

export default GoogleLogin;