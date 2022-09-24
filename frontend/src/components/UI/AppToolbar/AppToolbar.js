import React from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useSelector} from "react-redux";

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
       <Toolbar>
         <Grid container justifyContent={'space-between'} alignItems={'center'}>
           <Typography variant="h6" style={{display: 'flex', alignItems: 'center'}}>
             <LibraryMusicIcon style={{marginRight: '10px'}}/>
             <Link to="/" className={classes.mainLink}>
               Music App
             </Link>
           </Typography>

           {/*<Grid item>*/}
           {/*  {user ? <UserMenu user={user}/> : <Anonymous/>}*/}
           {/*</Grid>*/}

           <Button component={Link} to={'/register'} color={"inherit"}>
             Sign up
           </Button>
         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;