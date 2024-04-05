import GioHang from "./GioHang";

export default function CheckOau() {
  return (
    <main role="main">
      <div className="container mt-4">
        <form className="needs-validation" name="frmthanhtoan" method="post" action="">
          <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />
          <div className="py-5 text-center">
            <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
            <h2>Thanh toán</h2>
            <p className="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
          </div>
          <div className="row">
            <GioHang/>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>

              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="kh_ten">Họ tên</label>
                  <input type="text" className="form-control" name="kh_ten" id="kh_ten" value="Dương Nguyễn Phú Cường" readOnly />
                </div>
                <div className="col-md-12">
                  <label htmlFor="kh_diachi">Địa chỉ</label>
                  <input type="text" className="form-control" name="kh_diachi" id="kh_diachi" value="130 Xô Viết Nghệ Tỉnh" readOnly />
                </div>
                <div className="col-md-12">
                  <label htmlFor="kh_dienthoai">Điện thoại</label>
                  <input type="text" className="form-control" name="kh_dienthoai" id="kh_dienthoai" value="0915659223" readOnly />
                </div>
                <div className="col-md-12">
                  <label htmlFor="kh_email">Email</label>
                  <input type="text" className="form-control" name="kh_email" id="kh_email" value="phucuong@ctu.edu.vn" readOnly />
                </div>
              </div>
              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="httt-1" name="httt_ma" type="radio" className="custom-control-input" required value="1" />
                  <label className="custom-control-label" htmlFor="httt-1">Tiền mặt</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="httt-2" name="httt_ma" type="radio" className="custom-control-input" required value="2" />
                  <label className="custom-control-label" htmlFor="httt-2">Chuyển khoản</label>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang">Đặt hàng</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
