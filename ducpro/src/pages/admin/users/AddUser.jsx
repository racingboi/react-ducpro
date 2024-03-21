import React, { useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog, TextField } from "@mui/material";
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
export default function AddUser(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [product, setProduct] = useState({
    username: '',
    password: '',
    img: '',
    role: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.username || !product.password || !product.img || !product.role) {
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
    axios.post('http://localhost:3000/users', product)
      .then((response) => {
        props.onUsered();
        toast.success('Thêm người dùng thành công!', {
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
        setProduct({ username: '', password: '', role: '', img: '' });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    // thêm sản phẩm
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm người dùng
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
        <DialogTitle>Thêm thêm người dùng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            form thêm thêm người dùng của bạn!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="username"
            type="text"
            fullWidth
            variant="standard"
            value={product.username}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="password"
            type="text"
            fullWidth
            variant="standard"
            value={product.password}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="img"
            name="img"
            label="img"
            type="text"
            fullWidth
            variant="standard"
            value={product.img}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="role"
            name="role"
            label="role"
            type="text"
            fullWidth
            variant="standard"
            value={product.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} type="submit">Thêm người dùng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
