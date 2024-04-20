import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { handleToast } from '../../config/ConfigToats';
import { Avatar, Badge, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import formatPrice from '../formatPrice/formatPrice';
export default function Cast() {
  const [state, setState] = React.useState({
    right: false,
  });
  const [carts, setCarts] = React.useState([]);
  const [enrichedCart, setEnrichedCart] = React.useState([]);
  let userId;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.id) {
    userId = user.id;
  } else {
    userId = null; // hoặc giá trị mặc định tùy thuộc vào trường hợp của bạn
  }
  const navigate = useNavigate();
  React.useEffect(() => { 
    fetchAllCart();
  }, [enrichedCart])
  React.useEffect(() => {
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
      })
      .catch((err) => { console.log(err); });
  }
  const totalPrice = enrichedCart.reduce((total, item) => total + item.quantity * item.productDetails.price, 0);
  const handleDelete = (id) => {
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
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleNavigate = () => { 
    navigate('/cart');
  }
  const handleNavigateTT = () => { 
    navigate('/checkoau');
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, margin: '8px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ maxWidth: '400px', margin: 'auto' }}>
        {enrichedCart.map((cart, index) => (
          <ListItem key={index} style={{ marginBottom: '10px', borderRadius: '5px' }}>
            <ListItemText>
              <Avatar src={cart.productDetails.img} alt="" />
            </ListItemText>
            <ListItemText>
              {cart.productDetails.name}
            </ListItemText>
            <ListItemText>x {cart.quantity}</ListItemText>
            <Button onClick={() => handleDelete(cart.id)}>
              <ClearIcon />
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List style={{ margin: '8px' }}>
        <ListItem>
          <ListItemText>
            Total Price: 
          </ListItemText>
        <ListItemText>
          {formatPrice(totalPrice)}
        </ListItemText>
        </ListItem>
        <ListItem>
          <Button onClick={handleNavigate}>cart</Button>
          <Button onClick={handleNavigateTT}>Thanh Toán</Button>
        </ListItem>
      </List>
    </Box>
  );  
  const [count, setCount] = React.useState('');
  function getCartItemCount(userId) {
    axios.get(`http://localhost:3000/cart?user_id=${userId}`)
      .then((response) => {
        setCount(response.data.length);
      })
      .catch((error) => console.log(error));
  }
  React.useEffect(() => {
    getCartItemCount(userId);
  }, [enrichedCart]);


  const a = (
    <IconButton aria-label={count}>
      <Badge badgeContent={count} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );

  return (
    <div>
      {[a].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer('right', true)}>{anchor}</Button>
          <Drawer
            anchor="right"
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}