import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FormFloating, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import Message from '../../Message/Message';
import { useNavigate } from 'react-router-dom';
import './PaymentForm';
import qs from 'qs';

const PayUS = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleShow = () => setShow(true);
    const [totalAmount, setTotalAmount] = useState(0);

    const location = useLocation();
    console.log('Location:', location);
    const params = new URLSearchParams(location.search);
    const id = parseFloat(params.get('id'));
    console.log('id:', id);
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [Account, setAccount] = useState([]);
    var [fullName, setfullName] = useState('');
    var [address, setaddress] = useState('');
    var [email, setemail] = useState('');
    var [phoneNumbers, setphoneNumbers] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const navigate = useNavigate();

    const handleConfirmation = () => {
        navigate('/user/purchase');
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get('https://localhost:7225/api/Carts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get('https://localhost:7225/api/Accounts/GetUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setAccount(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // Tính tổng tiền từ danh sách sản phẩm
        const total = products.reduce((total, product) => {
            return total + product.product.price * product.quantity;
        }, 0);
        setTotalAmount(total);
    }, [products]);

    const Updateaccount = (iddd, names, fullnames, phoneN, addrss, emails) => {
        if (fullName === null || fullName === '') {
            fullName = fullnames;
        }
        if (address === '' || address === null) {
            address = addrss;
        }
        if (email === '' || email === null) {
            email = emails;
        }
        if (phoneNumbers === '' || phoneNumbers === null) {
            phoneNumbers = phoneN;
        }
        const token = sessionStorage.getItem('token');
        const data1 = {
            "address": address,
            "fullName": fullName,
            "phoneNumbers": phoneNumbers,
            "status": true,
            "userName": names,
            "email": email
        }
        axios.put('https://localhost:7225/api/Accounts/' + iddd, data1, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            toast.success("Thay Đổi Thông Tin Thành Công");
        }).catch((e) => { toast.error(e); })
    }

    const CreateInvoices = (names, fullnames, phoneN, addrss, emails, money) => {
        const token = sessionStorage.getItem('token');
        const data1 = {
            "code": "string",
            "applicationUserId": "string",
            "applicationUser": null,
            "issuedDate": "2023-07-05T08:55:34.863Z",
            "shippingAddress": addrss,
            "shippingPhone": phoneN,
            "total": id
        }
        console.log("ssss", money)
        console.log("sssss" + data1);
        axios.post('https://localhost:7225/api/Invoices', data1, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            toast.success("Đặt Hàng Thành Công");
            console.log("sss");
            if (selectedPaymentMethod === "bacs") {
                window.location.href = "https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder";
            } else {
                handleShow();
            }
        }).catch((e) => { toast.error(e); })
    }

    useEffect(() => {
        const fetchProductImages = async () => {
            const imagePromises = products.map((product) =>
                fetch(`https://localhost:7225/api/ProductImages/api/productimages/${product.productId}`)
                    .then((response) => response.json())
                    .then((data) => ({ productId: product.productId, name: data }))
            );
            const imageResponses = await Promise.all(imagePromises);
            const imageMap = imageResponses.reduce((acc, response) => {
                acc[response.productId] = response.name;
                return acc;
            }, {});

            setProductImages(imageMap);
        };
        fetchProductImages();
    }, [products]);

    const handleShowMessage = () => {
        CreateInvoices(
            Account.userName,
            Account.fullName,
            Account.phoneNumbers,
            Account.address,
            Account.email, id
        );
    };

    const handleShowMessagePay = () => {
        if (selectedPaymentMethod === "bacs") {
            CreateInvoices(
                Account.userName,
                Account.fullName,
                Account.phoneNumbers,
                Account.address,
                Account.email,
                id
            );

            // Tạo chuỗi truy vấn URL-encoded
            const queryParams = qs.stringify({
                amount: totalAmount // Truyền giá trị tổng tiền
            });

            window.location.href = "https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder";
        } else {
            handleShow();
        }
    };

    return (
        <div className='row row-main'>
            <div className='large-12 col'>
                <div className='col-inner'>
                    <div className='woocommerce'>
                        <div class="woocommerce-notices-wrapper"></div>
                        <form name="checkout" method="post" class="checkout woocommerce-checkout " action="http://mauweb.monamedia.net/happytrade/thanh-toan/" enctype="multipart/form-data" novalidate="novalidate">
                            <div class="row pt-0 ">
                                <div class="large-7 col  ">
                                    <div id="customer_details">
                                        <div class="clear">
                                            <div class="woocommerce-billing-fields">
                                                <h3>Thông tin thanh toán</h3>
                                                <div className='woocommerce-billing-fields__field-wrapper'>
                                                    <p class="form-row form-row-wide address-field validate-required" data-priority="50">
                                                        <label for="billing_address_1" class="">Họ và tên&nbsp;
                                                            <abbr class="required" title="bắt buộc">*</abbr>
                                                        </label>
                                                        <span class="woocommerce-input-wrapper">
                                                            <input type="text" class="input-text inputUS" name="billing_address_1" placeholder={Account.fullName} value={fullName} onChange={(e) => setfullName(e.target.value)} />
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className='woocommerce-billing-fields__field-wrapper'>
                                                    <p class="form-row form-row-wide address-field validate-required" data-priority="50">
                                                        <label for="billing_address_1" class="">Số điện thoại&nbsp;
                                                            <abbr class="required" title="bắt buộc">*</abbr>
                                                        </label>
                                                        <span class="woocommerce-input-wrapper">
                                                            <input type="text" class="input-text inputUS" name="billing_address_1" placeholder={Account.phoneNumbers} value={phoneNumbers} onChange={(e) => setphoneNumbers(e.target.value)} />
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className='woocommerce-billing-fields__field-wrapper'>
                                                    <p class="form-row form-row-wide address-field validate-required" data-priority="50">
                                                        <label for="billing_address_1" class="">Địa chỉ&nbsp;
                                                            <abbr class="required" title="bắt buộc">*</abbr>
                                                        </label>
                                                        <span class="woocommerce-input-wrapper">
                                                            <input type="text" class="input-text inputUS" name="billing_address_1" placeholder={Account.address} value={address} onChange={(e) => setaddress(e.target.value)} />
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className='woocommerce-billing-fields__field-wrapper'>
                                                    <p class="form-row form-row-wide address-field validate-required" data-priority="50">
                                                        <label for="billing_address_1" class="">Địa chỉ email&nbsp;
                                                            <abbr class="required" title="bắt buộc">*</abbr>
                                                        </label>
                                                        <span class="woocommerce-input-wrapper">
                                                            <input type="text" class="input-text inputUS" name="billing_address_1" placeholder={Account.email} value={email} onChange={(e) => setemail(e.target.value)} />
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            Updateaccount(
                                                                Account.id,
                                                                Account.userName,
                                                                Account.fullName,
                                                                Account.phoneNumbers,
                                                                Account.address,
                                                                Account.email
                                                            )
                                                        }
                                                        type="button"
                                                        className="btn btn-solid-primary btn--m btn--inline"
                                                        aria-disabled="false"
                                                    >
                                                        Xách Nhận Thông Tin
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="large-5 col">
                                    <div class="col-inner has-border">
                                        <div class="checkout-sidebar sm-touch-scroll">
                                            <h3 id="order_review_heading">Đơn hàng của bạn</h3>
                                            <div id="order_review" class="woocommerce-checkout-review-order">
                                                <table class="shop_table woocommerce-checkout-review-order-table">
                                                    <thead>
                                                        <tr>
                                                            <th class="product-name">Sản phẩm</th>
                                                            <th class="product-total">Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map((product) => (
                                                            <tr class="cart_item">
                                                                <td class="product-name">
                                                                    {product.product.name}
                                                                    <strong class="product-quantity"> × {product.quantity}</strong>
                                                                </td>
                                                                <td class="product-total">
                                                                    <span class="woocommerce-Price-amount amount">{(product.product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr class="cart-subtotal">
                                                            <th>Tổng phụ</th>
                                                            <td>
                                                                <span class="woocommerce-Price-amount amount">{id.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;</span>
                                                            </td>
                                                        </tr>
                                                        <tr class="woocommerce-shipping-totals shipping">
                                                            <td class="shipping__inner" colspan="2">
                                                                <table class="shipping__table ">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Giao hàng</th>
                                                                            <td data-title="Giao hàng">
                                                                                <ul id="shipping_method" class="shipping__list woocommerce-shipping-methods">
                                                                                    <li class="shipping__list_item">
                                                                                        <input type="hidden" name="shipping_method[0]" data-index="0" id="shipping_method_0_free_shipping1" value="free_shipping:1" class="shipping_method" />
                                                                                        <label class="shipping__list_label" for="shipping_method_0_free_shipping1">Giao hàng miễn phí</label>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr class="order-total">
                                                            <th>Tổng</th>
                                                            <td>
                                                                <strong>
                                                                    <span class="woocommerce-Price-amount amount">{id.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;</span>
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                                <div id="payment" class="woocommerce-checkout-payment">
                                                    <ul class="wc_payment_methods payment_methods methods">
                                                        <li class="wc_payment_method payment_method_cod">
                                                            <input
                                                                id="payment_method_cod"
                                                                type="radio"
                                                                class="input-radio"
                                                                name="payment_method"
                                                                value="cod"
                                                                checked={selectedPaymentMethod === 'cod'}
                                                                onChange={() => setSelectedPaymentMethod('cod')}
                                                                data-order_button_text=""
                                                            />
                                                            <label for="payment_method_cod">Trả tiền mặt khi nhận hàng</label>
                                                            <div class="payment_box payment_method_cod" style={{ display: 'block' }}>
                                                                <p>Trả tiền mặt khi giao hàng.</p>
                                                            </div>
                                                        </li>
                                                        <li class="wc_payment_method payment_method_bacs">
                                                            <input
                                                                id="payment_method_bacs"
                                                                type="radio"
                                                                class="input-radio"
                                                                name="payment_method"
                                                                value="bacs"
                                                                checked={selectedPaymentMethod === 'bacs'}
                                                                onChange={() => setSelectedPaymentMethod('bacs')}
                                                                data-order_button_text=""
                                                            />
                                                            <label for="payment_method_bacs">Chuyển khoản ngân hàng</label>
                                                            <div class="payment_box payment_method_bacs" style={{ display: 'block' }}>
                                                                <p>Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ được giao sau khi tiền đã chuyển.</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div class="form-row place-order">
                                                        <noscript>
                                                            Since your browser does not support JavaScript, or it is disabled, please ensure you click the &lt;em&gt;Update Totals&lt;/em&gt; button before placing your order. You may be charged more than the amount stated above if you fail to do so.
                                                            <br />
                                                            <button type="submit" class="button alt" name="woocommerce_checkout_update_totals" value="Cập nhật tổng">Cập nhật tổng</button>
                                                        </noscript>
                                                        <div class="woocommerce-terms-and-conditions-wrapper">
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleShowMessage}
                                                        type="button"
                                                        className="btn btn-solid-primary btn--m btn--inline"
                                                        aria-disabled="false"
                                                    >
                                                        Đặt hàng
                                                    </button>
                                                    <Modal show={show} className="container-fluid mt-5 custom-modal">
                                                        <Modal.Header className="custom-modal-header">
                                                            <Modal.Title>Thông báo</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Form.Floating className="mb-3">
                                                                <Message />
                                                            </Form.Floating>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <button
                                                                onClick={handleConfirmation}
                                                                className="btn btn-primary formss-control custom-button"
                                                            >
                                                                Xem đơn hàng
                                                            </button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayUS;
