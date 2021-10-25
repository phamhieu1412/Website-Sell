import React, { useState } from "react";
import { Layout } from "antd";
import Slider from "react-slick";
import { useSelector, connect } from "react-redux";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const ProductsAfterFilter = (props) => {
  return (
    <div class="col-9 col-md-12">
      <div class="box filter-toggle-box">
        <button class="btn-flat btn-hover" id="filter-toggle">
          filter
        </button>
      </div>
      <div class="box">
        {/* list product after filter */}
        <div class="row" id="products">
          <div class="col-4 col-md-6 col-sm-12">
            <div class="product-card">
              <div class="product-card-img">
                <img src={image4} alt="" />
                <img src={image4} alt="" />
              </div>
              <div class="product-card-info">
                <div class="product-btn">
                  <a
                    href="./product-detail.html"
                    class="btn-flat btn-hover btn-shop-now"
                  >
                    shop now
                  </a>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-cart-add"></i>
                  </button>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-heart"></i>
                  </button>
                </div>
                <div class="product-card-name">name sp</div>
                <div class="product-card-price">
                  <span>
                    <del>300</del>
                  </span>
                  <span class="curr-price">200</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 col-md-6 col-sm-12">
            <div class="product-card">
              <div class="product-card-img">
                <img src={image4} alt="" />
                <img src={image4} alt="" />
              </div>
              <div class="product-card-info">
                <div class="product-btn">
                  <a
                    href="./product-detail.html"
                    class="btn-flat btn-hover btn-shop-now"
                  >
                    shop now
                  </a>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-cart-add"></i>
                  </button>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-heart"></i>
                  </button>
                </div>
                <div class="product-card-name">name sp</div>
                <div class="product-card-price">
                  <span>
                    <del>300</del>
                  </span>
                  <span class="curr-price">200</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 col-md-6 col-sm-12">
            <div class="product-card">
              <div class="product-card-img">
                <img src={image4} alt="" />
                <img src={image4} alt="" />
              </div>
              <div class="product-card-info">
                <div class="product-btn">
                  <a
                    href="./product-detail.html"
                    class="btn-flat btn-hover btn-shop-now"
                  >
                    shop now
                  </a>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-cart-add"></i>
                  </button>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-heart"></i>
                  </button>
                </div>
                <div class="product-card-name">name sp</div>
                <div class="product-card-price">
                  <span>
                    <del>300</del>
                  </span>
                  <span class="curr-price">200</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 col-md-6 col-sm-12">
            <div class="product-card">
              <div class="product-card-img">
                <img src={image4} alt="" />
                <img src={image4} alt="" />
              </div>
              <div class="product-card-info">
                <div class="product-btn">
                  <a
                    href="./product-detail.html"
                    class="btn-flat btn-hover btn-shop-now"
                  >
                    shop now
                  </a>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-cart-add"></i>
                  </button>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-heart"></i>
                  </button>
                </div>
                <div class="product-card-name">name sp</div>
                <div class="product-card-price">
                  <span>
                    <del>300</del>
                  </span>
                  <span class="curr-price">200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div class="box">
        <ul class="pagination">
          <li>
            <a href="#">
              <i class="bx bxs-chevron-left"></i>
            </a>
          </li>
          <li>
            <a href="#" class="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-chevron-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductsAfterFilter;
