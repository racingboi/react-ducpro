import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { ListItemText } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function ThongKe() {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(true);

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: darkMode ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: darkMode ? '#fff' : '#1A2027',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    borderRadius: '10%',
    margin: '5px',
  }));

  const BoldText = styled('span')({
    fontWeight: 'bold',
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} sx={{ borderBlockEndColor: "transparent" }}>
        <Item>
          <div>
            <ListItemText><BoldText>Số người dùng</BoldText></ListItemText>
            <ListItemText>40</ListItemText>
          </div>
          <PersonOutlineIcon sx={{ fontSize: 60 }} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <div>
            <ListItemText><BoldText>Tổng tiền lời</BoldText></ListItemText>
            <ListItemText>12,000,000,000 VND</ListItemText>
          </div>
          <LocalAtmIcon sx={{ fontSize: 60 }} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <div>
            <ListItemText><BoldText>Số lượng hàng đã nhập</BoldText></ListItemText>
            <ListItemText>100</ListItemText>
          </div>
          <AddShoppingCartIcon sx={{ fontSize: 60 }} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <div>
            <ListItemText><BoldText>Số lượng hàng đã bán</BoldText></ListItemText>
            <ListItemText>100</ListItemText>
          </div>
          <ShoppingCartCheckoutIcon sx={{ fontSize: 60 }} />
        </Item>
      </Grid>
    </Grid>
  )
}
