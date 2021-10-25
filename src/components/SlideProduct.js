import React, { useState } from "react";
import Slider from "react-slick";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const SlideProduct = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="SliderProduct">
      <Slider {...settings}>
        <div>
          <div class="slider">
            <div class="info">
              <div class="info-content">
                <h3 style={{ marginLeft: "20px" }}>JBL JR 310BT</h3>
                <h2>Consectetur Elit</h2>
                <p style={{ marginLeft: "20px" }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Explicabo aut fugiat, libero magnam nemo inventore in tempora
                  beatae officiis temporibus odit deserunt molestiae amet quam,
                  asperiores, iure recusandae nulla labore!
                </p>
                <div style={{ marginLeft: "20px" }}>
                  <button class="btn-flat btn-hover">
                    <span>shop now</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="img">
              <img src={image4} alt="" />
            </div>
          </div>
        </div>
        <div>
          <div class="slider">
            <div class="info">
              <div class="info-content">
                <h3 style={{ marginLeft: "20px" }}>JBL JR 310BT</h3>
                <h2>Consectetur Elit</h2>
                <p style={{ marginLeft: "20px" }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Explicabo aut fugiat, libero magnam nemo inventore in tempora
                  beatae officiis temporibus odit deserunt molestiae amet quam,
                  asperiores, iure recusandae nulla labore!
                </p>
                <div style={{ marginLeft: "20px" }}>
                  <button class="btn-flat btn-hover">
                    <span>shop now</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="img">
              <img src={image4} alt="" />
            </div>
          </div>
        </div>
        <div>
          <div class="slider">
            <div class="info">
              <div class="info-content">
                <h3 style={{ marginLeft: "20px" }}>JBL JR 310BT</h3>
                <h2>Consectetur Elit</h2>
                <p style={{ marginLeft: "20px" }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Explicabo aut fugiat, libero magnam nemo inventore in tempora
                  beatae officiis temporibus odit deserunt molestiae amet quam,
                  asperiores, iure recusandae nulla labore!
                </p>
                <div style={{ marginLeft: "20px" }}>
                  <button class="btn-flat btn-hover">
                    <span>shop now</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="img">
              <img src={image4} alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SlideProduct;
