import React, { useState } from "react";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const RelatedProduct = (props) => {
  return (
    <div class="box">
      <div class="box-header">related products</div>

      {/* list related product */}
      <div class="row" id="related-products">
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
              <div class="product-card-name">name</div>
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
              <div class="product-card-name">name</div>
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
              <div class="product-card-name">name</div>
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
              <div class="product-card-name">name</div>
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
  );
};

export default RelatedProduct;
