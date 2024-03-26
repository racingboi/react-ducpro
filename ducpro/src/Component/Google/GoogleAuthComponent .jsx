import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const clientId = "786382295058-up1fmd3of0ri6u26962h5j1chbc4hmur.apps.googleusercontent.com";
const GoogleAuthComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
    const handleLoginSuccess = async (res) => {
      try {
        const username = res.profileObj.name;
        const imageUrl = res.profileObj.imageUrl;

        // Check if user already exists
        const existingUserResponse = await axios.get(`http://localhost:3000/users?username=${username}`);

        if (existingUserResponse.data.length > 0) {
          // User already exists
          setIsLoggedIn(true);
          toast.success(`Welcome back, ${username}!`);
          navigate('/');
        } else {
          // User doesn't exist, register them
          const newUserResponse = await axios.post('http://localhost:3000/users', {
            username: username,
            img: imageUrl,
            role: '0'
          });
          console.log('User registration success:', newUserResponse);
          toast.success(`Đăng ký thành công ${username}`);
          setIsLoggedIn(true);
          navigate('/');
        }

        // Store user data in local storage
        const user = { username, img: imageUrl, role: '0' };
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        // Display error toast notification if an error occurred
        toast.error('Đã xảy ra lỗi trong quá trình xác thực');
        console.error("Error during authentication:", error.message);
      }
    };
    const handleLogout = () => {
      console.log('Logged out');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
  };
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You are logged in!</p>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
          />
        </div>
      ) : (
        <div id="signInButton">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={handleLoginSuccess}
            onFailure={(error) => console.error("Login Failure:", error)}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </div>
      )}
    </div>
  );
};

export default GoogleAuthComponent;
