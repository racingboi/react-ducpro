import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
export default function DeleteUser({ userId, onUserDelete }) {
  const handleDelete = () => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa Người dùng này không?',

      buttons: [
        {
          label: 'Có',
          onClick: () => axios.delete(`http://localhost:3000/users/${userId}`)
            .then(() => {
              toast.success('Người dùng đã được xóa thành công!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              onUserDelete(userId);
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
              toast.error('Có lỗi xảy ra khi xóa Người dùng!', {
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
    <button className="btn btn-danger ml-2" onClick={handleDelete}>
      <DeleteIcon />
    </button>
  );
}

