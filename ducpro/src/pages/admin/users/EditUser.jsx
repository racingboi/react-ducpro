import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
export default function EditUser({ userId, onUserUpdated }) {
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState({
    username: '',
    password: '',
    role: '',
    img: '',
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
    axios.get(`http://localhost:3000/users/${userId}`)
      .then((response) => {
        setUserName(response.data); // Cập nhật state với dữ liệu Người dùng
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error('Có lỗi xảy ra khi tải thông tin Người dùng!');
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserName(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/users/${userId}`, username);
      toast.success('Người dùng đã được cập nhật thành công!');
      onUserUpdated();
      handleClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật Người dùng!');
      console.error('Error updating product:', error);
    }
  };
  return (
    <React.Fragment>
      <CustomButton
        variant="outlined"
        onClick={handleClickOpen}
      >
        <EditIcon/>
      </CustomButton>
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
        <DialogTitle>chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            form chỉnh sửa người dùng của bạn!
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
            value={username.username}
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
            value={username.password}
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
            value={username.img}
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
            value={username.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} type="submit">chỉnh sửa người dùng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
