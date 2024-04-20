import React, { useState } from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
function Edit({ cateroryId, onCateroryUpdated }) {
  const [open, setOpen] = useState(false);
  const [caterory, setsetCaterory] = useState('');
  const CustomButton = styled(Button)({
    backgroundColor: 'blue',
    color: 'white',
    margin: '10px',
    '&:hover': {
      backgroundColor: 'darkblue',
    },
  });
  const handleClickOpen = () => {
    axios.get(`http://localhost:3000/caterory/${cateroryId}`)
      .then((response) => {
        setsetCaterory(response.data); // Cập nhật state với dữ liệu sản phẩm
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error('Có lỗi xảy ra khi tải thông tin danh mục!');
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu sản phẩm đã chỉnh sửa tới server qua API
      const response = await axios.put(`http://localhost:3000/caterory/${cateroryId}`, {
        name: caterory,
      });
      toast.success('danh mục đã được cập nhật thành công!');
      onCateroryUpdated(); // Gọi callback để cập nhật UI nếu cần
      handleClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật danh mục!');
      console.error('Error updating product:', error);
    }
  };

  return (
    <React.Fragment>
      <CustomButton
        variant="outlined"
        onClick={handleClickOpen}
      >
        <EditIcon />
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
              value={caterory.name}
              onChange={(e) => setsetCaterory(e.target.value)}
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

export default Edit
