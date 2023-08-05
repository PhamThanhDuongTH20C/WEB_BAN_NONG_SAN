import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckOutlined } from '@ant-design/icons';

export default function VnPaySuccess() {
  const location = useLocation();

  useEffect(() => {
    const getResultVNPay = async () => {
      try {
        const query = location.search;
        const response = await axios.get(
          `/api/payments/vnpay_return${query}`
        );
        const data = response.data;
        // Xử lý dữ liệu trả về từ API nếu cần thiết
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getResultVNPay();
  }, []);

  return (
    <section id="order-success">
      <div className="order-success">
        <span><CheckOutlined /></span>
        <p>Đặt hàng thành công</p>
        {/* <Link to="">OK</Link> */}
        <div className="links">
          <Link to="/myOrder">Xem lại đơn hàng</Link>
          <Link to="/">Trang chủ</Link>
        </div>
      </div>
    </section>
  );
}
