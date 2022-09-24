import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Anonymous = () => {
  return (
    <>
      <Button component={Link} to="/register" color="inherit">
        Sign Up
      </Button>
      <Button component={Link} to="/login" color="inherit">
        Sign In
      </Button>
    </>
  );
};

export default Anonymous;