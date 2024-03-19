import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  // lấy id trên url
  const [product, setProduct] = useState(null);
  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  useEffect(() => {
    fetchProduct(id);
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img src={product.img} alt={product.name} className="img-fluid" />
              <h2 className="card-title">{product.name}</h2>
            </div>
            <div className="col-md-6">
              <p className="card-text">Price: ${product.price}</p>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
