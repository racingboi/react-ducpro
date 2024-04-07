import { useState } from 'react';

function PaymentForm({ handleChange }) {
 const [paymentMethod, setPaymentMethod] = useState('');
  return (
    <>
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
    </>
  );
}

export default PaymentForm;
