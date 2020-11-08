import React, { useState } from 'react';
import "./AlbumItem.css"
import UpdateDialog from './UpdateDialog';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
export default function AlbumItem(props) {
  const { board } = props;
  const [ open, setOpen ] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return(
  <div>
    <Card className="card">
      <CardContent className="cardContent">
        <Typography gutterBottom variant="h5" component="h2">
          {board.title}
        </Typography>
        <Typography>
          {board.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={'/item/'+board._id} size="small" color="primary">
          View
        </Button>
        <Button onClick={()=>setOpen(true)} size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
    {open && <UpdateDialog item={board} handleClose={handleClose} stt={open} isBoard={1} url={"http://localhost:5000/api/updateBoard/"+board._id}/>}
  </div>
)}
