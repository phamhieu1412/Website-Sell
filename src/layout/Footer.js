import React, { Component } from "react";
import PropTypes from "prop-types";

import "../css/app.css";
import "../css/grid.css";

class Footer extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <footer className="bg-second">
        <div className="container">
          <div className="row">
            <div className="col-3 col-md-6">
              <h3 className="footer-head">Products</h3>
              <ul className="menu">
                <li>
                  <a href="#">Help center</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">product help</a>
                </li>
                <li>
                  <a href="#">warranty</a>
                </li>
                <li>
                  <a href="#">order status</a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-md-6">
              <h3 className="footer-head">services</h3>
              <ul className="menu">
                <li>
                  <a href="#">Help center</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">product help</a>
                </li>
                <li>
                  <a href="#">warranty</a>
                </li>
                <li>
                  <a href="#">order status</a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-md-6">
              <h3 className="footer-head">support</h3>
              <ul className="menu">
                <li>
                  <a href="#">Help center</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">product help</a>
                </li>
                <li>
                  <a href="#">warranty</a>
                </li>
                <li>
                  <a href="#">order status</a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-md-6 col-sm-12">
              <div className="contact">
                <h3 className="contact-header">ATShop</h3>
                <ul className="contact-socials">
                  <li>
                    <a href="#">
                      <i className="bx bxl-facebook-circle"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bx bxl-instagram-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bx bxl-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="subscribe">
                <input type="email" placeholder="ENTER YOUR EMAIL" />
                <button>subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
