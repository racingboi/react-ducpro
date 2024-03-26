import { useEffect, useState } from "react";
import axios from 'axios';
import AddProducts from "./AddProduct";
import Delete from "./Delete";
import Edit from "./Edit";
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import formatPrice from "../../../Component/formatPrice/formatPrice";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const fetchProducts = () => {
    axios.get('http://localhost:3000/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        alert(`Error! Failed to fetch products. Please try again later.`);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleProductUpdated = () => {
    fetchProducts();
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm)
  );
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5 ">
      <div className="row mb-3">
        <div className="col-md-8">
          <AddProducts onProductAdded={fetchProducts} />
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
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <Link to={`/dashboard/products/${product.id}`}>
                    <img src={product.img} alt={product.name} style={{ height: "50px", width: "auto" }} />
                  </Link>
                </td>
                <td>
                  <Link to={`/dashboard/products/${product.id}`} className="text-decoration-none">
                    {product.name}
                  </Link>
                </td>
                <td>{formatPrice(product.price)}</td>

                <td>{product.description}</td>
                <td>
                  <Edit productId={product.id} onProductUpdated={handleProductUpdated} />
                  <Delete productId={product.id} onProductDelete={handleProductDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <Pagination>
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
     </div>
    </div>
  )
}
