import React from "react";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../assets/images/productsLocal/laptop_1.png";

const ListSpecialProduct = (props) => {
  return (
    <div className="bg-second">
      <div className="section container">
        <div className="row">
          <div
            className="col-4 col-md-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "350px",
              }}
            >
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-7 col-md-8">
            <div className="sp-item-info">
              <div className="sp-item-name">Acer Aspire 7 Gaming ...</div>
              <p className="sp-item-description">
                Laptop Acer Aspire 7 sở hữu bộ xử lý AMD Ryzen 5 5500U giúp máy
                hoạt động mượt mà, ổn định khi thực hiện mọi tác vụ và chơi game
                với 6 lõi 12 luồng. Xử lý nhanh chóng các ứng dụng nặng như
                AutoCad, After Effect, Premiere,... nhờ xung nhịp trung bình của
                CPU AMD này là 2.1 GHz và được đẩy lên tối đa 4.0 GHz nhờ công
                nghệ Turbo Boost. Mẫu laptop này được Acer trang bị card đồ họa
                rời NVIDIA GeForce GTX 1650 4GB được thiết kế theo kiến trúc
                Turning hiện đại, đáp ứng tốt nhu cầu làm việc, giải trí...
              </p>
              <button className="btn-flat btn-hover">Xem ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSpecialProduct;
