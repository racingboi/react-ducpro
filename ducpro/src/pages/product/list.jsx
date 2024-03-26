import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatPrice from "../../Component/formatPrice/formatPrice";
import "./style.css";
export default function List() {
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
    <div className="container">
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">

              <div className="preview-pic tab-content">
                <div className="tab-pane active" id="pic-1"><img src={product.img} /></div>
                <div className="tab-pane" id="pic-2"><img src={product.img} /></div>
                <div className="tab-pane" id="pic-3"><img src={product.img} /></div>
                <div className="tab-pane" id="pic-4"><img src={product.img} /></div>
                <div className="tab-pane" id="pic-5"><img src={product.img} /></div>
              </div>
              <ul className="preview-thumbnail nav nav-tabs">
                <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={product.img} /></a></li>
                <li><a data-target="#pic-2" data-toggle="tab"><img src={product.img} /></a></li>
                <li><a data-target="#pic-3" data-toggle="tab"><img src={product.img} /></a></li>
                <li><a data-target="#pic-4" data-toggle="tab"><img src={product.img} /></a></li>
                <li><a data-target="#pic-5" data-toggle="tab"><img src={product.img} /></a></li>
              </ul>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title"> {product.name}</h3>
              <div className="rating">
                <div className="stars">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
                <span className="review-no">41 reviews</span>
              </div>
              <p className="product-description">{product.description}</p>
              <h4 className="price">GIÁ HIỆN TẠI: <span>{formatPrice(product.price)}</span></h4>
              <p className="vote"><strong>91%</strong> người mua thích sản phẩm này!<strong>(87 phiếu)</strong></p>
              <h5 className="sizes">sizes:
                <span className="size" data-toggle="tooltip" title="small">s</span>
                <span className="size" data-toggle="tooltip" title="medium">m</span>
                <span className="size" data-toggle="tooltip" title="large">l</span>
                <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
              </h5>
              <h5 className="colors">colors:
                <span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                <span className="color green"></span>
                <span className="color blue"></span>
              </h5>
              <div className="action">
                <button className="add-to-cart btn btn-default" type="button">add to cart</button>
                <button className="like btn btn-default mx-3" type="button">
                  <span className="fa fa-heart"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
