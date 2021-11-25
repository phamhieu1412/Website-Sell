import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  numberToVnd,
  notificationToast,
  successNotificationToast,
} from "../utils/numberFormatter";
import { actions as productsActions } from "../redux/productsRedux";
import { actions as cartActions } from "../redux/cartRedux";

const ListProduct = (props) => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.productsReducer);
  const { listProducts } = productsReducer;
  const { history } = props;

  const addToCart = (id) => {
    dispatch(
      cartActions.addToCart(
        {
          product_id: id,
          quantity: 1,
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
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h2>Tất cả sản phẩm</h2>
        </div>
        <div className="row" id="latest-products">
          {listProducts.map((item) => (
            <div key={item.id} className="col-3 col-md-6 col-sm-12">
              <div className="product-card">
                <div className="product-card-img">
                  <img src={item.avatar_url} alt="" />
                  <img src={item.avatar_url} alt="" />
                </div>
                <div className="product-card-info">
                  <div className="product-btn">
                    <button
                      className="btn-flat btn-hover btn-shop-now"
                      onClick={() => {
                        history.push(`/detail/${item.link_seo}/${item.id}`);
                        dispatch(productsActions.getDetailProduct(item.id));
                      }}
                    >
                      Xem ngay
                    </button>
                    <button
                      className="btn-flat btn-hover btn-cart-add"
                      onClick={() => addToCart(item.id)}
                    >
                      <i className="bx bxs-cart-add"></i>
                    </button>
                    <button className="btn-flat btn-hover btn-cart-add">
                      <i className="bx bxs-heart"></i>
                    </button>
                  </div>
                  <div className="product-card-name">{item.name}</div>
                  <div className="product-card-price">
                    <span>
                      <del>{numberToVnd(item.price)}</del>
                    </span>
                    <span className="curr-price">
                      {numberToVnd(item.final_price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <a
            onClick={() => history.push("/search")}
            className="btn-flat btn-hover"
          >
            Xem thêm
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
