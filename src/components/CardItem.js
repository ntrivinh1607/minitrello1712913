import React, { useState } from 'react';
import "./CardItem.css"
import UpdateDialog from './UpdateDialog';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
export default function CardItem(props) {
  const { card, handleDelete } = props;
  const [ open, setOpen ] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDelete = () =>{
    handleDelete(card._id);
  }
  return(              
  <Card className="pos">
    <CardContent>
      <Typography className="title" gutterBottom>
        {card.subject}
      </Typography>
      <Typography className="pos" color="textSecondary">
        {card.content}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={()=>setOpen(true)}size="small">Edit</Button>
      <Button onClick={handleClickDelete}>Delete</Button>
    </CardActions>
    {open && <UpdateDialog item={card} handleClose={handleClose} stt={open} isBoard={0} url={"http://localhost:5000/api/updateCard/"+card._id}/>}
  </Card>
)}