import React, { useState } from "react";
import Slider from "react-slick";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const ListBestSellingProduct = (props) => {
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
          <h2>latest blog</h2>
        </div>
        <div class="blog">
          <div class="blog-img">
            <img src={image4} alt="" />
          </div>
          <div class="blog-info">
            <div class="blog-title">Lorem ipsum dolor sit amet</div>
            <div class="blog-preview">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              eligendi dolore. Sapiente omnis numquam mollitia asperiores animi,
              veritatis sint illo magnam, voluptatum labore, quam ducimus! Nisi
              doloremque praesentium laudantium repellat.
            </div>
            <button class="btn-flat btn-hover">read more</button>
          </div>
        </div>
        <div class="blog row-revere">
          <div class="blog-img">
            <img src={image4} alt="" />
          </div>
          <div class="blog-info">
            <div class="blog-title">Lorem ipsum dolor sit amet</div>
            <div class="blog-preview">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              eligendi dolore. Sapiente omnis numquam mollitia asperiores animi,
              veritatis sint illo magnam, voluptatum labore, quam ducimus! Nisi
              doloremque praesentium laudantium repellat.
            </div>
            <button class="btn-flat btn-hover">read more</button>
          </div>
        </div>
        <div class="section-footer">
          <a href="#" class="btn-flat btn-hover">
            view all
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListBestSellingProduct;
