import axios from 'axios';
import { useEffect, useState } from 'react'
import formatPrice from '../../Component/formatPrice/formatPrice';
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
export default function Index() {
  const [products, setProducts] = useState([]);
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

  const [searchTerm, setSearchTerm] = useState("");
  const filtereduser = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const PerPage = 6;
  const indexOfLastuser = currentPage * PerPage;
  const indexOfFirstUser = indexOfLastuser - PerPage;
  const currentPageUsers = filtereduser.slice(indexOfFirstUser, indexOfLastuser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handladdCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    if (!user) return alert("Please login first!");
    axios.post(`http://localhost:3000/cart`, {
      "user_id": userId,
      "product_id": id,
      "quantity":"1"
    }).then((response) => {
    }).catch((err) => {
      console.log(err);
    });
      
  }
  return (
    <Container>
      <h1 className='p-3'>Product List</h1>
      <input
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
      />
      <Grid container>
        {currentPageUsers.map((product) => (
          <Grid item xs={12} sm={6} md={4} spacing={1} key={product._id}>
            <div className="card" style={{ width: "20rem" }}>
              <Link to={`/products/${product.id}`}>
                <img src={`${product.img}`} alt={`Image of ${product.name}`} />
              </Link>
              <div className="card-body">
                <Link to={`/products/${product.id}`} className="text-decoration-none card-title ">
                  <h5 className="card-title">{product.name}</h5>
                </Link>
                <p className="card-text">Price: {formatPrice(product.price)}<br />{product.description}</p>
                <button onClick={()=>handladdCart(product.id)} className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <div className='d-flex justify-content-center'>
        <Pagination>
          {Array.from({ length: Math.ceil(filtereduser.length / PerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  )
}
