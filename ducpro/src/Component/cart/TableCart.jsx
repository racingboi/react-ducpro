import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';
import formatPrice from '../formatPrice/formatPrice';
import axios from 'axios';
import { useEffect, useState } from 'react';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function TableCart({ data, handleUpdate, handleUpdateInput, handleDetele }) {
  
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => { 
    setIsDisabled(true);
  },[data])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản Phẩm</TableCell>
            <TableCell align="right">Hình</TableCell>
            <TableCell align="right">Số Lượng</TableCell>
            <TableCell align="right">Gía</TableCell>
            <TableCell align="right">Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productDetails.name}
              </TableCell>
              <TableCell align="right">
                <Avatar src={row.productDetails.img} alt="" />
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleUpdate(row.id, "-", row.quantity)}>-</Button>

                {!isDisabled ? <form onSubmit={handleUpdateInput}>
                  <input name='quantity' type="text" placeholder={row.quantity} />
                  <input type="hidden" name='id' value={row.id} />
                  <input name='old_quantity' type="hidden" value={row.quantity} />

                </form> : <Button onDoubleClick={() => setIsDisabled(!isDisabled)}>{row.quantity} </Button>}
                <Button onClick={() => handleUpdate(row.id, "+", row.quantity)}>+</Button>
              </TableCell>
              <TableCell align="right">{formatPrice(row.productDetails.price * row.quantity)}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDetele(row.id)} variant="contained">Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
Table.propTypes = {
  data: PropTypes.array,
};
