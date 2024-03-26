import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const clientId = "786382295058-up1fmd3of0ri6u26962h5j1chbc4hmur.apps.googleusercontent.com";

function LoginGoogle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [img, setImg] = useState('');

  const onSuccess = async (res) => {
    setIsLoggedIn(true);
    try {
      // Send user data to backend for registration
      const response = await axios.post('http://localhost:3000/users', {
        username: res.profileObj.name,
        img: res.profileObj.imageUrl,
        role: '0'
      });
        toast.success('Đăng nhập thành công ' + res.profileObj.name);
        const user = {
          username: res.profileObj.name,
          img: res.profileObj.imageUrl,
          role: '0'
        };
        localStorage.setItem('user', JSON.stringify(user));
        // Redirect to home page
        navigate('/');
      
    } catch (error) {
      // Display error toast notification if an error occurred
      toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
      console.error("Error during login:", error.message);
    }
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED!", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginGoogle;
