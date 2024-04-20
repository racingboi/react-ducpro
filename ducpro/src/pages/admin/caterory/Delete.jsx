import  axios  from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import DeleteIcon from '@mui/icons-material/Delete';
function Delete({ cateroryId, onCateroryDelete }) {
  const handleDelete = () => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',

      buttons: [
        {
          label: 'Có',
            onClick: () => axios.delete(`http://localhost:3000/caterory/${cateroryId}`)
            .then(() => {
              toast.success('danh mục đã được xóa thành công!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              onCateroryDelete(cateroryId);
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
              toast.error('Có lỗi xảy ra khi xóa danh mục!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            })
        },
        {
          label: 'Không',
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <button className="btn btn-danger ml-2" onClick={handleDelete}><DeleteIcon /></button>
  );
}

export default Delete
