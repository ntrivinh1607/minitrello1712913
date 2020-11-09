import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Grid, Typography, Container, Link, Fab } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog';
import "./Album.css";
import AlbumItem from './AlbumItem';

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

export default function Album() {
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    async function fetchData(){
      try{
        let token=null;
        if(JSON.parse(localStorage.getItem('login'))) token =JSON.parse(localStorage.getItem('login')).token;
        const response = await fetch("http://localhost:5000/api", {
          method: "GET",
          headers: {'Content-Type':'application/json', 'Authorization': 'Bearer '+token},
        });
        const data = await response.json();
        console.log(data);
        if(data.length) setBoards(data);
      }
      catch(e){
        console.log(e);
      }
    }  fetchData();
  }, []);
  const handleDelete = async (id) =>{
    try{
      let token=null;
      if(JSON.parse(localStorage.getItem('login'))) token =JSON.parse(localStorage.getItem('login')).token;
      const response = await fetch("http://localhost:5000/api/deleteBoard/"+id, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token},
      })
      const data = await response.json();
      if(data.success){   
        let changedBoards = JSON.parse(JSON.stringify(boards));
        changedBoards = changedBoards.filter(item => !(item._id === id));
        setBoards(changedBoards);
      }
    }catch(e){
      console.log(e);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className="heroContent">
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
          </Container>
        </div>
        <Container className="cardGrid" maxWidth="md">
          {/* End hero unit */}
          <div><Typography component={'span'}>
              <Box fontSize={30} m={1}>
                Add a new table
                <Fab color="secondary" aria-label="add" className="margin" onClick={handleClickOpen}>
                  <AddIcon />
                </Fab>
              </Box>
            </Typography>
            <h1 style={{textAlign: 'right'}}>List table</h1>
          </div>   
          <Grid container spacing={4}>
            {boards.map((board, index) =>
              <Grid item key={index} xs={12} sm={6} md={4}> 
                <AlbumItem board={board} handleDelete={handleDelete}/>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
      {open && <AddDialog handleClose={handleClose} stt={open} type={0} boardId="" url="http://localhost:5000/api/addBoard/"/>}
    </React.Fragment>
  );
}