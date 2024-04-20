import React, {  useEffect, useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog, TextField } from "@mui/material";
import axios from 'axios';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Bounce, toast } from "react-toastify";
import { useTheme } from "@emotion/react";
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function AddProducts(props) {
  const [open, setOpen] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [names, setNames] = useState([]);
  const fetchCaterory = () => {
    axios.get('http://localhost:3000/caterory')
      .then((res) => {
        setNames(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        alert(`Error! Failed to fetch products. Please try again later.`);
      });
  }
  useEffect(()=>{
    fetchCaterory();
  },[])
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
   
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
 

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
    img: '',
    caterory_id:''
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
          <div className="py-3">
            <InputLabel id="demo-multiple-name-label">Danh mục</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              sx={{ width: "100%", mt: 2 }}
              multiple
              value={personName}
              onChange={handleChanges}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                 {name.name}
                </MenuItem>
              ))}
            </Select>
         </div>
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
