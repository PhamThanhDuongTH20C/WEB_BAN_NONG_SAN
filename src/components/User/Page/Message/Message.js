import React from 'react';
import './Style.css'

const Message = () => {
    return (
        <div className="container">
            <h1 className='center'>Đặt hàng thành công</h1>
            <p>Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được ghi nhận và đang được xử lý.</p>
            <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng và thông báo về quá trình giao hàng.</p>
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại 0383524413 hoặc email 0306201223@caothang.edu</p>
            {/* <p>Xem thông tin đơn hàng của bạn <a href="#">tại đây</a>.</p>
            <p>Xem các sản phẩm khác của chúng tôi <a href="#">tại đây</a>.</p> */}
            <p>Xin cảm ơn!</p>
            {/* <p>
                <a class="button" href="#">Quay lại trang chủ</a>
            </p> */}
        </div>
    )
}

export default Message
