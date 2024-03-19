import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
export default function Edit({ productId, onProductUpdated }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    img:'',
  });
  const CustomButton = styled(Button)({
    backgroundColor: 'blue',
    color: 'white',
    margin: '10px',
    '&:hover': {
      backgroundColor: 'darkblue',
    },
  });
  const handleClickOpen = () => {
    axios.get(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        setProduct(response.data); // Cập nhật state với dữ liệu sản phẩm
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error('Có lỗi xảy ra khi tải thông tin sản phẩm!');
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu sản phẩm đã chỉnh sửa tới server qua API
      const response = await axios.put(`http://localhost:3000/products/${productId}`, product);
      toast.success('Sản phẩm đã được cập nhật thành công!');
      onProductUpdated(); // Gọi callback để cập nhật UI nếu cần
      handleClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
      console.error('Error updating product:', error);
    }
  };

  return (
    <React.Fragment>
      <CustomButton
        variant="outlined"
        onClick={handleClickOpen}
      >
        Chỉnh Sửa
      </CustomButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Chỉnh Sửa Sản Phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vui lòng chỉnh sửa thông tin sản phẩm dưới đây!
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Tên"
              type="text"
              fullWidth
              variant="standard"
              value={product.name}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="Giá"
              type="text"
              fullWidth
              variant="standard"
              value={product.price}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="description"
              name="description"
              label="Mô tả"
              type="text"
              fullWidth
              variant="standard"
              value={product.description}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="img"
              name="img"
              label="Mô tả"
              type="text"
              fullWidth
              variant="standard"
              value={product.img}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit">Cập Nhật</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
