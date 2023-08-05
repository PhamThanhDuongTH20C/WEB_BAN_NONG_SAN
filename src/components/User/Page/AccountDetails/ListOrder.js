import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Modal } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'

import './OrderUS.css'
const ListOrder = () => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleShowPopup = (index) => {
        setSelectedItemIndex(index);
    };

    const handleClosePopup = () => {
        setSelectedItemIndex(null);
    };

    const [activeLink, setActiveLink] = useState('tatca');
    const handleClick = (link) => {
        setActiveLink(link);
    };
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [status, setstatus] = React.useState(false);
    const [ship, setship] = React.useState(false);
    // const [shipping, setshipping] = React.useState(false);
    const [shipSuccecs, setshipSuccecs] = React.useState(false);
    // const [cancel, setcancel] = React.useState(false);
    const [succescfull, setsuccescfull] = React.useState(false);
    const [shipSuccecss, setstatuss] = React.useState(true);
    const [cance, setships] = React.useState(true);
    const [cances, setshipsss] = React.useState(false);
    const [shippings, setshippings] = React.useState(false);
    const [shippingss, setshippingss] = React.useState(true);
    const [shippingPhone, setshippingPhone] = useState('');
    const [shippingAddress, setshippingAddress] = useState('');
    const [issuedDate, setissuedDate] = useState('');
    const [applicationUserId, setapplicationUserId] = useState('');
    const [code, setcode] = useState('');
    const [total, settotal] = useState('');
    const inputDate = new Date();
    const [shipping, setShipping] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [show, setShow] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const invoiceResponse = await axios.get('https://localhost:7225/api/Invoices/invoices', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setInvoice(invoiceResponse.data);
                setInvoices(invoiceResponse.data)
                console.log("saaaa", invoiceResponse.data);

                const invoiceDetailsPromises = invoiceResponse.data.map((inv) =>
                    axios.get(`https://localhost:7225/api/InvoiceDetails/${inv.id}`)
                );
                const invoiceDetailsResponses = await Promise.all(invoiceDetailsPromises);
                const invoiceDetailsData = invoiceDetailsResponses.map((response) => response.data);
                setInvoiceDetail(invoiceDetailsData);
                setInvoiceDetails(invoiceDetailsData)
                console.log("deatail", invoiceDetailsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchInvoiceData();
    }, []);
    const updatedInvoice = (st, sh, co, app, iss, shippingAdd, shippingP, tot, stas, shipw, shippin, shipSuccs, ifd,ee) => {
        const data = {
            "id": ifd,
            "code": co,
            "applicationUserId": app,
            "applicationUser": null,
            "issuedDate": iss,
            "shippingAddress": shippingAdd,
            "shippingPhone": shippingP,
            "total": tot,
            "status": stas,
            "cancel": st,
            "ship": shipw,
            "shipping": shippin,
            "shipSuccecs": shipSuccs,
            "succescfull": sh,
            "reason":ee
        }

        axios.put(`https://localhost:7225/api/Invoices/${ifd}`, data)
            .then(response => {
                setCancel(cancel);
                setShipping(shipping);
                window.location.reload();
            })
            .catch(error => {
                console.error('Failed to update the invoice:', error);
            })

    }
    const [productImage, setProductImage] = useState(null);
    useEffect(() => {
        const fetchProductImage = async (invoiceDetails) => {
            const tempProductImages = []; // Mảng tạm thời để lưu trữ các giá trị hình ảnh
            for (let i = 0; i < invoiceDetails.length; i++) {
                for (let j = 0; j < invoiceDetails[i].length; j++) {
                    const productId = invoiceDetails[i][j]?.product?.productId;
                    const response = await fetch(`https://localhost:7225/api/ProductImages/api/productimages/${productId}`);
                    const data = await response.json();
                    tempProductImages.push(data);
                }
            }
            setProductImage(tempProductImages);
            console.log("TTT", tempProductImages) // Gán toàn bộ mảng hình ảnh vào productImage
        };
        fetchProductImage(invoiceDetails);
    }, [invoiceDetails]);

    const handleShowCancelModal = () => {
        setShowCancelModal(true);
    };

    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
    };


    const hasOrder = invoice.length > 0;

    // Lấy chỉ số sản phẩm đầu và cuối của trang hiện tại
    const indexOfLastInvoice1 = currentPage * productsPerPage;
    const indexOfFirstInvoice1 = indexOfLastInvoice1 - productsPerPage;
    const currentinvoice = invoice.slice(indexOfFirstInvoice1, indexOfLastInvoice1);

    // Chuyển đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div style={{ display: 'contents' }}>
            <div className="--tO6n">
                <div className="VYJdTQ">
                    {/* Link components */}
                </div>
                <div style={{ margin: '0 200px' }}>
                    {hasOrder ? (
                        <div>
                            {currentinvoice.map((inv, index1) => (

                                <div className='hiXKxx' key={inv.id}>

                                    {selectedItemIndex === index1 && (
                                        <Modal
                                            show={true}
                                            onHide={() => handleClosePopup()}
                                            backdrop="static"
                                            className="container-fluid mt-5 custom-modal"
                                        >
                                            <Modal.Header className="custom-modal-header">
                                                <Modal.Title>Thông tin đơn hàng</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form.Floating className="mb-3">
                                                    <p>Mã Hóa Đơn: {inv?.code}</p>
                                                    <p>Địa Chỉ: {inv?.shippingAddress}</p>
                                                    <p>Ngày Lập: {format(new Date(inv.issuedDate), 'dd/MM/yyyy')}</p>
                                                    <p>Số Điện Thoại: {inv?.applicationUser.phoneNumbers}</p>
                                                    <p>Ghi Chú: {inv?.reason}</p>
                                                </Form.Floating>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button
                                                    className="btn btn-primary formss-control custom-button"
                                                    onClick={() => navigate('/')}
                                                >
                                                    Trang chủ
                                                </button>
                                                <button className="btn btn-primary formss-control custom-button" onClick={() => setSelectedItemIndex(null)}>Đóng </button>
                                            </Modal.Footer>
                                        </Modal>
                                    )}
                                    <div className='x0QT2k'>
                                        <div >
                                            <div className='KrPQEI'>
                                                <div>
                                                    <p>Mã Hóa Đơn : {inv.code}</p>
                                                    <p style={{ margin: '0' }}>Khách Hàng:{invoices?.[index1]?.applicationUser.fullName}</p>
                                                </div>
                                                <div className='EQko8g'>
                                                    <div className='qP6Mvo'>
                                                        <Link to='#' className='KmBIg2'>
                                                            <span className='nkmfr2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16" className='shopee-svg-icon icon-free-shipping-line'>
                                                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                                </svg>
                                                                {inv.status === true && inv.ship === true && inv.shipping && inv.shipSuccecs && inv.succescfull ? "Đã hoàn thành đơn hàng" : inv.status === true && inv.ship === true && inv.shipping && inv.shipSuccecs ? "Đã giao hàng" : inv.status === true && inv.ship === true && inv.shipping ? "Shipper đang trên đường giao" : inv.status === true && inv.ship === true ? "Shipper đang vận chuyển" : inv.cancel === true ? "Đơn đã hủy" : inv.status === true ? "Đã xác nhận" : " Chờ xác nhận"}
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <Link onClick={() => handleShowPopup(index1)}>
                                                        <div className="V+w7Xs">Xem thêm</div>
                                                    </Link>

                                                </div>
                                                {/* <div className="FycaKn">

                                                </div> */}
                                            </div>

                                        </div>
                                        {invoiceDetail[index1]?.map((detail, index2) => (
                                            <div key={detail.id}>
                                                <>
                                                    <from>
                                                        <Link to='#'>
                                                            <div className='_0OiaZ-'>
                                                                <div className='FbLutl'>
                                                                    <span className='x7nENX'>
                                                                        <div className='aybVBK'>
                                                                            <div className='rGP9Yd'>
                                                                                <div className='shopee-image__wrapper'>
                                                                                    <div className="shopee-image__content" style={{ backgroundImage: `url(https://localhost:7225/images/${productImage?.[index1 + index2]?.imagepath})` }}>
                                                                                        {/* <div className="shopee-image__content--blur">{invoiceDetails?.[index1]?.[index2]?.product?.productId}</div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='_7uZf6Q'>
                                                                                <div>
                                                                                    <div className="iJlxsT">
                                                                                        <span className="x5GTyN"> {invoiceDetails?.[index1]?.[index2]?.product?.name}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    <div className="vb0b-P" style={{ marginRight: '5px' }}>Số Lượng</div>
                                                                                    <div className="_3F1-5M">x{detail.quantity}</div>
                                                                                </div>
                                                                                <div style={{ marginTop: '7px' }}>
                                                                                    <span>{detail.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="_9UJGhr">
                                                                            <div className="rjqzk1">
                                                                                {/* <span className="j2En5+">₫170.000</span> */}
                                                                                <span className="DeWpya">{(detail.unitPrice * detail.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                                            </div>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </from>
                                                </>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='O2KPzo'></div>
                                    <div className='kvXy0c'>
                                        <div className='-78s2g'>
                                            <span className="JMmT2C">
                                                <div className="IlORNJ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16">
                                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                                    </svg>
                                                </div>
                                            </span>
                                            <div className="_0NMXyN">Thành tiền:</div>
                                            <div className="DeWpya">{inv.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                            <tr style={{ paddingLeft: '5px' }}>
                                                {inv.status===false && (
                                                    <button style={{ marginBottom: '0' }} onClick={handleShowCancelModal}>
                                                        HỦY
                                                    </button>
                                                )}
                                                {inv.status === true && inv.ship === true && inv.shipping && inv.shipSuccecs && (
                                                    <button onClick={() => {
                                                        updatedInvoice(
                                                            cances,
                                                            shippingss,
                                                            inv.code,
                                                            inv.applicationUserId,
                                                            inv.issuedDate,
                                                            inv.shippingAddress,
                                                            inv.shippingPhone,
                                                            inv.total,
                                                            inv.status,
                                                            inv.ship,
                                                            inv.shipping,
                                                            inv.shipSuccecs,
                                                            inv.id,
                                                            cancelReason
                                                        );
                                                    }}>Đã nhận được hàng</button>
                                                )}
                                            </tr>
                                            <>
                                                <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Nhập lý do hủy đơn</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Lý do</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Nhập lý do tại đây"
                                                                    autoFocus
                                                                    value={cancelReason}
                                                                    onChange={(e) => setCancelReason(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleCloseCancelModal}>
                                                            Quay lại
                                                        </Button>
                                                        <Button variant="primary" onClick={() => {
                                                            // Kiểm tra lý do hủy đơn có được nhập hay không
                                                            if (cancelReason.trim() !== '') {
                                                                // Gọi hàm updatedInvoice để hủy đơn và truyền lý do hủy đơn
                                                                updatedInvoice(
                                                                    cance,
                                                                    shippings,
                                                                    inv.code,
                                                                    inv.applicationUserId,
                                                                    inv.issuedDate,
                                                                    inv.shippingAddress,
                                                                    inv.shippingPhone,
                                                                    inv.total,
                                                                    inv.status,
                                                                    inv.ship,
                                                                    inv.shipping,
                                                                    inv.shipSuccecs,
                                                                    inv.id,
                                                                    cancelReason
                                                                );
                                                                handleCloseCancelModal();
                                                            } else {
                                                                // Hiển thị thông báo lý do hủy đơn không được để trống
                                                                // Ví dụ: sử dụng toast hoặc alert
                                                                alert('Vui lòng nhập lý do hủy đơn');
                                                            }
                                                        }}>
                                                            Đồng ý
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Hiển thị phân trang */}
                            {invoice.length > productsPerPage && (
                                <div className="pagination">
                                    {currentPage > 1 && (
                                        <button className="pagination-button" onClick={() => paginate(currentPage - 1)}>
                                            <DoubleLeftOutlined />
                                        </button>
                                    )}
                                    {Array.from({ length: Math.ceil(invoice.length / productsPerPage) }).map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => paginate(index + 1)}
                                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    {currentPage < Math.ceil(invoice.length / productsPerPage) && (
                                        <button className="pagination-button" onClick={() => paginate(currentPage + 1)}>
                                            <DoubleRightOutlined />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="vFPgNG">
                            <div className="FK6kaK">
                                <div className="bi4dk5"></div>
                                <div className="dYtuu1">Chưa có đơn hàng</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListOrder