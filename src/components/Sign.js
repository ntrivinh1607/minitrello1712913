import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Sign.css'; 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Sign(props) {
  const {isLogin} = props;
  const [user, setUser] = useState({username: "", password: ""});
  const [isRedirect, setIsRedirect] = useState(false);
  let url = "";
  isLogin ? url="signin" : url="signup";
  const handleSubmit = async (e)=>{
    try{
      e.preventDefault();
      await fetch("http://localhost:5000/api/"+url, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user),
      }).then(response => response.json()).then(data=>{
        if(data.success){
          localStorage.setItem('login', JSON.stringify({
          login:true,
          token:data.token,
          username:data.username,
        }));
          setIsRedirect(true);
        }
        else {
          alert("Please try again");
        }
      })
    }catch(e){
      alert(e);
    }
  };
  return (
    <div>
    { (isRedirect === true) ? (<Redirect to='/' />) :
    (<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Sign in' : 'Sign up'}
        </Typography>
        <form method="form" id="form-data" className="form" onSubmit={handleSubmit} autoComplete="off">
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" 
            onChange={e => setUser({ ...user, username: e.target.value})} value={user.username} autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
            onChange={e => setUser({ ...user, password: e.target.value})} value={user.password} autoComplete="current-password" />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          {isLogin && <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>}
          {!isLogin && <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Have an account already? Sign In"}
              </Link>
            </Grid>
          </Grid>}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>)
  }
  </div>
  );
}