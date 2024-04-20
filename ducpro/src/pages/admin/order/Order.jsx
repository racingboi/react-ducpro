import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, createFilterOptions } from '@mui/material';
import formatPrice from '../../../Component/formatPrice/formatPrice';
import { handleToast } from '../../../config/ConfigToats';

function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/order`);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = (event, newValue, rowId) => {
    const updatedOrders = orders.map(order =>
      order.id === rowId ? { ...order, staus: newValue.title } : order
    );
    setOrders(updatedOrders);
    axios.patch(`http://localhost:3000/order/${rowId}`, {
      staus: newValue.title
    })
      .then(() => {
        handleToast('success', 'Cập nhật thành công');
        setShouldReload(true); // Đặt shouldReload thành true sau khi cập nhật thành công
      })
      .catch(err => console.error('Cập nhật thất bại', err));
  };

  useEffect(() => {
    // Kiểm tra shouldReload
    if (shouldReload) {
      fetchAllOrders();
      setShouldReload(true); // Đặt lại shouldReload thành false sau khi tải lại dữ liệu
    }
  }, [shouldReload]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      fetchAllOrders();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const statusOptions = [
    { title: 'chờ xác nhận' },
    { title: 'đang xử lý' },
    { title: 'đang giao' },
    { title: 'hủy' },
    { title: 'trả hàng' }
  ];
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option.title
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên khách hàng</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Hình thức thanh toán</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{order.tenKH}</TableCell>
              <TableCell>{formatPrice(order.total)}</TableCell>
              <TableCell>{order.paymentMethod === '1' ? "thanh toán khi nhận hàng" : "thanh toán online"}</TableCell>
              <TableCell>
                <Autocomplete
                  id={`status-select-${order.id}`}
                  options={statusOptions}
                  getOptionLabel={(option) => option.title}
                  filterOptions={filterOptions}
                  value={statusOptions.find(opt => opt.title === order.staus)}
                  onChange={(event, newValue) => handleStatusChange(event, newValue, order.id)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Order;
