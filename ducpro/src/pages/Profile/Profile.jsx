import { Container, Typography, Box, Avatar, Paper, Button, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Dialog } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
function Profile() {
  // Giả sử bạn đã lấy thông tin người dùng từ localStorage hoặc Context/Redux Store
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');
  // setUsername();
  const handlEdit = async () => {
    const response = await axios.put(`http://localhost:3000/users/${user.id}`, {
      username,
      img,
      password,
    });
    console.log(response.data);
  }
  const handleNameChange = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleImgChange = (event) => {
    setImg(event.target.value);
  }
  const handleDelete = () => {
    if (!window.confirm('Bạn có chắc muốn xóa?')) return;
        axios.delete(`http://localhost:3000/users/${user.id}`)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt="User Avatar"
            src={user.img || 'https://via.placeholder.com/150'}
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <Typography variant="h5" sx={{py:3}}>{user.username || 'Guest'}</Typography>

          <Button variant="outlined" onClick={handleClickOpen}>
            Edit user
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              sx: { width: '100%' },
              onSubmit: (event) => {
                event.preventDefault();
                // const formData = new FormData(event.currentTarget);
                // const formJson = Object.fromEntries(formData.entries());
                // const email = formJson.email;
                // console.log(email);
                handleClose();
              },
            }}
          >
            <DialogTitle>Edit user</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Cập nhật  thông tin người dùng của bạn!
              </DialogContentText>
              <TextField
                autoFocus
                // required
                margin="dense"
                id="Username"
                name="Username"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                value={username}
                onChange={handleNameChange}
              />
              <TextField
                autoFocus
                // required
                margin="dense"
                id="avata"
                name="avata"
                label="avata (url)"
                type="text"
                fullWidth
                variant="standard"
                value={img}
                onChange={handleImgChange}
              />
              <TextField
                autoFocus
                // required
                margin="dense"
                id="Password"
                name="Password"
                label="Password"
                type="text"
                fullWidth
                variant="standard"
                value={password}
                onChange={handlePasswordChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={handlEdit} type="submit">Sửa</Button>
            </DialogActions>
          </Dialog>

          <Button sx={{my : 3}} variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;
