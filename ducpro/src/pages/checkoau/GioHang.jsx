import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../Component/formatPrice/formatPrice";
import { Avatar } from '@mui/material';
export default function GioHang() {
  const [carts, setCarts] = useState([]);
  const [enrichedCart, setEnrichedCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchAllCart();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (carts && carts.length > 0) {
      Promise.all(
        carts.map((cart) =>
          axios
            .get(`http://localhost:3000/products/${cart.product_id}`)
            .then((res) => ({ ...cart, productDetails: res.data }))
        )
      )
        .then((enrichedCarts) => {
          setEnrichedCart(enrichedCarts);
        })
    } else {
      setEnrichedCart([]);
    }
  }, [enrichedCart,carts]);

  const fetchAllCart = () => {
    axios
      .get(`http://localhost:3000/cart`)
      .then((res) => {
        setCarts(res.data);
      })
  };
  const totalPrice = enrichedCart.reduce((total, item) => total + item.quantity * item.productDetails.price, 0);
  return (
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Giỏ hàng</span>
        <span className="badge badge-secondary badge-pill">2</span>
      </h4>
      <ul className="list-group mb-3">
        {enrichedCart.map((cart, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div className="d-flex align-items-center">
              <div className="mr-3">
                <Avatar src={cart.productDetails.img} alt="" />
              </div>
              <div className="mx-3">
                <h6 className="mb-1">{cart.productDetails.name}</h6>
                <small className="text-muted">
                  {formatPrice(cart.productDetails.price)} x {cart.quantity}
                </small>
              </div>
            </div>

            <span className="text-muted">{formatPrice(cart.productDetails.price*cart.quantity)}</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between">
          <span>Tổng thành tiền</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </li>
      </ul>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="Mã khuyến mãi" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-secondary">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
