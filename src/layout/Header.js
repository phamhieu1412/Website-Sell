import React, { Component } from "react";
import PropTypes from "prop-types";

import "../css/app.css";
import "../css/grid.css";
import image1 from "../assets/images/kisspng-beats-electronics-headphones-apple-beats-studio-red-headphones.png";
import image2 from "../assets/images/JBL_TUNE220TWS_ProductImage_Pink_ChargingCaseOpen.png";
import image3 from "../assets/images/JBL_JR 310BT_Product Image_Hero_Skyblue.png";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

class Header extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <header>
        <div className="mobile-menu bg-second">
          <a href="#" className="mb-logo">
            ATShop
          </a>
          <span className="mb-menu-toggle" id="mb-menu-toggle">
            <i className="bx bx-menu"></i>
          </span>
        </div>

        <div className="header-wrapper" id="header-wrapper">
          <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close">
            <i className="bx bx-x"></i>
          </span>

          <div className="bg-second">
            <div className="top-header container">
              <ul className="devided">
                <li>
                  <a href="#">+840123456789</a>
                </li>
                <li>
                  <a href="#">atshop@mail.com</a>
                </li>
              </ul>
              <ul className="devided">
                <li className="dropdown">
                  <a href="">USD</a>
                  <i className="bx bxs-chevron-down"></i>
                  <ul className="dropdown-content">
                    <li>
                      <a href="#">VND</a>
                    </li>
                    <li>
                      <a href="#">JPY</a>
                    </li>
                    <li>
                      <a href="#">EUR</a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="">ENGLISH</a>
                  <i className="bx bxs-chevron-down"></i>
                  <ul className="dropdown-content">
                    <li>
                      <a href="#">VIETNAMESE</a>
                    </li>
                    <li>
                      <a href="#">JAPANESE</a>
                    </li>
                    <li>
                      <a href="#">FRENCH</a>
                    </li>
                    <li>
                      <a href="#">SPANISH</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">ORDER TRACKING</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-main">
            <div className="mid-header container">
              <a href="#" className="logo">
                ATShop
              </a>
              <div className="search">
                <input type="text" placeholder="Search" />
                <i className="bx bx-search-alt"></i>
              </div>
              <ul className="user-menu">
                <li>
                  <a href="#">
                    <i className="bx bx-bell"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bx-user-circle"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bx-cart"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-second">
            <div className="bottom-header container">
              <ul className="main-menu">
                <li>
                  <a href="#">home</a>
                </li>

                <li className="mega-dropdown">
                  <a href="./products.html">
                    Shop<i className="bx bxs-chevron-down"></i>
                  </a>
                  <div className="mega-content">
                    <div className="row">
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li>
                              <a href="#">Wireless</a>
                            </li>
                            <li>
                              <a href="#">Inear headphone</a>
                            </li>
                            <li>
                              <a href="#">Overear headphone</a>
                            </li>
                            <li>
                              <a href="#">sport headphone</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li>
                              <a href="#">Wireless</a>
                            </li>
                            <li>
                              <a href="#">Inear headphone</a>
                            </li>
                            <li>
                              <a href="#">Overear headphone</a>
                            </li>
                            <li>
                              <a href="#">sport headphone</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li>
                              <a href="#">Wireless</a>
                            </li>
                            <li>
                              <a href="#">Inear headphone</a>
                            </li>
                            <li>
                              <a href="#">Overear headphone</a>
                            </li>
                            <li>
                              <a href="#">sport headphone</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li>
                              <a href="#">Wireless</a>
                            </li>
                            <li>
                              <a href="#">Inear headphone</a>
                            </li>
                            <li>
                              <a href="#">Overear headphone</a>
                            </li>
                            <li>
                              <a href="#">sport headphone</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row img-row">
                      <div className="col-3">
                        <div className="box">
                          <img src={image1} alt="HHH" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="box">
                          <img src={image2} alt="HHH" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="box">
                          <img src={image3} alt="HHH" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="box">
                          <img src={image4} alt="HHH" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <a href="#">blog</a>
                </li>
                <li>
                  <a href="#">contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
