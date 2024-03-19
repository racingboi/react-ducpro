
import axios from 'axios'; // Đừng quên import axios
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
// Giả sử handleDelete được gọi từ nơi nào đó có truyền props là productId và setProducts
export default function Delete({ productId, onProductDelete }) {

  const handleDelete = () => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      
      buttons: [
        {
          label: 'Có',
          onClick: () => axios.delete(`http://localhost:3000/products/${productId}`)
            .then(() => {
              toast.success('Sản phẩm đã được xóa thành công!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              onProductDelete(productId);
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
              toast.error('Có lỗi xảy ra khi xóa sản phẩm!', {
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
    <button className="btn btn-danger ml-2" onClick={handleDelete}>Xóa Sản Phẩm</button>
  );
}
