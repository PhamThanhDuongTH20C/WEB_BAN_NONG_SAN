import React from 'react'
import ListCard from './ListCard'
import { Link, useNavigate, Routes, Route } from 'react-router-dom'
import Describe from './Describe';
import Reviews from './Reviews';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const PrDetails = () => {
    const usenavigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    var URL1 = 'https://localhost:7225/images/';
    useEffect(() => {

        axios.get('https://localhost:7225/api/Products/id/' + id)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        const fetchProductImages = async () => {
            const imagePromises = products.map((product) =>
                fetch(`https://localhost:7225/api/ProductImages/api/productimages/${product.productId}`)
                    .then((response) => response.json())
                    .then((data) => ({ productId: product.productId, imagepath: data }))
            );

            const imageResponses = await Promise.all(imagePromises);
            const imageMap = imageResponses.reduce((acc, response) => {
                acc[response.productId] = response.imagepath;
                return acc;
            }, {});

            setProductImages(imageMap);
        };

        fetchProductImages();
    }, [products]);

    const AddCart = (item, Slh) => {
        const token = sessionStorage.getItem('token');
        if (token === null) {
            toast.error("Xin Vui Lòng Đăng Nhập");
            usenavigate("/login");
        } else {
            const Url = "https://localhost:7225/api/Carts";
            const data = {
                "accountId": 1,
                "productId": item,
                "product": null,
                "quantity": Slh,
            }

            axios.post(Url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => { toast.success("Thêm Sản Phẩm Thành Công");  window.location.reload(); }).catch((e) => { toast.error(e); })
        }

    }
    const [activeTab, setActiveTab] = useState('description');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleReviewsClick = () => {
        setActiveTab('reviews');
    };
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (quantity < 5) {
          setQuantity(prevQuantity => prevQuantity + 1);
        }
      };
      

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className='shop-container'>
            <div>
                <div className='product-main'>
                    <div className='row content-row mb-0'>
                        {products.map((product) => (<div className='product-gallery large-6 col'>
                            <div style={{ opacity: '1' }}>
                                <div class="badge-container is-larger absolute left top z-1"></div>
                                <div class="image-tools absolute top show-on-hover right z-3"></div>
                                <figure class="woocommerce-product-gallery__wrapper product-gallery-slider slider slider-nav-small mb-half flickity-enabled" data-flickity-options="{
                                        &quot;cellAlign&quot;: &quot;center&quot;,
                                        &quot;wrapAround&quot;: true,
                                        &quot;autoPlay&quot;: false,
                                        &quot;prevNextButtons&quot;:true,
                                        &quot;adaptiveHeight&quot;: true,
                                        &quot;imagesLoaded&quot;: true,
                                        &quot;lazyLoad&quot;: 1,
                                        &quot;dragThreshold&quot; : 15,
                                        &quot;pageDots&quot;: false,
                                        &quot;rightToLeft&quot;: false       }" tabindex="0">
                                    <div class="flickity-viewport" style={{ height: '576.667px', touchAction: 'pan-y' }}>
                                        <div class="flickity-slider" style={{ left: '0px', transform: 'translateX(0%)' }}>
                                            <div data-thumb={URL1 + productImages[product.productId]?.imagepath} class={URL1 + productImages[product.productId]?.imagepath} aria-selected="true" style={{ position: 'absolute', left: '0%' }}>
                                                <Link to={URL1 + productImages[product.productId]?.imagepath}>
                                                    <img width="600" height="600" src={URL1 + productImages[product.productId]?.imagepath}
                                                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                                        alt=""
                                                        srcSet={`${URL1 + productImages[product.productId]?.imagepath} 300w, ${URL1 + productImages[product.productId]?.imagepath} 150w, ${URL1 + productImages[product.productId]?.imagepath}600w, ${URL1 + productImages[product.productId]?.imagepath} 100w`}
                                                        sizes="(max-width: 300px) 100vw, 300px"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="flickity-button flickity-prev-next-button previous" type="button" disabled="" aria-label="Previous">
                                        <svg class="flickity-button-icon" viewBox="0 0 100 100">
                                            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow">
                                            </path>
                                        </svg>
                                    </button>
                                    <button class="flickity-button flickity-prev-next-button next" type="button" disabled="" aria-label="Next">
                                        <svg class="flickity-button-icon" viewBox="0 0 100 100">
                                            <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) ">
                                            </path>
                                        </svg>
                                    </button>
                                </figure>
                            </div>
                        </div>))}
                        {products.map((product) => (<div class="product-info summary col-fit col entry-summary product-summary">
                            {/* <nav class="woocommerce-breadcrumb breadcrumbs"><Link to="">Trang chủ</Link>      
                            </nav> */}
                            <h1 class="product-title product_title entry-title">
                                {product.name}
                            </h1>
                            <div class="is-divider small"></div>
                            <ul class="next-prev-thumbs is-small show-for-medium">
                                <li class="prod-dropdown has-dropdown">
                                    <Link to="" rel="next" class="button icon is-outline circle">
                                        <i class="icon-angle-left"></i>
                                    </Link>
                                    <div class="nav-dropdown">
                                        <Link title="Sầu riêng Ri6 sạch 1kg" to="http://mauweb.monamedia.net/happytrade/san-pham/sau-rieng-ri6-sach-1kg/">
                                            <img width="100" height="100" src="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-100x100.jpg" class="attachment-woocommerce_gallery_thumbnail size-woocommerce_gallery_thumbnail wp-post-image" alt="" srcset="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-100x100.jpg 100w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-150x150.jpg 150w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master-300x300.jpg 300w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/sau_rieng_ri6_2_5635cf70bdbc413db7ccdb9bbc5955ed_master.jpg 596w" sizes="(max-width: 100px) 100vw, 100px" />
                                        </Link>
                                    </div>
                                </li>
                                <li class="prod-dropdown has-dropdown">
                                    <Link to="http://mauweb.monamedia.net/happytrade/san-pham/cam-xoan-huong-huu-co-1kg/" rel="next" class="button icon is-outline circle">
                                        <i class="icon-angle-right"></i>
                                    </Link>
                                    <div class="nav-dropdown">
                                        <Link title="Cam xoàn hướng hữu cơ 1kg" to="http://mauweb.monamedia.net/happytrade/san-pham/cam-xoan-huong-huu-co-1kg/">
                                            <img width="100" height="100" src="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1c4b595369214f1da01e1ee7dfe9b948_master-100x100.jpg" class="attachment-woocommerce_gallery_thumbnail size-woocommerce_gallery_thumbnail wp-post-image" alt="" srcset="http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1c4b595369214f1da01e1ee7dfe9b948_master-100x100.jpg 100w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1c4b595369214f1da01e1ee7dfe9b948_master-150x150.jpg 150w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1c4b595369214f1da01e1ee7dfe9b948_master-300x300.jpg 300w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1c4b595369214f1da01e1ee7dfe9b948_master-600x600.jpg 600w, http://mauweb.monamedia.net/happytrade/wp-content/uploads/2019/05/upload_1c4b595369214f1da01e1ee7dfe9b948_master.jpg 720w" sizes="(max-width: 100px) 100vw, 100px" />
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                            <div class="price-wrapper">
                                <p class="price product-page-price ">
                                    <span class="woocommerce-Price-amount amount">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                                    </span>
                                </p>
                            </div>
                            <div class="product-short-description">
                                <p><i class="fa fa-check-square-o">&nbsp;&nbsp;</i>Gọi mua hàng 1900 636 648</p>
                                <p><i class="fa fa-check-square-o">&nbsp;&nbsp;</i>Đảm bảo tươi ngon</p>
                                <p><i class="fa fa-check-square-o" style={{ fontSize: '14.4px' }}>&nbsp;&nbsp;</i>
                                    <span style={{ fontSize: '14.4px' }}>Giao hàng trực tiếp từ vườn</span></p>
                                <p><i class="fa fa-check-square-o" style={{ fontSize: '14.4px' }}>&nbsp;&nbsp;</i>
                                    <span style={{ fontSize: '14.4px' }}>Đổi trả trong vòng 24h</span></p>
                            </div>
                            <div className="quantity buttons_added">
                                <button className="minus button is-form" onClick={decrementQuantity}>-</button>
                                <label className="screen-reader-text" htmlFor="quantityInput">Số lượng</label>
                                <input
                                    type="number"
                                    id="quantityInput"
                                    className=""
                                    step="1"
                                    min="1"
                                    max="9999"
                                    name=""
                                    value={quantity}
                                    title="SL"
                                    size="4"
                                    pattern="[0-9]*"
                                    inputMode=""
                                    aria-labelledby=""
                                    readOnly
                                />
                                <button className="plus button is-form" onClick={incrementQuantity}>+</button>
                            </div>
                            <button class="single_add_to_cart_button button alt" onClick={() => AddCart(product.id, quantity)}>Thêm Vào Giỏ</button>

                            <ListCard />
                        </div>))}
                    </div>
                </div>
                <div class="product-footer">
                    <div class="container">
                        <div className='woocommerce-tabs container tabbed-content'>
                            <ul className="product-tabs small-nav-collapse tabs nav nav-uppercase nav-pills nav-left">
                                <li className={`description_tab ${activeTab === 'description' ? 'active' : ''}`}>
                                    <button onClick={() => handleTabClick('description')}>
                                        Mô tả
                                    </button>
                                </li>
                                <li className={`reviews_tab ${activeTab === 'reviews' ? 'active' : ''}`}>
                                    <button onClick={() => handleTabClick('reviews')}>
                                        Bình luận
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-panels">
                                {activeTab === 'description' ? (
                                    <Describe />
                                ) : (
                                    <Reviews />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PrDetails