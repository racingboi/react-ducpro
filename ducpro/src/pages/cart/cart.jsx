import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableCart from "../../Component/cart/TableCart";
import { handleToast } from "../../config/ConfigToats";

export default function Cart() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [enrichedCart, setEnrichedCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.id) {
      fetchAllCart()
    } else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    // Ensure carts is not undefined and has items
    if (carts && carts.length > 0) {
      Promise.all(carts.map(cart =>
        axios.get(`http://localhost:3000/products/${cart.product_id}`)
          .then(res => ({ ...cart, productDetails: res.data }))
      ))
        .then(enrichedCarts => {
          setEnrichedCart(enrichedCarts); // Assuming setEnrichedCart updates state with the enriched cart items
        })
        .catch(error => console.log(error));
    } else { 
      setEnrichedCart([]); // Assuming setEnrichedCart
    }
  }, [carts]); // Assuming carts is the correct dependency
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
  } // AssumingichedCart);

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
    axios.delete(`http://localhost:3000/cart/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchAllCart()
        handleToast('success', 'Cart delete successfully');
    });
  }
  return (
    <>
      <TableCart data={enrichedCart} handleUpdate={handleUpdate} handleUpdateInput={handleUpdateInput} handleDetele={handleDetele} />
    </>
  );
}
