import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function menuAvatar(props) {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const menusAvatar = 
  [
    { text: 'Profile', click: handleClose },
    { text: 'My Account', click: handleClose },
  ]

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar className={classes.avatar} alt="Remy Sharp" src={props.avatar} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {
          menusAvatar.map((m, index) => 
            <MenuItem key={index} onClick={m.click}>{m.text}</MenuItem>
          )
        }
      </Menu>
    </>
  );
}

export default menuAvatar;