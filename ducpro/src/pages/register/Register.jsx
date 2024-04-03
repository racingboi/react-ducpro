import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (username === '' || password === '' || img === '') {
      toast.error('Vui lòng điền đầy đủ thông tin!', {
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

    setLoading(true);

    try {
      // Kiểm tra xem tài khoản đã tồn tại hay chưa
      const response = await axios.get(`http://localhost:3000/users?username=${username}`);
      if (response.data.length > 0) {
        toast.error('Tài khoản đã tồn tại!', {
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

      // Nếu tài khoản không tồn tại, tiến hành tạo mới
      await axios.post('http://localhost:3000/users', {
        username,
        password,
        img,
        role: '0'
      });

      toast.success('Tạo tài khoản thành công!', {
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
      const user = {
        username,
        password,
        img,
        role: '0'
      }
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      toast.error('Tạo tài khoản không thành công!', {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center text-primary">Registration Form</h2>
        <div className="row justify-content-center">
          <div className="col-md-6 shadow-lg p-4 rounded">
            <form onSubmit={register} method="post">
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
              <div className="form-group">
                <label htmlFor="img">Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="img"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  aria-label="Image URL"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                {loading ? 'Registering...' : 'Register'}
              </button>
              <Link to="/login">đến login</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
