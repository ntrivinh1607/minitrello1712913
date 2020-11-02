import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddDialog(props) {
  const { stt, type, boardId, handleClose } = props;
  const [newBoard, setNewBoard] = useState({field1:"", field2:"", type:type});
  console.log(type);
  let field1Name="", field2Name="", url="";
  if(boardId!==0)      // if it's true -> add a new card
  {
    field1Name="Subject";
    field2Name="Content";
    url="addCard/"+boardId;
  }
  else{
    field1Name="Title";
    field2Name="Description";
    url="addBoard";
  }
  const handleSubmit = async (e)=>{
    await fetch("http://localhost:5000/api/"+url, {
      method: "POST",
      body: JSON.stringify(newBoard),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
    handleClose();
  };

  return (
    <div>
      <Dialog open={stt} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form id="form-data" onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle id="form-dialog-title">Add new</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter infomations
            </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name={field1Name}
                label={field1Name}
                type="text"
                onChange={e => setNewBoard({ ...newBoard, field1: e.target.value})}
                fullWidth
              />
              <TextField
                margin="dense"
                name={field2Name}
                label={field2Name}
                type="text"
                onChange={e => setNewBoard({ ...newBoard, field2: e.target.value})}
                fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button color="primary" type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}