import React from "react";

import "../css/SlideProductCss.css";
import image1 from "../assets/images/productsLocal/promotion_1.jpeg";
import image2 from "../assets/images/productsLocal/promotion_2.jpeg";
import image3 from "../assets/images/productsLocal/promotion_3.jpeg";

const PromotionProduct = (props) => {
  return (
    <div className="promotion">
      <div className="row">
        <div className="col-4 col-md-12 col-sm-12">
          <div className="promotion-box">
            <img src={image1} />
          </div>
        </div>
        <div className="col-4 col-md-12 col-sm-12">
          <div className="promotion-box">
            <img src={image2} />
          </div>
        </div>
        <div className="col-4 col-md-12 col-sm-12">
          <div className="promotion-box">
            <img src={image3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionProduct;
