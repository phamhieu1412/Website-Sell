import React, { useState } from "react";
import Slider from "react-slick";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const ListProduct = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div class="section">
      <div class="container">
        <div class="section-header">
          <h2>Latest product</h2>
        </div>
        <div class="row" id="latest-products">
          <div class="col-3 col-md-6 col-sm-12">
            <div class="product-card">
              <div class="product-card-img">
                <img src={image4} alt="" />
                <img src={image4} alt="" />
              </div>
              <div class="product-card-info">
                <div class="product-btn">
                  <button class="btn-flat btn-hover btn-shop-now">
                    shop now
                  </button>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-cart-add"></i>
                  </button>
                  <button class="btn-flat btn-hover btn-cart-add">
                    <i class="bx bxs-heart"></i>
                  </button>
                </div>
                <div class="product-card-name">JBL Quantum 400</div>
                <div class="product-card-price">
                  <span>
                    <del>$300</del>
                  </span>
                  <span class="curr-price">$200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-footer">
          <a href="./products.html" class="btn-flat btn-hover">
            view all
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
