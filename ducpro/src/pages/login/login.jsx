import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { gapi } from 'gapi-script';
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    event.preventDefault();
    if (username==='' || password==='') {
      toast.error('Vui lòng Nhập đầy đủ thông tin', {
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
    const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
        toast.success('Đăng nhập thành công!', {
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
        if (user.role === "1") {
          console.log("User is an admin.");
          navigate('/dashboard');
  
        } else if (user.role === "0") {
          navigate('/');
        console.log("User is a regular user.");
      }
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!', {
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
      }
  };

  const clientId = "786382295058-up1fmd3of0ri6u26962h5j1chbc4hmur.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client: auth2', start);
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Login Form</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 shadow-lg p-4 rounded">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </div>
            {/* <LoginGoogle />
            <LogoutGoogle/> */}
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Login
            </button>
            <Link to="/register">Dến đăng ký</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
