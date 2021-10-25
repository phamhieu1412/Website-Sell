import React, { useState } from "react";
import Slider from "react-slick";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const PromotionProduct = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div class="promotion">
      <div class="row">
        <div class="col-4 col-md-12 col-sm-12">
          <div class="promotion-box">
            <div class="text">
              <h3>Headphone & Earbuds</h3>
              <button class="btn-flat btn-hover" style={{marginTop: '10px'}}>
                <span>Lưu</span>
              </button>
            </div>
            <img style={{height: '150px'}} src={image4} alt="" />
          </div>
        </div>
        <div class="col-4 col-md-12 col-sm-12">
          <div class="promotion-box">
            <div class="text">
              <h3>JBL Quantum Series</h3>
              <button class="btn-flat btn-hover" style={{marginTop: '10px'}}>
                <span>Lưu</span>
              </button>
            </div>
            <img style={{height: '150px'}} src={image4} alt="" />
          </div>
        </div>
        <div class="col-4 col-md-12 col-sm-12">
          <div class="promotion-box">
            <div class="text">
              <h3>True Wireless Earbuds</h3>
              <button class="btn-flat btn-hover" style={{marginTop: '10px'}}>
                <span>Lưu</span>
              </button>
            </div>
            <img style={{height: '150px'}} src={image4} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionProduct;
