import React, { useState } from "react";
import { Rate } from "antd";

import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";

const ReviewsProduct = (props) => {
  const { reviews } = props;

  const dateToString = (time) => {
    const date = new Date(time);
    return `${date.getMinutes()}:${date.getHours()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  return (
    <div className="box" style={{ margin: "60px 0" }}>
      <div className="box-header">Đánh giá</div>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className="user-rate">
            <div className="user-info">
              <div className="user-avt">
                <img src={image4} alt="" />
              </div>
              <div className="user-name">
                <span className="name">{review.user.full_name}</span>
                <span className="rating">
                  <Rate disabled={true} defaultValue={review.star} />
                </span>
                <p style={{ fontSize: "1rem", opacity: "0.7" }}>
                  {dateToString(review.created_date * 1000)}
                </p>
                <div className="user-rate-content">{review.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsProduct;
