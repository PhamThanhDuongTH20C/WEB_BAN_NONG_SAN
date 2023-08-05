import React from 'react'
import { Link } from "react-router-dom";
import {
    SendOutlined,
    FacebookOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    InstagramOutlined
} from "@ant-design/icons";
import '../../css/User.css';
import '../../css/Index.css';
import '../../css/Style.css';
import logo from '../../../../assets/img/logofm.png'

const FooterUS = () => {
    return (
        <footer id='footer' className='footer-wrapper'>
            <section className='section sec_footer dark' id='section_1216321471'>
                <div className='bg section-bg fill bg-fill  bg-loaded'></div>
                <div className='section-content relative'>
                    <div className='gap-element clearfix' style={{ display: 'block', height: 'auto', paddingTop: '40px' }}></div>
                    <div className='row align-center' id='row-1960953384'>
                        <div className='col medium-5 small-11 large-3'>
                            <div className='col-inner'>
                                <div className='img has-hover x md-x lg-x y md-y lg-y' id='image_945325517'>
                                    <div className='img-inner dark'>
                                    <img width="250" height="100" src={logo} className="header_logo header-logo" alt="Happy Trade" />
                                    </div>
                                </div>
                                <div className='icon-box featured-box icon-box-left text-left'>
                                    <div className='icon-box-img' style={{ width: "20px" }}>
                                        <div className='icon'>
                                            <div className='icon-inner'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='icon-box-text last-reset'>
                                        <p>
                                            319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
                                        </p>
                                    </div>
                                </div>
                                <div className='icon-box featured-box icon-box-left text-left'>
                                    <div className='icon-box-img' style={{ width: "20px" }}>
                                        <div className='icon'>
                                            <div className='icon-inner'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='icon-box-text last-reset'>
                                        <p>
                                            0981 406 203
                                        </p>
                                    </div>
                                </div>
                                <div className='icon-box featured-box icon-box-left text-left'>
                                    <div className='icon-box-img' style={{ width: "20px" }}>
                                        <div className='icon'>
                                            <div className='icon-inner'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='icon-box-text last-reset'>
                                        <p>
                                            thanhtrinh@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <div className='icon-box featured-box icon-box-left text-left'>
                                    <div className='icon-box-img' style={{ width: "20px" }}>
                                        <div className='icon'>
                                            <div className='icon-inner'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skype" viewBox="0 0 16 16">
                                                    <path d="M4.671 0c.88 0 1.733.247 2.468.702a7.423 7.423 0 0 1 6.02 2.118 7.372 7.372 0 0 1 2.167 5.215c0 .344-.024.687-.072 1.026a4.662 4.662 0 0 1 .6 2.281 4.645 4.645 0 0 1-1.37 3.294A4.673 4.673 0 0 1 11.18 16c-.84 0-1.658-.226-2.37-.644a7.423 7.423 0 0 1-6.114-2.107A7.374 7.374 0 0 1 .529 8.035c0-.363.026-.724.08-1.081a4.644 4.644 0 0 1 .76-5.59A4.68 4.68 0 0 1 4.67 0zm.447 7.01c.18.309.43.572.729.769a7.07 7.07 0 0 0 1.257.653c.492.205.873.38 1.145.523.229.112.437.264.615.448.135.142.21.331.21.528a.872.872 0 0 1-.335.723c-.291.196-.64.289-.99.264a2.618 2.618 0 0 1-1.048-.206 11.44 11.44 0 0 1-.532-.253 1.284 1.284 0 0 0-.587-.15.717.717 0 0 0-.501.176.63.63 0 0 0-.195.491.796.796 0 0 0 .148.482 1.2 1.2 0 0 0 .456.354 5.113 5.113 0 0 0 2.212.419 4.554 4.554 0 0 0 1.624-.265 2.296 2.296 0 0 0 1.08-.801c.267-.39.402-.855.386-1.327a2.09 2.09 0 0 0-.279-1.101 2.53 2.53 0 0 0-.772-.792A7.198 7.198 0 0 0 8.486 7.3a1.05 1.05 0 0 0-.145-.058 18.182 18.182 0 0 1-1.013-.447 1.827 1.827 0 0 1-.54-.387.727.727 0 0 1-.2-.508.805.805 0 0 1 .385-.723 1.76 1.76 0 0 1 .968-.247c.26-.003.52.03.772.096.274.079.542.177.802.293.105.049.22.075.336.076a.6.6 0 0 0 .453-.19.69.69 0 0 0 .18-.496.717.717 0 0 0-.17-.476 1.374 1.374 0 0 0-.556-.354 3.69 3.69 0 0 0-.708-.183 5.963 5.963 0 0 0-1.022-.078 4.53 4.53 0 0 0-1.536.258 2.71 2.71 0 0 0-1.174.784 1.91 1.91 0 0 0-.45 1.287c-.01.37.076.736.25 1.063z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='icon-box-text last-reset'>
                                        <p>
                                            thanhtrinh.in
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col medium-3 small-6 large-2">
                            <div className="col-inner">
                                <div className="gap-element clearfix" style={{ display: "block", height: "auto", paddingTop: "20px" }}></div>
                                <h3 className="move">SẢN PHẨM</h3>
                                <ul className="sidebar-wrapper ul-reset"><div id="nav_menu-4" className="col pb-0 widget widget_nav_menu">
                                    <div className="menu-menu-product-container">
                                        <ul id="menu-menu-product" className="menu">
                                            <li id="menu-item-894" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-894">
                                                <Link to="/">Rau củ</Link>
                                            </li>
                                            <li id="menu-item-895" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-895">
                                                <Link to="/">Hải sản</Link>
                                            </li>
                                            <li id="menu-item-896" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-896">
                                                <Link to="/">Trái cây</Link>
                                            </li>
                                            <li id="menu-item-897" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-897">
                                                <Link to="/">Đồ uống</Link>
                                            </li>
                                            <li id="menu-item-899" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-899">
                                                <Link to="/">Thịt trứng</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                </ul>
                            </div>

                        </div>
                        <div className="col medium-3 small-6 large-2">
                            <div className="col-inner">
                                <div className="gap-element clearfix" style={{ display: "block", height: "auto", paddingTop: "20px" }}></div>
                                <h3>DANH MỤC</h3>
                                <ul className="sidebar-wrapper ul-reset">
                                    <div className="mona_sidebar_footer">
                                        <div className="menu-menu-footer-company-container">
                                            <ul id="menu-menu-footer-company" className="menu">
                                                <li id="menu-item-361" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-16 current_page_item menu-item-361">
                                                    <Link to="/">Trang chủ</Link>
                                                </li>
                                                <li id="menu-item-363" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-363">
                                                    <Link to="/">Giới thiệu</Link>
                                                </li>
                                                <li id="menu-item-362" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-362">
                                                    <Link to="/">Sản Phẩm </Link>
                                                </li>
                                                <li id="menu-item-365" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-365">
                                                    <Link to="/">Kiến thức</Link>
                                                </li>
                                                <li id="menu-item-364" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-364">
                                                    <Link to="/">Liên hệ</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col hide-for-small medium-4 small-11 large-2">
                            <div className="col-inner">
                                <div className="gap-element clearfix" style={{ display: "block", height: "auto", paddingTop: "20px" }}></div>
                                <h3 className="move">DỊCH VỤ</h3>
                                <ul className="sidebar-wrapper ul-reset">
                                    <div id="nav_menu-4" className="col pb-0 widget widget_nav_menu">
                                        <div className="menu-menu-product-container">
                                            <ul id="menu-menu-product-1" className="menu">
                                                <li className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-894">
                                                    <Link to="/">Rau củ</Link>
                                                </li>
                                                <li className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-895">
                                                    <Link to="/">Hải sản</Link>
                                                </li>
                                                <li className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-896">
                                                    <Link to="/">Trái cây</Link>
                                                </li>
                                                <li className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-897">
                                                    <Link to="/">Đồ uống</Link>
                                                </li>
                                                <li className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-899">
                                                    <Link to="/">Thịt trứng</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className='col medium-7 small-11 large-3'>
                            <div className='col-inner'>
                                <div className='gap-element clearfix' style={{ display: "block", height: "auto", paddingTop: "20px" }}></div>
                                <h3>ĐĂNG KÝ</h3>
                                <p>Đăng ký để nhận được được thông tin mới nhất từ chúng tôi.</p>
                                <div role="form" className="wpcf7" id="wpcf7-f256-o1" lang="vi" dir="ltr">
                                    <div className="screen-reader-response"></div>
                                    <form action='/happytrade/#wpcf7-f256-o1' method='post' className='wpcf7-form'>
                                        <p>
                                            <span className="wpcf7-form-control-wrap email-dang-ky">
                                                <input type="email" name="email-dang-ky"  size="40" className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email form_dang_ky" id="email-dang-ky" aria-required="true" aria-invalid="false" placeholder="Email ..." />
                                            </span>
                                            {/* </br> */}
                                            <label id="btn-gui-icon">
                                                <SendOutlined />
                                                <input type="submit" className="wpcf7-form-control wpcf7-submit form_dang_ky mona-hiden" />
                                                <span className="ajax-loader"></span>
                                            </label>
                                        </p>
                                        <div className="wpcf7-response-output wpcf7-display-none"></div>
                                    </form>
                                    <div className="social-icons follow-icons" style={{ fontSize: "120%" }}>
                                        <Link to="#" target="_blank" data-label="Facebook" rel="noopener noreferrer nofollow" className="icon plain facebook">
                                            <FacebookOutlined/>
                                        </Link>
                                        <Link to="#" target="_blank" rel="noopener noreferrer nofollow" data-label="Instagram" className="icon plain  instagram">
                                            <InstagramOutlined />
                                        </Link>
                                        <Link to="#" target="_blank" data-label="Twitter" rel="noopener noreferrer nofollow" className="icon plain  twitter">
                                            <TwitterOutlined />
                                        </Link>
                                        <Link to="#" target="_blank" rel="noopener noreferrer nofollow" data-label="YouTube" className="icon plain  youtube">
                                            <YoutubeOutlined />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default FooterUS