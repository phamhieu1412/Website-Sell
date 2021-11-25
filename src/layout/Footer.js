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
              <h3 className="footer-head">Chính sách</h3>
              <ul className="menu">
                <li>
                  <a href="#">Chất lượng sản phẩm</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo hàng</a>
                </li>
                <li>
                  <a href="#">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="#">Chính sách khui hộp sản phẩm</a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-md-6">
              <h3 className="footer-head">Dịch vụ</h3>
              <ul className="menu">
                <li>
                  <a href="#">Chất lượng dịch vụ</a>
                </li>
                <li>
                  <a href="#">Hướng dẫn mua hàng online</a>
                </li>
                <li>
                  <a href="#">Tìm hiểu về mua trả góp</a>
                </li>
                <li>
                  <a href="#">Giao hàng & Thanh toán</a>
                </li>
                <li>
                  <a href="#">Cảnh báo giả mạo</a>
                </li>
              </ul>
            </div>
            <div className="col-3 col-md-6">
              <h3 className="footer-head">Hỗ trợ</h3>
              <ul className="menu">
                <li>
                  <a href="#">Chính sách khiếu nại</a>
                </li>
                <li>
                  <a href="#">Góp ý khiếu nại</a>
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
                <input type="email" placeholder="Nhập email để được ..." />
                <button>Đăng ký</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
