import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function UpdateDialog(props) {
  const { url, stt, isBoard, handleClose, item } = props;
  const [newBoard, setNewBoard] = useState({field1:"", field2:""});
  let field1Name="", field2Name="";
  if(isBoard){
    field1Name="Title";
    field2Name="Description";
  }else{
    field1Name="Subject";
    field2Name="Content";
  }
  let token=null;
  if(JSON.parse(localStorage.getItem('login'))) token =JSON.parse(localStorage.getItem('login')).token;
  const handleSubmit = async (e)=>{
    try{
      const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newBoard),
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token},
    })
    const data = await response.json();
    console.log(data);
    handleClose();
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog open={stt} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form id="form-data" onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle id="form-dialog-title">Update {isBoard? "Board":"Card"}</DialogTitle>
          <DialogContent>
              <TextField autoFocus fullWidth placeholder={isBoard?item.title:item.subject} margin="dense" name={field1Name} label={field1Name} type="text" onChange={e => setNewBoard({ ...newBoard, field1: e.target.value})} />
              <TextField fullWidth margin="dense" placeholder={isBoard?item.description:item.content} name={field2Name} label={field2Name} type="text" onChange={e => setNewBoard({ ...newBoard, field2: e.target.value})} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button color="primary" type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}