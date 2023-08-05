import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { number } from 'react-admin';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  MailOutlined,
  PhoneOutlined,
  DownOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from "@ant-design/icons";
const Product = () => {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const usenavigate = useNavigate();
  const idpro = Number(localStorage.getItem("idpro"));
  const [Tu, setTU] = useState(Number);
  const [Den, setDen] = useState(Number);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisableSubmit(false);
  };
  const handleSearch = () => {
    if (searchQuery !== '') {
      fetch('https://localhost:7225/api/Products/product/' + searchQuery)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
    } else if (Den > Tu) {
      fetch(`https://localhost:7225/api/Products/price?minPrice=${Tu}&maxPrice=${Den}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
    }
  };

  const handleClick = (value) => {
    if (value === "All") {
      localStorage.setItem("idpro", 6);
      window.location.reload();
    } else if (value === "Rau củ") {
      localStorage.setItem("idpro", 1);
      window.location.reload();
    } else if (value === "Hải sản") {
      localStorage.setItem("idpro", 4);
      window.location.reload();
    } else if (value === "Trái cây") {
      localStorage.setItem("idpro", 3);
      window.location.reload();
    } else if (value === "Thịt Tươi") {
      localStorage.setItem("idpro", 2);
      window.location.reload();
    } else if (value === "Trứng") {
      localStorage.setItem("idpro", 5);
      window.location.reload();
    }
  };
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  var URL1 = 'https://localhost:7225/images/';
  var URL2 = 'https://localhost:7225/api/Products';
  var URL3 = 'https://localhost:7225/api/Products/' + idpro;
  useEffect(() => {


    if (idpro === 6) {
      fetch(URL2)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
    } else {
      fetch(URL3)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
    }

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
      toast.error("Xin Vui Lòng Đăng Nhập");
      usenavigate("/login");
    } else {
      const Url = "https://localhost:7225/api/Carts";
      const data = {
        "accountId": 1,
        "productId": item,
        "product": null,
        "quantity": 1,
      }

      axios.post(Url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(() => { toast.success("Thêm Sản Phẩm Thành Công");  window.location.reload();}).catch((e) => { toast.error(e); })
    }

  }

  const [productss, setProductss] = useState([]);
  const [productImagess, setProductImagess] = useState({});
  var URL1 = 'https://localhost:7225/images/';
  useEffect(() => {
    // Make the API request to fetch all products
    fetch('https://localhost:7225/api/Products/new?productNew=true')
      .then((response) => response.json())
      .then((data) => setProductss(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchProductImages = async () => {
      const imagePromises = productss.map((product) =>
        fetch(`https://localhost:7225/api/ProductImages/api/productimages/${product.productId}`)
          .then((response) => response.json())
          .then((data) => ({ productId: product.productId, imagepath: data }))
      );

      const imageResponses = await Promise.all(imagePromises);
      const imageMap = imageResponses.reduce((acc, response) => {
        acc[response.productId] = response.imagepath;
        return acc;
      }, {});

      setProductImagess(imageMap);
    };

    fetchProductImages();
  }, [productss]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const offset = (currentPage - 1) * productsPerPage;
  const currentProducts = searchResults.length > 0 ? searchResults : products.slice(offset, offset + productsPerPage);
  const totalPages = Math.ceil((searchResults.length > 0 ? searchResults.length : products.length) / productsPerPage);

  return (
    <>
      <div className="shop-page-title category-page-title page-title ">
        <div className="page-title-inner flex-row  medium-flex-wrap container">
          <div className="flex-col flex-grow medium-text-center">
            <div className="is-large">
              <nav className="woocommerce-breadcrumb breadcrumbs"><a>Trang chủ</a>
                <span className="divider"></span> </nav>
            </div>
            <div className="category-filtering category-filter-row show-for-medium">
              <a href="#" data-open="#shop-sidebar" data-visible-after="true" data-pos="left" className="filter-button uppercase plain">
                <i className="icon-menu"></i>
                <strong>Lọc</strong>
              </a>
              <div className="inline-block">
              </div>
            </div>
          </div>
          <div className="flex-col medium-text-center" style={{ display: 'flex' }}>
            <input
              name="search"
              value={searchQuery}
              placeholder="Tìm kiếm…"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="ux-search-submit submit-button secondary button icon mb-0">
              <SearchOutlined className="i" />
            </button>
          </div>
        </div>
      </div>
      <div className='row category-page-row'>
        <div className="col large-3 hide-for-medium ">
          <div id="shop-sidebar" className="sidebar-inner col-inner">
            <aside id="nav_menu-2" className="widget widget_nav_menu">
              <span className="widget-title shop-sidebar">Danh mục sản phẩm </span>
              <div className="is-divider small"></div>
              <div className="menu-danh-muc-san-pham-vertical-menu-container">
                <ul id="menu-danh-muc-san-pham-vertical-menu" className="menu">
                  <li id="" className=''>
                    <a onClick={() => handleClick("All")}>Tất Cả Sản Phẩm</a>
                  </li>
                  <li id="menu-item-705" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-705">
                    <a onClick={() => handleClick("Rau củ")}>Rau củ</a>
                  </li>
                  <li id="menu-item-706" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat current-menu-item menu-item-706">
                    <a onClick={() => handleClick("Hải sản")}>Hải sản</a>
                  </li>
                  <li id="menu-item-707" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-707">
                    <a onClick={() => handleClick("Trái cây")}>Trái cây</a>
                  </li>
                  <li id="menu-item-708" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-708">
                    <a onClick={() => handleClick("Thịt Tươi")}>Thịt Tươi</a>
                  </li>
                  <li id="menu-item-710" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-710">
                    <a onClick={() => handleClick("Trứng")}>Trứng</a>
                  </li>
                </ul>
              </div>
            </aside>
            <aside id="woocommerce_price_filter-2" className="widget woocommerce widget_price_filter">
              <span className="widget-title shop-sidebar">Lọc theo giá</span>
              <div className="is-divider small">
              </div>
              <form
                onSubmit={handleSubmit}>
                <div className="price_slider_wrapper">
                  <div className="price_slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
                    <div className="ui-slider-range ui-widget-header ui-corner-all" style={{ left: '0%', width: '100%' }}></div>
                    <span className="ui-slider-handle ui-state-default ui-corner-all" style={{ left: '0%' }}></span>
                    <span className="ui-slider-handle ui-state-default ui-corner-all" style={{ left: '100%' }}></span>
                  </div>
                  <div className="price_slider_amount">

                    <div className="price_label">
                      <div style={{ display: 'flex' }}>
                        <span className="from" style={{ marginTop: '10px', paddingRight: '5px' }}>Từ</span>
                        <input type="number" style={{ width: '50px', marginLeft: '6px' }} name="price" id="price" value={Tu} onChange={(e) => setTU(e.target.value)} required></input>
                        <span className="from" style={{ marginTop: '10px', paddingLeft: '5px' }}>VNĐ</span>
                      </div>
                      <div className="price_label"></div>
                      <div style={{ display: 'flex' }}>
                        <span className="from" style={{ marginTop: '10px', paddingRight: '5px' }}>Đến</span>
                        <input type="number" name="price" style={{ width: '50px' }} id="price" value={Den} onChange={(e) => setDen(e.target.value)} required></input>
                        <span className="from" style={{ marginTop: '10px', paddingLeft: '5px' }}>VNĐ</span>
                      </div>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <button onClick={handleSearch} className="button">Lọc </button>
                </div>
              </form>

            </aside>
            <aside id="woocommerce_products-3" className="widget woocommerce widget_products">
              <span className="widget-title shop-sidebar">Sản phẩm Mới</span>
              <div className="is-divider small"></div>
              <ul className="product_list_widget">
                {productss.slice(0, 6).map((product) => (
                  <li key={product.id}>
                    <a href={URL1 + productImagess[product.productId]?.imagepath}>
                      <img
                        width="90"
                        height="90"
                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                        alt=""
                        srcSet={`${URL1 + productImages[product.productId]?.imagepath} 300w, ${URL1 + productImages[product.productId]?.imagepath} 150w, ${URL1 + productImages[product.productId]?.imagepath}600w, ${URL1 + productImages[product.productId]?.imagepath} 100w`}
                        sizes="(max-width: 300px) 100vw, 300px"
                      />
                      <span className="product-title">{product.name}</span>
                    </a>
                    <p className="woocommerce-Price-amount amount">
                      {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}&nbsp;
                    </p>
                    <button onClick={() => AddCart(product.id)}>Thêm Vào Giỏ</button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
        <div className="col large-9">
          <div className="shop-container">
            <div className="woocommerce-notices-wrapper">
            </div>
            <div className="products row row-small large-columns-4 medium-columns-3 small-columns-2 has-shadow row-box-shadow-1 row-box-shadow-3-hover">
              <div className="products row row-small large-columns-4 medium-columns-3 small-columns-2 has-shadow row-box-shadow-1 row-box-shadow-3-hover">
                {currentProducts.map((product) => (
                  <div key={product.id} className="product-small col has-hover post-671 product type-product status-publish has-post-thumbnail product_cat-do-kho product_cat-do-uong product_cat-hai-san product_cat-rau-cu product_cat-thit-trung product_cat-trai-cay first instock shipping-taxable purchasable product-type-simple">
                    <div className="col-inner">
                      <div className="badge-container absolute left top z-1"></div>
                      <div className="product-small box">
                        <Link to={`/PrDetails?id=${product.id}`}>
                          <div className="box-image">
                            <div className="image-zoom image-cover">
                              <img
                                width="300"
                                height="300"
                                src={URL1 + productImages[product.productId]?.imagepath}
                                className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                alt=""
                                srcSet={`${URL1 + productImages[product.productId]?.imagepath} 300w, ${URL1 + productImages[product.productId]?.imagepath} 150w, ${URL1 + productImages[product.productId]?.imagepath}600w, ${URL1 + productImages[product.productId]?.imagepath} 100w`}
                                sizes="(max-width: 300px) 100vw, 300px"
                              />
                            </div>
                            <div className="image-tools is-small top right show-on-hover"></div>
                            <div className="image-tools is-small hide-for-small bottom left show-on-hover"></div>
                            <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover"></div>
                          </div>
                        </Link>

                        <div className="box-text box-text-products text-center grid-style-2">
                          <div className="title-wrapper">
                            <p className="name product-title">
                              <a href="http://mauweb.monamedia.net/happytrade/san-pham/bo-sap-034-lam-dong-huong-huu-co-1kg/">{product.name}</a>
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
              </div>
            </div>
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                <DoubleLeftOutlined />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={pageNumber === currentPage ? "active" : ""}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
              >
                <DoubleRightOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product