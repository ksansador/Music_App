import * as React from "react";
import {useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import {Avatar} from "@mui/material";
import imageNotAvailable from "../../../../assets/no-photo.png";
import {apiUrl} from "../../../../config";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    let avatar = imageNotAvailable;

    if (user.avatarImage) {
        avatar = apiUrl + '/' + user.avatarImage;
    }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <div style={{ display: 'flex'}}>
            <Avatar
                src={`${avatar}?w=248&fit=crop&auto=format`}
                alt={user.email}
                // sx={{ width: 90,height: 90}}
            />
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Hello, {user.displayName}!
            </Button>
        </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          {user?.role === 'admin' &&
              <MenuItem onClick={handleClose}>
                  <Link to={'/requests'} style={{color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                          color: 'inherit'
                      }}}>
                      Requests
                  </Link>
              </MenuItem>
          }
          {user?.role === 'user' &&
              <MenuItem onClick={handleClose}>
                  <Link to={'/requests'} style={{color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                          color: 'inherit'
                      }}}>
                      My Requests
                  </Link>
              </MenuItem>
          }
        <MenuItem onClick={handleClose}>
            <Link to={'/track_history'} style={{color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                    color: 'inherit'
                }}}>
                History
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to={'/artists/new'} style={{color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                    color: 'inherit'
                }}}>
                New artist
            </Link>
        </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={'/albums/new'} style={{color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                    color: 'inherit'
                }}}>
                New albums
            </Link>
        </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={'/tracks/new'} style={{color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                    color: 'inherit'
                }}}>
                New track
            </Link>
        </MenuItem>

        <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
