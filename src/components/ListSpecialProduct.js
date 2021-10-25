import React, { useState } from "react";
import Slider from "react-slick";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const ListSpecialProduct = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div class="bg-second">
      <div class="section container">
        <div class="row">
          <div class="col-4 col-md-4">
            <div class="sp-item-img">
              <img src={image4} alt="" />
            </div>
          </div>
          <div class="col-7 col-md-8">
            <div class="sp-item-info">
              <div class="sp-item-name">JBL TUNE 750TNC</div>
              <p class="sp-item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                dignissimos itaque et eaque quod harum vero autem? Reprehenderit
                enim non voluptate! Qui provident modi est non eius ratione,
                debitis iure.
              </p>
              <button class="btn-flat btn-hover">shop now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSpecialProduct;
