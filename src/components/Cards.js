import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Grid, Typography, Fab, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog';
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
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
      const response = await fetch("http://localhost:5000/api/"+id);
      const data = await response.json()
      setBoard(data);
    }  fetchData();
  }, []);
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>Went well</Typography>
            <Fab color="secondary" aria-label="add" onClick={()=>{setOpen(true); setType(1);}}>
              <AddIcon />
            </Fab>{open && <AddDialog handleClose={handleClose} stt={open} type={type} boardId={id}/>}
            {board.wentWell.map((card, index) => (
              <Card className={classes.pos}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {card.subject}
                  </Typography>
                  <Typography variant="h5" component="h2">
                  
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h3" gutterBottom>To improve</Typography>
              <Fab color="secondary" aria-label="add" onClick={()=>{setOpen(true); setType(2);}}>
                <AddIcon />
              </Fab>{open && <AddDialog handleClose={handleClose} stt={open} type={type} boardId={id}/>}
              {board.toImprove.map((card, index) => (
              <Card className={classes.pos}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {card.subject}
                  </Typography>
                  <Typography variant="h5" component="h2">
                  
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h3" gutterBottom>Action Items</Typography>
              <Fab color="secondary" aria-label="add" onClick={()=>{setOpen(true); setType(3);}}>
                <AddIcon />
              </Fab>{open && <AddDialog handleClose={handleClose} stt={open} type={type} boardId={id}/>}
              {board.actionItems.map((card, index) => (
              <Card className={classes.pos}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {card.subject}
                  </Typography>
                  <Typography variant="h5" component="h2">
                  
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}