import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
import Edit from "./Edit";
import Delete from "./Delete";
import Add from './Add';
function Caterory() {
  const [caterory, setCaterory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const CateroryPerPage = 5;

  const fetchCaterory = () => {
    axios.get('http://localhost:3000/caterory')
      .then((res) => {
        setCaterory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        alert(`Error! Failed to fetch products. Please try again later.`);
      });
  };

  useEffect(() => {
    fetchCaterory();
  }, []);

  const handleCateroryDelete = (cateroryId) => {
    const updatesetCaterory = caterory.filter(caterory => caterory.id !== cateroryId);
    setCaterory(updatesetCaterory);
  };

  const handleUpdated = () => {
    fetchCaterory();
  };

  const indexOfLastProduct = currentPage * CateroryPerPage;
  const indexOfFirstProduct = indexOfLastProduct - CateroryPerPage;
  const filteredProducts = caterory.filter(caterory =>
    caterory.name.toLowerCase().includes(searchTerm.toLowerCase()) );
  const currentCaterory = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5 ">
      <div className="row mb-3">
        <div className="col-md-8">
          <Add onCateroryAdded={fetchCaterory} />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
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
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCaterory.map(caterory => (
              <tr key={caterory.id}>
                <td>
                  <Link to={`/dashboard/caterory/${caterory.id}`} className="text-decoration-none">
                    {caterory.name}
                  </Link>
                </td>
                <td>
                  <Edit cateroryId={caterory.id} onCateroryUpdated={handleUpdated} />
                  <Delete cateroryId={caterory.id} onCateroryDelete={handleCateroryDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <Pagination>
          {Array.from({ length: Math.ceil(filteredProducts.length / currentCaterory) }, (_, i) => (
            <Pagination.Item key={i + 1} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  )
}

export default Caterory
