import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableCart from "../../Component/cart/TableCart";
import { handleToast } from "../../config/ConfigToats";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function Cart() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [enrichedCart, setEnrichedCart] = useState([]);
  let userId;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.id) {
    userId = user.id;
  } else {
    userId = null;
  }

  useEffect(() => {
    if (userId) {
      fetchAllCart()
    } else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (carts && carts.length > 0) {
      Promise.all(carts.map(cart =>
        axios.get(`http://localhost:3000/products/${cart.product_id}`)
          .then(res => ({ ...cart, productDetails: res.data }))
      ))
        .then(enrichedCarts => {
          setEnrichedCart(enrichedCarts); 
        })
        .catch(error => console.log(error));
    } else {
      setEnrichedCart([]);
    }
  }, [carts]);
  const fetchAllCart = () => {
    axios.get(`http://localhost:3000/cart`)
      .then((res) => {
        setCarts(res.data)
        console.log(res.data);
      })
      .catch((err) => { console.log(err); });
  }
  const handleUpdate = (id, sign, quantity) => {
    axios.patch(`http://localhost:3000/cart/${id}`, {
      quantity: sign == '-' ? Number(quantity) - 1 : Number(quantity) + 1
    }).then((response) => {
      fetchAllCart()
      handleToast('success', 'Cart updated successfully');
    });
  }

  const handleUpdateInput = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    axios.patch(`http://localhost:3000/cart/${value.id}`, {
      quantity: value.quantity !== " " ? value.quantity : value.old_quantity
    }).then((response) => {
      fetchAllCart()
      handleToast('success', 'Cart updated successfully');
    });
    
  }
  const handleDetele = (id) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            axios.delete(`http://localhost:3000/cart/${id}`)
              .then((response) => {
                console.log(response.data);
                fetchAllCart();
                handleToast('success', 'Xóa sản phẩm thành công');
              })
              .catch((error) => {
                console.error('Error deleting item:', error);
                handleToast('error', 'Đã xảy ra lỗi khi xóa sản phẩm');
              });
          }
        },
        {
          label: 'Không',
          onClick: () => { }
        }
      ]
    });
  };
  const handleDeleteSP = (ids) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc muốn xóa các sản phẩm này?',
      buttons: [
        {
          label: 'Có',
          onClick: () => {
            for (let i = 0; i < ids.length; i++) {
              axios(`http://localhost:3000/cart/${ids[i]}`, {
                method: 'DELETE'
              })
                .then(() => {
                  fetchAllCart();
                  handleToast('success', 'Xóa sản phẩm thành công');
                })
                .catch(error => {
                  console.error('Error deleting items:', error);
                  handleToast('error', 'Đã xảy ra lỗi khi xóa sản phẩm');
                });
            }
          }
        },
        {
          label: 'Không',
          onClick: () => { }
        }
      ]
    });
  };
  return (
   
    <>
      <TableCart
        data={enrichedCart}
        handleUpdate={handleUpdate}
        handleUpdateInput={handleUpdateInput}
        handleDetele={handleDetele}
        handleDeleteSP={handleDeleteSP}
      />
    </>
  );
}
