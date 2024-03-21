import React, {  useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog, TextField } from "@mui/material";
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
export default function AddProducts(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    img:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.description || !product.img) {
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
    axios.post('http://localhost:3000/products', product)
      .then((response) => {
        props.onProductAdded(); 
        toast.success('Thêm sản phẩm thành công!', {
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
        setProduct({ name: '', price: '', description: '' ,img: ''});
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
        <DialogTitle>Thêm sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            form thêm sản phẩm của bạn!
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
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="price"
            type="text"
            fullWidth
            variant="standard"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
            value={product.description}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} type="submit">Thêm sản phẩm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
