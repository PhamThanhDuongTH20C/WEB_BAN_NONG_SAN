import React, { useState } from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';
import ListOrder from './ListOrder';
import './OrderUS.css'
import AccountDetail from './AccountDetail';

const OrderUS = () => {
    const [activeLink, setActiveLink] = useState('');
    const handleClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className='container pIHdXn'>
            <div className='kul4+s'>
                <div className='AmWkJQ'>
                    <Link class="_1O4r+C" to="/user/account/profile">
                        <div class="shopee-avatar">
                            <div class="shopee-avatar__placeholder">
                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon icon-headshot"><g>
                                    <circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                                    <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10">
                                    </path></g></svg></div>
                            <img class="shopee-avatar__img" src="https://down-vn.img.susercontent.com/file/vn-11134226-7qukw-lievxeb0f8b67f_tn" />
                        </div>
                    </Link>
                    <div class="miwGmI">
                        <div class="mC1Llc">thnhtrnhvn763</div>
                        <div>
                            <Link class="_78QHr1" to="/user/account/profile">
                                <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                                    <path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fill-rule="evenodd"></path>
                                </svg>Sửa hồ sơ
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='rhmIbk'>
                    <div class="stardust-dropdown">
                        <div class="stardust-dropdown__item-header">
                            <Link
                                class={`+1U02e ${activeLink === 'taikhoan' ? 'wkLUkx' : ''}`}
                                to="/user/account/profile"
                                onClick={() => handleClick('taikhoan')}
                            >
                                <div class="bfikuD">
                                    <img src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" />
                                </div>
                                <div class="DlL0zX">
                                    <span class="adF7Xs">Tài khoản của tôi</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div class="stardust-dropdown stardust-dropdown--open">
                        <div class="stardust-dropdown__item-header">
                            <Link
                                to="/user/purchase"
                                class={`+1U02e ${activeLink === 'donhang' ? 'wkLUkx' : ''}`}
                                onClick={() => handleClick('donhang')}
                            >
                                <div class="bfikuD">
                                    <img src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" /></div>
                                <div class="DlL0zX"><span class="adF7Xs">Đơn Mua</span>
                                </div>
                            </Link>
                        </div>
                        <div class="stardust-dropdown__item-body stardust-dropdown__item-body--open" style={{ opacity: '1' }}>
                            <div class="Yu7gVR"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xMDeox">
                <Routes>
                    <Route path='/user/account/profile' element={<AccountDetail />}></Route>
                    <Route path='/user/purchase' element={<ListOrder />}></Route>
                </Routes>

            </div>
        </div>
    )
}

export default OrderUS