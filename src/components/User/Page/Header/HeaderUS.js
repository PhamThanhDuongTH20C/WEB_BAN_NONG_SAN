import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    MenuOutlined,
    ShoppingCartOutlined,
    SearchOutlined,
    MailOutlined,
    PhoneOutlined,
    DownOutlined
} from "@ant-design/icons";
import '../../css/User.css';
import '../../css/Index.css';
import '../../css/Style.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BiMailSend, BiUser } from "react-icons/bi";
import logo from '../../../../assets/img/logofm.png'
const HeaderUS = () => {
    const [activeItem, setActiveItem] = useState(sessionStorage.getItem('activeItem') || 'Trang Chủ');
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        sessionStorage.setItem('activeItem', itemName);
    };
    const [hasOrder, setHasOrder] = useState(false);
    const name1 = sessionStorage.getItem('username');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get('https://localhost:7225/api/Carts/Tong', {
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
    const getname = () => {
        if (name1 === null) {
            return (
                <div style={{ display: 'flex' }}>
                    <Link to="/Login" className="nav-top-link nav-top-not-logged-in" data-open="#login-form-popup" style={{ marginTop: '3px' }}>
                        <span>
                            Đăng nhập
                        </span>
                    </Link>
                    <p style={{ margin: '5px 5px 2px 5px' }}>/</p>
                    <Link to="/signup" className="nav-top-link nav-top-not-logged-in" style={{ marginTop: '3px' }}>
                        <span>
                            Đăng ký
                        </span>
                    </Link>
                </div>
            )
        }
        else {
            return (
                <div className="stardust-popover-container">
                    <Link className='stardust-popover'>
                        <span>Xin chào, {name1}</span>
                    </Link>
                    <div
                        aria-describedby="stardust-popover1"
                        role="tooltip"
                        className="stardust-popover__popover"
                    >
                        <div className="stardust-popover__arrow"></div>
                        <div className="navbar-account-drawer__content">
                            <a className="navbar-account-drawer__button navbar-user-link" href="/user/account">
                                <span>Tài khoản của tôi</span>
                            </a>
                            <a className="navbar-account-drawer__button navbar-user-link" href="/user/purchase">
                                <span>Đơn Mua</span>
                            </a>
                            <button className="navbar-account-drawer__button navbar-account-drawer__button--complement navbar-user-link reset-button-style" onClick={handleLogout}>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                </div>

            )
        }
    }
    const handleLogout = () => {
        sessionStorage.removeItem('activeItem');
        sessionStorage.clear();
        window.location.reload();
    };
    const handleCartToggle = () => {
        setHasOrder(!hasOrder);
    };

    return (
        <header id="header" className="header has-sticky sticky-jump">
            <div className="header-wrapper">
                <div id="top-bar" className="header-top hide-for-sticky hide-for-medium">
                    <div className="flex-row container">
                        <div className="flex-col hide-for-medium flex-left">
                            <ul className="nav nav-left medium-nav-center nav-small  nav-divided">
                                <li className="header-contact-wrapper">
                                    <ul id="header-contact" className="nav nav-divided nav-uppercase header-contact">
                                        <li className=''>
                                            <Link to="/">
                                                <MailOutlined style={{ fontSize: '16px' }} className='i' />
                                                <span>
                                                    thanhtrinh@gmail.com
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <Link to="#" >
                                                <PhoneOutlined style={{ fontSize: '16px' }} className='i' />
                                                <span>1900 900 900</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- flex-col left --> */}

                        <div className="flex-col hide-for-medium flex-center">
                            <ul className="nav nav-center nav-small  nav-divided">
                            </ul>
                        </div>
                        {/* <!-- center --> */}

                        <div className="flex-col hide-for-medium flex-right">
                            <ul className="nav top-bar-nav nav-right nav-small  nav-divided">
                                <li className="account-item has-icon" style={{ display: 'flex' }}>
                                    <ul> {getname()}</ul>
                                    {/* <!-- .account-login-link --> */}
                                </li>
                                <li className="cart-item has-icon has-dropdown">
                                    <Link to='/Cart' title="Giỏ hàng" className="header-cart-link is-small">
                                        <span className="header-cart-title">
                                            Giỏ hàng / <span className="cart-price">
                                                <span className="woocommerce-Price-amount amount">+ {products}&nbsp;
                                                    <span className="woocommerce-Price-currencySymbol"></span>
                                                </span>
                                            </span>
                                        </span>
                                        <ShoppingCartOutlined className='i' />
                                    </Link>
                                    {/* {hasOrder ? (
                                        <ul className="nav-dropdown nav-dropdown-simple">
                                            <li className="html widget_shopping_cart">
                                                <div className="widget_shopping_cart_content">
                                                    <ul className="woocommerce-mini-cart cart_list product_list_widget ">
                                                        <li className="woocommerce-mini-cart-item mini_cart_item">
                                                            <a href="/" class="remove remove_from_cart_button" aria-label="Xóa sản phẩm này" data-product_id="683" data-cart_item_key="24681928425f5a9133504de568f5f6df" data-product_sku="a1-6">×</a>
                                                            <a href="/">
                                                                <img width="300" height="300" src="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" srcset="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-300x300.jpg 300w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-150x150.jpg 150w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-768x768.jpg 768w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-1024x1024.jpg 1024w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-600x600.jpg 600w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_ab2003c7b7e445f6a551b92f559c4881_master-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Cải bó xôi hữu cơ (Rau chân vịt) 350g
                                                            </a>
                                                            <span className="quantity">1 × <span className="woocommerce-Price-amount amount">29,000&nbsp;
                                                                <span className="woocommerce-Price-currencySymbol">₫</span>
                                                            </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <p className="woocommerce-mini-cart__total total">
                                                        <strong>Tổng phụ:</strong>
                                                        <span className="woocommerce-Price-amount amount">29,000&nbsp;
                                                            <span className="woocommerce-Price-currencySymbol">₫</span>
                                                        </span>
                                                    </p>
                                                    <p className="woocommerce-mini-cart__buttons buttons">
                                                        <a href="http://mauweb.monamedia.net/happytrade/gio-hang/" className="button wc-forward">Xem giỏ hàng</a>
                                                        <a href="http://mauweb.monamedia.net/happytrade/thanh-toan/" className="button checkout wc-forward">Thanh toán</a>
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>) : (
                                        <ul className="nav-dropdown nav-dropdown-simple">
                                            <li className="html widget_shopping_cart">
                                                <div className="widget_shopping_cart_content">
                                                    <p className="woocommerce-mini-cart__empty-message">Chưa có sản phẩm trong giỏ hàng.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    )} */}
                                    {/* <!-- .nav-dropdown --> */}
                                </li>
                            </ul>
                        </div>
                        {/* <!-- .flex-col right --> */}
                    </div>
                    {/* <!-- .flex-row --> */}
                </div>
                {/* <!-- #header-top --> */}
                <div id="masthead" className="header-main ">
                    <div className="header-inner flex-row container logo-left medium-logo-center" role="navigation">

                        {/* <!-- Logo --> */}
                        <div id="logo" className="flex-col logo">
                            {/* <!-- Header logo --> */}
                            <Link to="/" title="Happy Trade" rel="home">
                                <img width="250" height="100" src={logo} className="header_logo header-logo" alt="Happy Trade" />
                                <img width="250" height="100" src={logo} className="header-logo-dark" alt="Happy Trade" />
                            </Link>
                        </div>
                        {/* <!-- Mobile Left Elements --> */}
                        <div className="flex-col show-for-medium flex-left">
                            <ul className="mobile-nav nav nav-left ">
                                <li className="nav-icon has-icon">
                                    <div className="header-button">
                                        <Link to="#" data-open="#main-menu" data-pos="left" data-bg="main-menu-overlay" data-color="" className="icon button round is-outline is-small" aria-controls="main-menu" aria-expanded="false">
                                            <MenuOutlined className='i' />
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Left Elements --> */}
                        <div className="flex-col hide-for-medium flex-left flex-grow">
                            <ul className="header-nav header-nav-main nav nav-left  nav-box nav-size-large nav-spacing-xsmall nav-uppercase">
                                <li id="menu-item-24" className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-16 ${activeItem === 'Trang Chủ' ? 'current-menu-item' : ''}`}>
                                    <Link
                                        to="/"
                                        className={`nav-top-link ${activeItem === 'Trang Chủ' ? 'active' : ''}`}
                                        onClick={() => handleItemClick('Trang Chủ')}
                                    >
                                        Trang chủ
                                    </Link>
                                </li>
                                <li id="menu-item-22" className={`menu-item menu-item-type-post_type menu-item-object-page ${activeItem === 'Giới thiệu' ? 'current-menu-item' : ''}`}>
                                    <Link
                                        to="/introduce"
                                        className={`nav-top-link ${activeItem === 'Giới thiệu' ? 'active' : ''}`}
                                        onClick={() => handleItemClick('Giới thiệu')}
                                    >
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li id="menu-item-24" className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-16 ${activeItem === 'Sản Phẩm' ? 'current-menu-item' : ''}`}>
                                    <Link to='/product'
                                        className={`nav-top-link ${activeItem === 'Sản Phẩm' ? 'active' : ''}`}
                                        onClick={() => handleItemClick('Sản Phẩm')}
                                    >Sản Phẩm</Link>
                                </li>
                                <li id="menu-item-24" className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-16 ${activeItem === 'Danh bạ' ? 'current-menu-item' : ''}`}>
                                    <Link to="/danhbanhanong"
                                        className={`nav-top-link ${activeItem === 'Danh bạ' ? 'active' : ''}`}
                                        onClick={() => handleItemClick('Danh bạ')}
                                    >Danh bạ nhà nông</Link></li>
                                <li id="menu-item-25" className="menu-item menu-item-type-taxonomy menu-item-object-category  menu-item-25"></li>
                                <li id="menu-item-24" className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-16 ${activeItem === 'Kiến thức' ? 'current-menu-item' : ''}`}>
                                    <Link to="/kienthuc"
                                        className={`nav-top-link ${activeItem === 'Kiến thức' ? 'active' : ''}`}
                                        onClick={() => handleItemClick('Kiến thức')}
                                    >Kiến thức</Link></li>
                                <li id="menu-item-25" className="menu-item menu-item-type-taxonomy menu-item-object-category  menu-item-25"></li>
                            </ul>
                        </div>
                        {/* <!-- Right Elements --> */}
                        <div className="flex-col hide-for-medium flex-right">
                            <ul className="header-nav header-nav-main nav nav-right  nav-box nav-size-large nav-spacing-xsmall nav-uppercase">
                                <li className="header-search-form search-form html relative has-icon">
                                    <div className="header-search-form-wrapper">
                                        <div className="searchform-wrapper ux-search-box relative form-flat is-normal">

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Mobile Right Elements --> */}
                        <div className="flex-col show-for-medium flex-right">
                            <ul className="mobile-nav nav nav-right ">
                                <li className="header-search header-search-lightbox has-icon">
                                    <div className="header-button">
                                        <Link to="#" data-open="#search-lightbox" data-focus="input.search-field" className="icon button round is-outline is-small">
                                            {/* <i className="icon-search" style="font-size:16px;"></i> */}
                                            <SearchOutlined className='i' />
                                        </Link>
                                    </div>
                                    <div id="search-lightbox" className="mfp-hide dark text-center">
                                        <div className="searchform-wrapper ux-search-box relative form-flat is-large"><form role="search" method="get" className="searchform" action="http://mauweb.monamedia.net/happytrade/">
                                            <div className="flex-row relative">
                                                <div className="flex-col flex-grow">
                                                    <input type="search" className="search-field mb-0" name="s" placeholder="Tìm kiếm…" />
                                                    <input type="hidden" name="post_type" />
                                                </div>
                                                {/* <!-- .flex-col --> */}
                                                <div className="flex-col">
                                                    <button type="submit" className="ux-search-submit submit-button secondary button icon mb-0">
                                                        <SearchOutlined className='i' />
                                                    </button>
                                                </div>
                                                {/* <!-- .flex-col --> */}
                                            </div>
                                            {/* <!-- .flex-row --> */}
                                            <div className="live-search-results text-left z-top">
                                                <div className="autocomplete-suggestions" style={{ position: "absolute", display: "none" }}></div>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                    {/* <!-- .header-inner --> */}
                </div>
                {/* <!-- .header-main --> */}
                <div className="header-bg-container fill"><div className="header-bg-image fill"></div>
                    <div className="header-bg-color fill"></div>
                </div>
                {/* <!-- .header-bg-container -->    */}
            </div>
            {/* <!-- header-wrapper--> */}
        </header>
    )
}

export default HeaderUS