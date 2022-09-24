import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";

const useStyles = makeStyles()(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    },
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user);

  return (
    <>
     <AppBar position="fixed" sx={{backgroundColor: '#3a3939'}}>
       <ToastContainer />
       <Toolbar>
         <Grid container justifyContent={'space-between'} alignItems={'center'}>
           <Typography variant="h6" style={{display: 'flex', alignItems: 'center'}}>
             <LibraryMusicIcon style={{marginRight: '10px'}}/>
             <Link to="/" className={classes.mainLink}>
               Music App
             </Link>
           </Typography>

           <Grid item>
             {user ? <UserMenu user={user}/> : <Anonymous/>}
           </Grid>

         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;