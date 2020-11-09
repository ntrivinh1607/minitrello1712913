import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Fab, Paper, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog';
import CardItem from './CardItem';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Cards(props) {
  const [board, setBoard] = useState({wentWell:[], toImprove:[], actionItems:[]});
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const classes = useStyles();
  const { id } = props;

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    async function fetchData(){
      let token=null;
      if(JSON.parse(localStorage.getItem('login'))) token =JSON.parse(localStorage.getItem('login')).token;
      const response = await fetch("http://localhost:5000/api/"+id, {
        method: "GET",
        headers: {'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer '+token},
      });
      const data = await response.json();
      setBoard(data);
    }  fetchData();
  }, []);
  const handleDelete = async (id) =>{
    try{
      let token=null;
      if(JSON.parse(localStorage.getItem('login'))) token =JSON.parse(localStorage.getItem('login')).token;
      const response = await fetch("http://localhost:5000/api/deleteCard/"+id, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token},
      })
      const data = await response.json();
      if(data.success){   
        let changedBoard = JSON.parse(JSON.stringify(board));
        if(changedBoard.wentWell.length) changedBoard.wentWell = changedBoard.wentWell.filter(item => !(item._id === id));
        if(changedBoard.toImprove.length) changedBoard.toImprove = changedBoard.toImprove.filter(item => !(item._id === id));
        if(changedBoard.actionItems.length) changedBoard.actionItems = changedBoard.actionItems.filter(item => !(item._id === id));
        setBoard(changedBoard);
      }
    }catch(e){
      console.log(e);
    }
  }
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>Went well</Typography>
            <Fab color="secondary" aria-label="add" onClick={()=>{setOpen(true); setType(1);}}>
              <AddIcon />
            </Fab>{open && <AddDialog handleClose={handleClose} stt={open} type={type} boardId={id} url="http://localhost:5000/api/addCard/"/>}
            {board.wentWell && board.wentWell.map((card, index) => (
              <Box key={index} bgcolor="info.main" color="info.contrastText" p={1}  my={2}>
                <CardItem card={card} handleDelete={handleDelete} />
            </Box> 
            ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h3" gutterBottom>To improve</Typography>
              <Fab color="secondary" aria-label="add" onClick={()=>{setOpen(true); setType(2);}}>
                <AddIcon />
              </Fab>{open && <AddDialog handleClose={handleClose} stt={open} type={type} boardId={id} url="http://localhost:5000/api/addCard/" />}
              {board.toImprove && board.toImprove.map((card, index) => (
              <Box key={index} bgcolor="info.main" color="info.contrastText" p={1}  my={2}>
                <CardItem card={card} handleDelete={handleDelete} />
              </Box>
            ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h3" gutterBottom>Action Items</Typography>
              <Fab color="secondary" aria-label="add" onClick={()=>{setOpen(true); setType(3);}}>
                <AddIcon />
              </Fab>{open && <AddDialog handleClose={handleClose} stt={open} type={type} boardId={id} url="http://localhost:5000/api/addCard/" />}
              {board.actionItems && board.actionItems.map((card, index) => (
              <Box key={index} bgcolor="info.main" color="info.contrastText" p={1} my={2}>
                <CardItem card={card} handleDelete={handleDelete} />
              </Box>
            ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}