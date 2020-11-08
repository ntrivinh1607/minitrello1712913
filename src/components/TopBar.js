import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './TopBar.css'; 

export default function TopBar(props) {
  let username=null;
  if(props.username!==undefined)
  {
    username = props.username;
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {username===null && <Button href="/signin" color="inherit">Login</Button>}
          {username && <Typography variant="h6" className="title" color="inherit">Hello {username}<Button href="/signout">Logout</Button></Typography>}
        </Toolbar>
      </AppBar>
    </div>
  );
}