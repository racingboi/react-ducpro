import axios from 'axios';
import { useEffect, useState } from 'react'
import formatPrice from '../../Component/formatPrice/formatPrice';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
  return (
    <Container>
      <h1 className='p-3'>Product List</h1>
      <Row>
        {products.map((product) => (
          <div key={product._id} className="col-4 py-3">
            <div className="card" style={{ width: "20rem" }}>
              <Link to={`/products/${product.id}`}>
                <img src={`${product.img}`} alt={`Image of ${product.name}`} />
              </Link>
              <div className="card-body">
                <Link to={`/products/${product.id}`} className="text-decoration-none card-title ">
                  <h5 className="card-title">{product.name}</h5>
                </Link>
                <p className="card-text">Price: {formatPrice(product.price)}<br />{product.description}</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  )
}
