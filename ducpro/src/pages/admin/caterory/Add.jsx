
import React, { useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog, TextField } from "@mui/material";
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
function Add({ onCateroryAdded }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [caterory, setCaterory] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caterory) {
      toast.error('Vui lòng điền tất cả các trường!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    axios.post('http://localhost:3000/caterory', {
      name:caterory
    } )
      .then((response) => {
        onCateroryAdded();
        toast.success('Thêm danh mục thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    // thêm sản phẩm
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm sản phẩm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          sx: { width: '100%' },
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Thêm danh mục</DialogTitle>
        <DialogContent>
          <DialogContentText>
            form thêm danh mục của bạn!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            value={caterory}
            onChange={(e)=>setCaterory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} type="submit">Thêm sản phẩm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Add
