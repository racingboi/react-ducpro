import axios from "axios";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import { Pagination } from "react-bootstrap";
// import { Link } from "react-router-dom";

export default function User() {
  const [username, setUserName] = useState([]);
  const fetchUser = () => {
    axios.get('http://localhost:3000/users')
      .then((res) => {
        setUserName(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        alert(`Error! Failed to fetch users. Please try again later.`);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleUserDelete = (userId) => {
    const updatedUser = username.filter(username => username.id !== userId);
    setUserName(updatedUser);
  };
  const handleUserUpdated = () => {
    fetchUser();
  };
  // tim kiem
  const [searchTerm, setSearchTerm] = useState("");
  const filtereduser = username.filter(username =>
    username.username.toLowerCase().includes(searchTerm.toLowerCase()));
  // username.role.toLowerCase().includes(searchTerm.toLowerCase()));
  // phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const PerPage = 5;
  const indexOfLastuser = currentPage * PerPage;
  const indexOfFirstUser = indexOfLastuser - PerPage;
  const currentPageUsers = filtereduser.slice(indexOfFirstUser, indexOfLastuser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5 ">
      <div className="row mb-3">
        <div className="col-md-8">
          <AddUser onUsered={fetchUser} />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="container">
        <table className="table text-center table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>vai trò</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageUsers.map(username => (
              <tr key={username.id}>
                <td>
                  <img src={username.img} alt={username.name} style={{ height: "50px", width: "auto" }} />
                </td>
                <td>
                  {username.username}
                </td>
                <td>{username.role === '1' ? 'Admin' : 'User'}</td>
                <td>
                  <EditUser userId={username.id} onUserUpdated={handleUserUpdated} />
                  <DeleteUser userId={username.id} onUserDelete={handleUserDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <Pagination>
          {Array.from({ length: Math.ceil(filtereduser.length / PerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  )
}
