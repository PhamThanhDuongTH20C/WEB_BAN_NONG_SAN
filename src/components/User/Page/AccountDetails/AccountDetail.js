import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './AccountDetail.css'
import { FormFloating, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import * as Yup from 'yup';
const AccountDetail = () => {
    const [Account, setAccount] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleShow = () => setShow(true);
    var [fullName, setfullName] = useState('');
    var [address, setaddress] = useState('');
    var [email, setemail] = useState('');
    var [phoneNumbers, setphoneNumbers] = useState('');
    const [password, setPassWord] = useState('')
    const [passwordNew, setPassWordNew] = useState('')
    const [passwordS, setPassWordS] = useState('')
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
    },
        []);

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
            "email": email,
            "normalizedEmail": email.toUpperCase(),
        }
        axios.put('https://localhost:7225/api/Accounts/' + iddd, data1, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            toast.success("Thay Đổi Thông Tin Thành Công");
        }).catch((e) => { toast.error(e); })
        window.location.reload();
    }
    const passwordSchema = Yup.string()
        .required('Mật khẩu không được để tróng')
        .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự')
        .matches(
            /^(?=.*\d)(?=.*[!@#$%?*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%?*]{8,}$/,
            "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
        );
    const Schema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
            .required('Số điện thoại không được để trống'),
        email: Yup.string()
            .required('Email không được để trống')
            .email('Invalid email address'),
        address: Yup.string()
            .required('Địa chỉ không được để trống không được để trống'),
        fullname: Yup.string()
            .required('Họ và tên(đầy đủ) không được để trống')
            .max(50, 'Họ và tên(đầy đủ) quá dài'),

    });
    const handleChangePassWord = async (id, password, passwordNew) => {
        try {
            await passwordSchema.validate(passwordNew, { abortEarly: false });
            await passwordSchema.validate(passwordS, { abortEarly: false });

            if (passwordNew !== passwordS) {
                toast.error('Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
            } else {
                const url = 'https://localhost:7225/Authenticate/' + id;
                const data = {
                    "currentPassword": password,
                    "newPassword": passwordNew
                }
                axios.put(url, data)
                    .then((result) => {
                        toast.success('Đã thay đổi thành công');

                    }).catch((error) => {
                        toast.error("Đã thay đổi không thành công");
                    })
            }
            toast.success('Đã thay đổi thành công');
        } catch (err) {

            console.log('sss', err)

        }
    }
    return (
        <Fragment>
            <ToastContainer />
            <div style={{ margin: '0 200px' }}>
                <div >
                    <div className='b7wtmP'>
                        <div class="_66hYBa" style={{ textAlign: 'center' }}>
                            <h1 class="SbCTde">Hồ sơ của tôi</h1>
                            <div class="zptdmA">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                        </div>
                        <div className='R-Gpdg'>
                            <div className='volt8A'>
                                <table className='Zj7UK+'>
                                    <tr>
                                        <td className='espR83'>
                                            <label>Tên đăng nhập</label>
                                        </td>
                                        <td className='Tmj5Z6'>
                                            <div className='_0ZgK9X'>
                                                <div className='uxYEXm'>{Account.userName}</div>
                                                <button class="DJRxAF"></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="espR83">
                                            <label>Tên</label>
                                        </td>
                                        <td class="Tmj5Z6">
                                            <div>
                                                <div class="W50dp5">
                                                    <input type="text" placeholder={Account.fullName} class="CMyrTJ" value={fullName} onChange={(e) => setfullName(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="espR83">
                                            <label>Mật Khẩu</label>
                                        </td>
                                        <td class="Tmj5Z6">
                                            <div>
                                                <div class="W50dp5">
                                                    <input type="text" placeholder="***********" class="CMyrTJ" disabled />
                                                </div>
                                                <div><button onClick={() => { handleShow() }}> Đổi Mật Khẩu</button></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="espR83">
                                            <label>Email</label>
                                        </td>
                                        <td class="Tmj5Z6">
                                            <div>
                                                <div class="W50dp5">
                                                    <input type="text" placeholder={Account.email} class="CMyrTJ" value={email} onChange={(e) => setemail(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td class="espR83">
                                            <label>Số điện thoại</label>
                                        </td>
                                        <td class="Tmj5Z6">
                                            <div>
                                                <div class="W50dp5">
                                                    <input type="text" placeholder={Account.phoneNumbers} class="CMyrTJ" value={phoneNumbers} onChange={(e) => setphoneNumbers(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td class="espR83">
                                            <label>Địa chỉ</label>
                                        </td>
                                        <td class="Tmj5Z6">
                                            <div>
                                                <div class="W50dp5">
                                                    <input type="text" placeholder={Account.address} class="CMyrTJ" value={address} onChange={(e) => setaddress(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td class="espR83">
                                            <label>
                                            </label>
                                        </td>
                                        <td class="Tmj5Z6">
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
                                                Lưu
                                            </button>

                                        </td>
                                    </tr>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={show} onHide={handleClose} className="container-fluid mt-5 custom-modal">
                        <Modal.Header className="custom-modal-header">
                            <Modal.Title>Tạo mật khẩu mới</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Floating className="mb-3">
                                <label htmlFor="floatingInputCustom" className="font-weight-semi-bold h6">Nhập mật khẩu hiện tại</label>
                                <Form.Control
                                    className="forms-control ml-1 mt-2"
                                    id="floatingInputCustom"
                                    type="password"
                                    placeholder="Nhập mật khẩu hiện tạo của bạn"
                                    value={password}
                                    onChange={(e) => setPassWord(e.target.value)}
                                />
                            </Form.Floating>
                            <Form.Floating>
                                <label htmlFor="floatingPasswordCustom" className="font-weight-semi-bold h6">Tạo mật khẩu mới</label>
                                <Form.Control
                                    className="forms-control ml-1 mt-2"
                                    id="floatingPasswordCustom"
                                    type="password"
                                    placeholder="Nhập mật khẩu mới của bạn"
                                    value={passwordNew}
                                    onChange={(e) => setPassWordNew(e.target.value)}
                                />
                            </Form.Floating>
                            <FormFloating>
                                <label htmlFor="floatingPasswordCustom" className="font-weight-semi-bold h6">Nhập lại mật khẩu</label>
                                <Form.Control
                                    className="forms-control ml-1 mt-2"
                                    id="floatingPasswordCustom"
                                    type="password"
                                    placeholder="Xác nhận lại mật khẩu"
                                    value={passwordS}
                                    onChange={(e) => setPassWordS(e.target.value)}
                                />
                                <p className="text-red">Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt</p>
                            </FormFloating>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                className="btn btn-primary formss-control custom-button"
                                onClick={() => { handleChangePassWord(Account.id, password, passwordNew) }}
                            >
                                Xác nhận
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>


            </div>

        </Fragment>
    )
}

export default AccountDetail