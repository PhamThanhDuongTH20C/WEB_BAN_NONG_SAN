import React, { useState } from 'react';

const PaymentForm = () => {
  const [paymentResult, setPaymentResult] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Gửi các thông tin cần thiết cho việc tạo thanh toán
          Invoiceid: 1,
          Codepayment: 'ABC123',
          Status: false,
          IssuedpayDate: new Date().toISOString()
        })
      });

      const data = await response.json();
      setPaymentResult(data.paymentUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Thanh toán</button>
      {paymentResult && <a href={paymentResult} target="_blank" rel="noopener noreferrer">Click here to proceed with payment</a>}
    </div>
  );
};

export default PaymentForm;
