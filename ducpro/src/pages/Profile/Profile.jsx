import { Container, Typography, Box, Avatar, Paper } from '@mui/material';
function Profile() {
  // Giả sử bạn đã lấy thông tin người dùng từ localStorage hoặc Context/Redux Store
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt="User Avatar"
            src={user.img || 'https://via.placeholder.com/150'}
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <Typography variant="h5">{user.username || 'Guest'}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;
