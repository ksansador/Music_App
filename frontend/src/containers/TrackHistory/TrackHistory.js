import React from 'react';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const TrackHistory = () => {
    const user = useSelector(state => state.users.user);

    if (!user) {
        return <Redirect to="/login"/>
    }

    return (
        <div>
            track_history
        </div>
    );
};

export default TrackHistory;