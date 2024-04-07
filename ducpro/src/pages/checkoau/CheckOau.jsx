// import axios from 'axios';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import formatPrice from "../../Component/formatPrice/formatPrice";
import { Avatar } from '@mui/material';
const apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api';
const apiKey = '7293aab0-b9b0-11ee-b38e-f6f098158c7e';
export default function CheckOau() {
  const [ten, setTen] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [fee, setFee] = useState(0);

  const handleTen = (event) => {
    setTen(event.target.value)
  }
  const handlePhone = (event) => {
    setPhone(event.target.value)
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  useEffect(() => {
    fetchProvinceData();
  }, []);

  useEffect(() => {
    if (selectedProvince) fetchDistrictsData(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsData(selectedDistrict);
      fetchService(selectedDistrict)
        .then(serviceId => setSelectedServiceId(serviceId))
        .catch(error => console.error(error));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard && selectedDistrict && selectedServiceId) {
      fetchFee(selectedWard, selectedDistrict, selectedServiceId);
    }
  }, [selectedWard, selectedDistrict, selectedServiceId]);

  const fetchProvinceData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/province`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
      });
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu tỉnh:', error);
    }
  };

  const fetchDistrictsData = async (provinceId) => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/district`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: { province_id: provinceId },
      });
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu quận/huyện:', error);
    }
  };

  const fetchWardsData = async (districtId) => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/ward`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: { district_id: districtId },
      });
      setWards(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu phường/xã:', error);
    }
  };

  const fetchService = async (districtId) => {
    try {
      const serviceResponse = await axios.get(`${apiUrl}/v2/shipping-order/available-services`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: {
          shop_id: 4868495,
          from_district: 1788,
          to_district: districtId,
        },
      });

      if (serviceResponse.data.data && serviceResponse.data.data.length > 0) {
        const firstService = serviceResponse.data.data[0];
        return firstService.service_id;
      } else {
        console.log('Không tìm thấy dịch vụ nào.');
        return '';
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu dịch vụ:', error);
      throw error;
    }
  };

  const fetchFee = async (wardCode, districtId, serviceId) => {
    try {
      const feeResponse = await axios.get(`${apiUrl}/v2/shipping-order/fee`, {
        headers: {
          'Content-Type': 'application/json',
          Token: apiKey,
        },
        params: {
          from_district_id: 1788,
          to_district_id: districtId,
          to_ward_code: wardCode,
          service_id: serviceId,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: 0,
        },
      });

      if (feeResponse.data && feeResponse.data.data) {
        setFee(feeResponse.data.data.total);
      } else {
        console.log('Lỗi khi tính phí: Không nhận được dữ liệu');
      }
    } catch (error) {
      console.error('Lỗi khi lấy phí:', error);
    }
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
    setSelectedWard('');
    setSelectedServiceId('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedWard('');
    setSelectedServiceId('');
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // gio hang
  const [carts, setCarts] = useState([]);
  const [enrichedCart, setEnrichedCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.id) {
      fetchAllCart();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (carts && carts.length > 0) {
      Promise.all(
        carts.map((cart) =>
          axios
            .get(`http://localhost:3000/products/${cart.product_id}`)
            .then((res) => ({ ...cart, productDetails: res.data }))
        )
      )
        .then((enrichedCarts) => {
          setEnrichedCart(enrichedCarts);
        })
    } else {
      setEnrichedCart([]);
    }
  }, [enrichedCart, carts]);

  const fetchAllCart = () => {
    axios
      .get(`http://localhost:3000/cart`)
      .then((res) => {
        setCarts(res.data);
      })
  };
  
  const handleC = async (e) => {
    e.preventDefault();
    // if (paymentMethod === 1) {
    //   axios.post(`http://localhost:3000/order`, {
    //     customer_id: user.id,
    //     Province: selectedProvince,
    //     District: selectedDistrict,
    //     ward: selectedWard,
    //     sdt: phone,
    //     tenKH: ten,
    //     email: email,
    //     paymentMethod: paymentMethod,
    //     total: total
    //   })
    // }
    if (paymentMethod === "2") {
      const paymentData = {
        orderId: user.id,
        amount: total * 100,
        orderInfo: "Thanh toán hóa đơn mua hàng",
        bankCode: "",
        language: "vn",
        customerName: ten,
        customerEmail: email,
        customerPhone: phone,
      };
      try {
        const response = await axios.post(`http://localhost:8888/order/create_payment_url`);
        window.open(response, '_blank');
      } catch (error) {
        console.error('Error creating payment URL', error);
      }

    }
    
  }


    //   axios.post(`http://localhost:3000/order`, {
    //     customer_id: user.id,
    //     Province: selectedProvince,
    //     District: selectedDistrict,
    //     ward: selectedWard,
    //     sdt: phone,
    //     tenKH: ten,
    //     email: email,
    //     paymentMethod: paymentMethod,
    //     total: total
    //   });
    // }
    // const ids = enrichedCart.map(item => item.id);
    // for (let i = 0; i < ids.length; i++) {
    //   axios.delete(`http://localhost:3000/cart/${ids[i]}`)
    //     .then(response => {
    //       // Xử lý khi request thành công nếu cần
    //       console.log(`Xóa sản phẩm có id ${ids[i]} thành công.`);
    //     })
    //     .catch(error => {
    //       // Xử lý khi request gặp lỗi nếu cần
    //       console.error(`Xóa sản phẩm có id ${ids[i]} thất bại:`, error);
    //     });
    // }

  const totalPrice = enrichedCart.reduce((total, item) => total + item.quantity * item.productDetails.price, 0);
  const total = totalPrice + fee;
  return (
    <main role="main" className="container p-3">
      <div className="container mt-4">
          <div className="py-5 text-center">
            <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
            <h2>Thanh toán</h2>
            <p className="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
          </div>
        <form onSubmit={handleC}>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">2</span>
              </h4>
              <ul className="list-group mb-3">
                {enrichedCart.map((cart, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div className="d-flex align-items-center">
                      <div className="mr-3">
                        <Avatar src={cart.productDetails.img} alt="" />
                      </div>
                      <div className="mx-3">
                        <h6 className="mb-1">{cart.productDetails.name}</h6>
                        <small className="text-muted">
                          {formatPrice(cart.productDetails.price)} x {cart.quantity}
                        </small>
                      </div>
                    </div>
                    <span className="text-muted">{formatPrice(cart.productDetails.price * cart.quantity)}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Phí vận chuyển:</span>
                  <strong>{formatPrice(fee)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">

                  <span>Tổng thành tiền</span>
                  <strong>{formatPrice(total)}</strong>
                </li>
              </ul>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Mã khuyến mãi" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>

              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="kh_ten">Họ tên</label>
                  <input type="text"
                    value={ten}
                    onChange={handleTen}
                    className="form-control"
                    placeholder="vui lòng nhâp họ và tên..."
                  />
                </div>
                <div className="col-md-12">
                  <div className="container mt-4">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="province" className="form-label">Tỉnh:</label>
                        <select id="province" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                          <option value="" disabled>--chọn tỉnh--</option>
                          {provinces.map((province) => (
                            <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="districts" className="form-label">Quận/Huyện:</label>
                        <select id="districts" className="form-select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
                          <option value="" disabled>--chọn quận/huyện--</option>
                          {districts.map((district) => (
                            <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="ward" className="form-label">Phường/Xã:</label>
                        <select id="ward" className="form-select" value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                          <option value="" disabled>--chọn phường/xã--</option>
                          {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="kh_dienthoai">Điện thoại</label>
                  <input type="text"
                    value={phone}
                    className="form-control"
                    onChange={handlePhone}
                    placeholder="vui lòng nhập số điện thoại của bạn..."
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="kh_email">Email</label>
                  <input type="text"
                    value={email}
                    className="form-control"
                    onChange={handleEmail}
                    placeholder="vui lòng nhập email của bạn..."
                  />
                </div>
              </div>
              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="httt-1"
                    type="radio"
                    className="custom-control-input"
                    required
                    value="1"
                    checked={paymentMethod === '1'}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="httt-1">Tiền mặt</label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="httt-2"
                    type="radio"
                    className="custom-control-input"
                    required
                    value="2"
                    checked={paymentMethod === '2'}
                    onChange={handleChange}
                  />
                  <label className="custom-control-label" htmlFor="httt-2">Chuyển khoản</label>
                </div>
              </div>
              <hr className="mb-4 " />
              <button className="btn btn-primary btn-lg btn-block">Đặt hàng</button>
            </div>
          </div>
          </form>
      </div>
    </main>
  );
}
