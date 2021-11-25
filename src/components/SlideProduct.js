import React, { useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideProduct = (props) => {
  const appReducer = useSelector((state) => state.appReducer);
  const { banners } = appReducer;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-introduction">
      <Slider {...settings}>
        {banners.length > 0 &&
          banners.map((item) => (
            <div className="slider" key={item.id}>
              <div className="info">
                <div className="info-content">
                  <h3 style={{ marginLeft: "20px" }}>JBL JR 310BT</h3>
                  <h2>{item.name}</h2>
                  <p style={{ marginLeft: "20px" }}>{item.description}</p>
                </div>
              </div>
              <div className="img">
                <img src={item.image_url} alt={item.name} />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SlideProduct;
