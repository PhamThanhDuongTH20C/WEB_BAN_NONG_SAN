import React from 'react'
import './Home.css'
import Content from './Content'
import Content1 from './Content1'
import Content2 from './Content2'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section className="section sec_banner" id="section_1434671351">
        <div className="bg section-bg fill bg-fill  bg-loaded">
        </div>
        {/* <!-- .section-bg --> */}
        <div className="section-content relative">
          <div className="row row-collapse row-full-width align-center" id="row-1246855115">
            <div className="col small-12 large-12">
              <div className="col-inner text-center">
                <div className="banner has-hover" id="banner-318831367">
                  <div className="banner-inner fill">
                    <div className="banner-bg fill">
                      <div className="bg fill bg-fill  bg-loaded"></div>
                      <div className="overlay"></div>
                      <div className="effect-sparkle bg-effect fill no-click"></div>
                    </div>
                    {/* <!-- bg-layers --> */}
                    <div className="banner-layers container">
                      <div className="fill banner-link"></div>
                      <div id="text-box-1418176647" className="text-box banner-layer x50 md-x50 lg-x50 y90 md-y85 lg-y85 res-text">
                        <div className="text dark">
                          <div className="text-inner text-center">
                            <h2><span style={{ fontSize: "80%" }}>TÌM MUA</span>&nbsp;
                              <b className="f">THỰC PHẨM SẠCH</b>&nbsp;
                              <span style={{ fontSize: "80%" }}>TỪ</span>
                              <br></br>
                              <b className="f">NHÀ CUNG CẤP UY TÍN</b>&nbsp;
                              <span style={{ fontSize: "80%" }}>TẠI ĐÂY</span>
                            </h2>
                            <div> <Link to={'/product'}>
                              <button> Mua Ngay </button>
                            </Link> </div>
                          </div>
                        </div>
                        {/* <!-- text-box-inner --> */}

                      </div>
                      {/* <!-- text-box --> */}
                    </div>
                    {/* <!-- .banner-layers --> */}
                  </div>
                  {/* <!-- .banner-inner --> */}
                </div>
                {/* <!-- .banner --> */}
              </div></div>
          </div>
        </div>
        {/* <!-- .section-content --> */}
      </section>
      <Content />
      <Content1 />
      <Content2 />
    </>
  )
}

export default Home