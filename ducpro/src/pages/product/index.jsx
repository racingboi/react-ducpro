import axios from 'axios';
import { useEffect, useState } from 'react'
import formatPrice from '../../Component/formatPrice/formatPrice';
import {  Container, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { handleToast } from '../../config/ConfigToats';
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
  }, [products]);

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


  const handleAddCart = (id) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return alert("Please login first!");
    const user = JSON.parse(userStr);
    const userId = user.id;

    // Fetch the user's cart to check if the product is already there
    axios.get(`http://localhost:3000/cart?user_id=${userId}`)
      .then(response => {
        const cartItems = response.data;
        console.log(cartItems);
        const productInCart = cartItems.find(item => item.product_id === id);

        if (productInCart) {
          // If the product is already in the cart, increase the quantity
          axios.patch(`http://localhost:3000/cart/${productInCart.id}`, {
            quantity: parseInt(productInCart.quantity) + 1
          })
            .then(response => {
              handleToast('success', 'Thêm sản phẩm thành công');
              console.log('Quantity updated', response.data);
            })
            .catch(err => console.error(err));
        } else {
          // If the product is not in the cart, add it to the cart
          axios.post(`http://localhost:3000/cart`, {
            user_id: userId,
            product_id: id,
            quantity: "1"
          })
            .then(response => {
              handleToast('success', 'Thêm sản phẩm thành công');
              console.log('Product added to cart', response.data);
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  };

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
                <button onClick={() => handleAddCart(product.id)} className="btn btn-primary">Add to Cart</button>
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
