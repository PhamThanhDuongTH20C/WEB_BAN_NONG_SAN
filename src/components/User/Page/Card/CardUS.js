import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TagOutlined } from "@ant-design/icons"
import { number } from 'react-admin';
const CardUS = () => {
    const usenavigate = useNavigate();
    const [promotion, setPromotion] = useState("");
    const [promotionDetails, setPromotionDetails] = useState(0.0);
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [xuatpt, setxuatpt] = useState(0);
    const [quantities, setQuantities] = useState(Number);


    useEffect(() => {
        const newQuantities = {};
        products.forEach((product) => {
            if (product.quantity > 0) {
                newQuantities[product.id] = product.quantity;
            }
        });
        setQuantities(newQuantities);
    }, [products]);

    const getQuantity = (productId) => {
        return quantities[productId] || 1;
    };

    const incrementQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 1) + 1,
        }));
    };

    const decrementQuantity = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 1) - 1, 0),
        }));
    };

    const increupdate = async (productId, idcart, quantitiess) => {
        try {
            await incrementQuantity(productId);
            const token = sessionStorage.getItem('token');
            if (token === null) {
                toast.error("Xin Vui Lòng Đăng Nhập");

            } else {
                const Url = "https://localhost:7225/api/Carts/id/" + productId;
                const data = {
                    "accountId": 1,
                    "productId": idcart,
                    "product": null,
                    "quantity": quantitiess + 1,
                }

                axios.put(Url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(() => { toast.success("Thêm Sản Phẩm Thành Công");  window.location.reload(); }).catch((e) => { toast.error(e); })
            }
        } catch (e) {
            console.log(e)
        }

    }
    const decupdate = async (productId, idcart, quantitiess) => {
        try {
            await decrementQuantity(productId);

            const token = sessionStorage.getItem('token');
            if (token === null) {
                toast.error("Xin Vui Lòng Đăng Nhập");

            } else {
                const Url = "https://localhost:7225/api/Carts/id/" + productId;
                const data = {
                    "accountId": 1,
                    "productId": idcart,
                    "product": null,
                    "quantity": quantitiess - 1,
                }

                axios.put(Url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(() => {
                    toast.success("Thêm Sản Phẩm Thành Công");
                    window.location.reload();
                }).catch((e) => { toast.error(e); })
            }
        } catch (e) {
            console.log(e)
        }

    }
    var URL1 = 'https://localhost:7225/images/';

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
        const fetchProductImages = async () => {
            const imagePromises = products.map((product) =>
                fetch(`https://localhost:7225/api/ProductImages/api/productimages/${product.product.productId}`)
                    .then((response) => response.json())
                    .then((data) => ({ productId: product.product.productId, imagepath: data }))
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

    const deletecard = (id) => {
        const token = sessionStorage.getItem('token');
        if (token === null) {
            toast.error("Xin Vui Lòng Đăng Nhập");
        } else {

            axios.delete("https://localhost:7225/api/Carts/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => { toast.success("Xóa Sản Phẩm Thành Công"); }).catch((e) => { toast.error(e); })
        }

    }
    const [quantity, setQuantity] = useState(1);

    const calculateSubtotal = (productId) => {
        const quantity = getQuantity(productId);
        const selectedProduct = products.find((product) => product.id === productId);

        if (selectedProduct) {
            return quantity * selectedProduct.product.price;
        }

        return 0;
    };
    const calculateTotal = () => {
        let total = 0;

        products.forEach((product) => {
            const subtotal = calculateSubtotal(product.id);
            total += subtotal;
        });

        return total;
    };
    const calculateTotal1 = (discount) => {
        let total = 0;
        let finalTotal;

        products.forEach((product) => {
            const subtotal = calculateSubtotal(product.id);
            total += subtotal;
        });

        if (discount > 0) {
            finalTotal = total - (total * discount);

        } else {
            finalTotal = total;
        }

        return finalTotal;
    };


    const fetchProductPromotion = async (promotionCode) => {
        try {
            const response = await axios.get("https://localhost:7225/api/ProductPromotions/statustrue?status=true&description=" + promotionCode);
            console.log("dddsadas", response.data)
            setPromotionDetails(response.data);
            setxuatpt(response.data[0].percent)
        } catch (error) {
            console.log('Error fetching product promotion:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchProductPromotion(promotion);
    };
    const KTthanhtoan = (GT) => {
        if (GT > 0) {
            usenavigate(`/Odrersp?id=${calculateTotal1(xuatpt)}`);

        }
    }
    return (
        <div className="row row-main">
            <div className="large-12 col">
                <div className="col-inner">
                    <div className="woocommerce">
                        <div className="woocommerce-notices-wrapper"></div>
                        <div className="woocommerce row row-large row-divided">
                            <div className="col large-7 pb-0 ">
                                <form>
                                    <div >
                                        <table >
                                            <thead style={{ borderBottom: '1px solid #a4a2a2' }}>
                                                <tr>
                                                    <th className="product-name" colSpan="3">Sản phẩm</th>
                                                    <th className="product-price">Giá</th>
                                                    <th className="product-quantity">Số lượng</th>
                                                    <th className="product-subtotal">Tổng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => {
                                                    return (
                                                        <tr key={product.id}>
                                                            <td>
                                                                <button onClick={() => deletecard(product.id)}>x</button>
                                                            </td>
                                                            <td className="product-thumbnail">
                                                                <img
                                                                    width="300"
                                                                    height="300"
                                                                    src={URL1 + productImages[product.product.productId]?.imagepath}
                                                                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                                                    alt=""
                                                                    srcSet={`${URL1 + productImages[product.product.productId]?.imagepath} 300w, ${URL1 + productImages[product.product.productId]?.imagepath} 150w, ${URL1 + productImages[product.product.productId]?.imagepath} 600w, ${URL1 + productImages[product.product.productId]?.imagepath} 100w`}
                                                                    sizes="(max-width: 300px) 100vw, 300px"
                                                                />
                                                            </td>
                                                            <td>{product.product.name}</td>
                                                            <td className="product-price" data-title="Giá">
                                                                {product.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </td>
                                                            <td className="product-quantity" data-title="Số lượng">
                                                                <div className="quantity buttons_added">
                                                                <input
                                                                    type="button"
                                                                    value="-"
                                                                    className="minus button is-form"
                                                                    onClick={() => decupdate(product.id, product.product.id, getQuantity(product.id))}
                                                                    />
                                                                    <label className="screen-reader-text" htmlFor={`quantity_${product.id}`}>
                                                                    Số lượng
                                                                    </label>
                                                                    <input
                                                                    type="number"
                                                                    value={getQuantity(product.id)}
                                                                    onChange={(e) => setQuantity(product.id, e.target.value)}
                                                                    readOnly
                                                                    className="no-spinner"
                                                                    />
                                                                    <input
                                                                    type="button"
                                                                    value="+"
                                                                    className="plus button is-form"
                                                                    onClick={() => {
                                                                        const currentQuantity = getQuantity(product.id);
                                                                        if (currentQuantity < 5) {
                                                                        increupdate(product.id, product.product.id, currentQuantity);
                                                                        }
                                                                    }}
                                                                    disabled={getQuantity(product.id) === 5} // Disable the button if quantity is equal to 5
                                                                    />

                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal" data-title="Tổng">
                                                                {calculateSubtotal(product.id).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                <tr>
                                                    <td colSpan="6" className="actions clear">
                                                        <div className="continue-shopping pull-left text-left">
                                                            <Link className='button-continue-shopping button primary is-outline' to='/login/product'>
                                                                ← Tiếp tục xem sản phẩm
                                                            </Link>
                                                        </div>
                                                        <button type="submit" className="button primary mt-0 pull-left small" style={{ backgroundColor: '#6abd45' }} name="update_cart">Cập nhật giỏ hàng</button>
                                                        <input type="hidden" id="woocommerce-cart-nonce" name="woocommerce-cart-nonce" />
                                                        <input type="hidden" name="_wp_http_referer" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                            <div className="cart-collaterals large-5 col pb-0">
                                <div className="cart-sidebar col-inner ">
                                    <div className="cart_totals ">
                                        <table cellSpacing="1">
                                            <thead>
                                                <tr>
                                                    <th className="product-name" colSpan="2" style={{ borderWidth: "3px" }}>Tổng số lượng</th>
                                                </tr>
                                            </thead>
                                        </table>

                                        <h2>Tổng số lượng</h2>

                                        <table cellSpacing="0" className="shop_table shop_table_responsive">
                                            <tbody>
                                                <tr className="cart-subtotal">
                                                    <th>Tổng phụ</th>
                                                    <td data-title="Tổng phụ">
                                                        <span className="woocommerce-Price-amount amount">{calculateTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr className="woocommerce-shipping-totals shipping">
                                                    <td className="shipping__inner" colSpan="2">
                                                        <table className="shipping__table ">
                                                            <tbody>
                                                                <tr>
                                                                    <th>Giao hàng</th>
                                                                    <td data-title="Giao hàng">
                                                                        <ul id="shipping_method" className="shipping__list woocommerce-shipping-methods">
                                                                            <li className="shipping__list_item">
                                                                                <input type="hidden" name="shipping_method[0]" data-index="0" id="shipping_method_0_free_shipping2" className="shipping_method" />
                                                                                <label className="shipping__list_label">Giao hàng miễn phí</label>								</li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>   <tr className="order-total">
                                                    <th>Giảm Giá</th>
                                                    <td data-title="Tổng">
                                                        <strong>
                                                            <span className="woocommerce-Price-amount amount">
                                                                - {(calculateTotal() * xuatpt).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                                                            </span>
                                                        </strong>

                                                    </td>
                                                </tr>
                                                <tr className="order-total">
                                                    <th>Tổng</th>
                                                    <td data-title="Tổng">
                                                        <strong>
                                                            <span className="woocommerce-Price-amount amount">{calculateTotal1(promotionDetails[0]?.percent).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                                                            </span>
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="coupon">
                                            <div style={{display:'flex'}}>
                                                <input
                                                    type="text"
                                                    name="coupon_code"
                                                    value={promotion}
                                                    onChange={(e) => setPromotion(e.target.value)}
                                                    placeholder="Mã ưu đãi"
                                                    style={{marginRight:'10px'}}
                                                />
                                                <input type="submit" style={{ backgroundColor: '#6abd45' }} value='Áp dụng' />
                                            </div>

                                        </div>
                                        <div type="button"
                                            className="btn btn-solid-primary btn--m btn--inline"
                                            aria-disabled="false" >
                                            <div>
                                                <span onClick={() => KTthanhtoan(calculateTotal1(xuatpt))}> Tiến hành thanh toán</span>
                                            </div>
                                        </div>
                                    </form>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardUS