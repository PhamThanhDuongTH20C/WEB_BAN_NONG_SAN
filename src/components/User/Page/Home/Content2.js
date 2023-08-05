import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Content2 = () => {
  const usenavigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const sliderRef = useRef(null);
  const URL1 = 'https://localhost:7225/images/';

  useEffect(() => {
    // Make the API request to fetch all products
    fetch('https://localhost:7225/api/Products/productHot/true')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
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

  const AddCart = (item) => {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      toast.error('Xin Vui Lòng Đăng Nhập');
      usenavigate('/login');
    } else {
      const Url = 'https://localhost:7225/api/Carts';
      const data = {
        accountId: 1,
        productId: item,
        product: null,
        quantity: 1,
      };
      axios
        .post(Url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success('Thêm Sản Phẩm Thành Công');  window.location.reload();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  const CustomPrevArrow = (props) => (
    <div
      className="custom-prev-arrow"
      onClick={props.onClick}
    >
      <LeftOutlined />
    </div>
  );

  const CustomNextArrow = (props) => (
    <div
      className="custom-next-arrow"
      onClick={props.onClick}
    >
      <RightOutlined />
    </div>
  );

  // Slick slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-content relative">
      <div className="row" id="row-326220614">
        <div className="col small-12 large-12" data-animate="fadeInUp" data-animated="true">
          <div className="col-inner text-center" style={{ padding: '20px 0px 0px 0px' }}>
            <h1>Sản phẩm nổi bật</h1>
            <Slider ref={sliderRef} {...sliderSettings}>
              {products.map((product) => (
                <div className="col" key={product.id}>
                  <div className="col-inner card-radius">
                    <div className="badge-container absolute left top z-1"></div>
                    <div className="product-small box has-hover box-normal box-text-bottom">
                      <div className="box-image">
                        <Link to={`/PrDetails?id=${product.id}`}>
                          <div className="image-zoom image-cover" style={{ paddingTop: '100%' }}>
                            <img
                              width="540"
                              height="540"
                              src={URL1 + productImages[product.productId]?.imagepath}
                              className="attachment-original size-original"
                              alt={product.name}
                              srcSet={`${URL1 + productImages[product.productId]?.imagepath} 540w, ${URL1 + productImages[product.productId]?.imagepath} 150w, ${URL1 + productImages[product.productId]?.imagepath} 300w, ${URL1 + productImages[product.productId]?.imagepath} 100w`}
                              sizes="(max-width: 540px) 100vw, 540px"
                            />
                          </div>
                        </Link>
                        <div className="image-tools top right show-on-hover"></div>
                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover"></div>
                      </div>
                      <div className="box-text text-center">
                        <div className="title-wrapper">
                          <p className="name product-title">
                            <Link to={URL1 + productImages[product.productId]?.imagepath}>{product.name}</Link>
                          </p>
                        </div>
                        <div className="price-wrapper">
                          <span className="price">
                            <span className="woocommerce-Price-amount amount">
                              {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                            </span>
                          </span>
                        </div>
                        <div className="add-to-cart-button">
                          <button onClick={() => AddCart(product.id)}>Thêm Vào Giỏ</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content2;
