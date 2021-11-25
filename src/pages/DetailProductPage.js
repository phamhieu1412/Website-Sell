import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer } from "react-toastify";

import "../css/SlideProductCss.css";
import AppFooter from "../layout/Footer";
import AppHeader from "../layout/Header";
import ReviewsProduct from "../components/ReviewsProduct";
import RelatedProduct from "../components/RelatedProduct";
import {
  numberToVnd,
  notificationToast,
  successNotificationToast,
} from "../utils/numberFormatter";
import { actions as productsActions } from "../redux/productsRedux";
import { actions as cartActions } from "../redux/cartRedux";

const DetailProductPage = (props) => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.productsReducer);
  const { detailProduct } = productsReducer;
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();

  useEffect(() => {
    const url = `${window.location.href}`;
    const id = url.substr(url.lastIndexOf("/") + 1, url.length);
    dispatch(productsActions.getDetailProduct(id));
  }, []);

  const onChangeQuantity = (type) => {
    if (type === "asc") {
      setQuantity(quantity + 1);
    } else if (type === "desc" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (id, inventory) => {
    if (inventory === 0) {
      notificationToast("Không có đủ hàng");
      return;
    }
    if (inventory < quantity) {
      notificationToast("Không được đặt quá số lượng hàng còn lại trong kho");
      return;
    }
    dispatch(
      cartActions.addToCart(
        {
          product_id: id,
          quantity: quantity,
        },
        {
          onSuccess: () => {
            successNotificationToast("Thêm sản phẩm vào giỏ thành công");
          },
          onFailure: (textError) => {
            notificationToast("Thêm sản phẩm vào giỏ thất bại");
          },
        }
      )
    );
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader history={history} />

      <div className="bg-main">
        {detailProduct.id && (
          <div className="container">
            <div className="box" style={{ marginTop: "20px" }}>
              <div className="breadcumb">
                <a href="./index.html">home</a>
                <span>
                  <i className="bx bxs-chevrons-right"></i>
                </span>
                <a href="./products.html">all products</a>
                <span>
                  <i className="bx bxs-chevrons-right"></i>
                </span>
                <p>{detailProduct.name}</p>
              </div>
            </div>
            <div className="row product-row">
              <div className="col-5 col-md-12">
                <div className="product-img" id="product-img">
                  <img src={detailProduct.avatar_url} alt="" />
                </div>
                <div className="box">
                  <div className="product-img-list">
                    {detailProduct.images.map((i, index) => (
                      <div key={index} className="product-img-item">
                        <img src={i} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-7 col-md-12">
                <div className="product-info">
                  <h1>{detailProduct.name}</h1>
                  <div className="product-info-detail">
                    <span className="product-info-detail-title">Lượt xem:</span>
                    <p>{detailProduct.views} lượt</p>
                  </div>
                  <div className="product-info-detail">
                    <span className="product-info-detail-title">Thể loại:</span>
                    <p>{detailProduct.category.name}</p>
                  </div>
                  <div className="product-info-detail">
                    <span className="product-info-detail-title">
                      Đánh giá:{" "}
                    </span>
                    <span className="rating">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </span>
                  </div>
                  <div className="product-info-detail">
                    <span className="product-info-detail-title">
                      {detailProduct.inventory_number} sản phẩm có sẵn
                    </span>
                  </div>
                  <p className="product-description">
                    {detailProduct.specification}
                  </p>
                  <div className="product-info-price">
                    {numberToVnd(detailProduct.final_price)}
                  </div>
                  <div className="product-quantity-wrapper">
                    <span
                      className="product-quantity-btn"
                      onClick={() => onChangeQuantity("desc")}
                    >
                      <i className="bx bx-minus"></i>
                    </span>
                    <span className="product-quantity">{quantity}</span>
                    <span
                      className="product-quantity-btn"
                      onClick={() => onChangeQuantity("asc")}
                    >
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn-flat btn-hover"
                      onClick={() =>
                        addToCart(
                          detailProduct.id,
                          detailProduct.inventory_number
                        )
                      }
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box-header">Mô tả</div>
              <div className="product-detail-description">
                <div className="product-detail-description-content">
                  <p>{detailProduct.description}</p>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box-header">Hướng dẫn sử dụng</div>
              <div className="product-detail-description">
                <div className="product-detail-description-content">
                  <a href={detailProduct.user_manual}>{detailProduct.name}</a>
                </div>
              </div>
            </div>

            <ReviewsProduct reviews={detailProduct.product_reviews} />

            <RelatedProduct />
          </div>
        )}
      </div>

      <ToastContainer />
      <AppFooter />
    </Layout>
  );
};

export default DetailProductPage;
