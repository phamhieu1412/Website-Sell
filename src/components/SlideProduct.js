import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideProduct = (props) => {
  const appReducer = useSelector((state) => state.appReducer);
  const { banners, bannersName } = appReducer;
  const [numSlider, setNumSlider] = useState(0);
  const [listBanner, setListBanner] = useState([]);

  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // border-top: 2px solid #1891ff; 1px solid #ebebeb
  return (
    <div className="slider-introduction">
      <Slider {...settings} afterChange={(e) => setNumSlider(e)}>
        {banners.length > 0 &&
          banners.map((item) => (
            <div className="slider" key={item.id}>
              <div className="img">
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>
          ))}
      </Slider>
      <div className="slider-name">
        {bannersName.length > 0 &&
          bannersName.map((item, index) => (
            <div
              className="slider-name-item"
              key={index}
              style={{
                borderTop:
                  index === numSlider
                    ? "2px solid #1891ff"
                    : "2px solid #ebebeb",
              }}
            >
              <h2>{item}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SlideProduct;
