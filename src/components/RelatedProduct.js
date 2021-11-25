import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { numberToVnd, toShortString1 } from "../utils/numberFormatter";
import { actions as productsActions } from "../redux/productsRedux";

const RelatedProduct = (props) => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.productsReducer);
  const { listProductsRelated } = productsReducer;
  const history = useHistory();

  return (
    <div className="box">
      <div className="box-header">Sản phẩm liên quan</div>

      {/* list related product */}
      <div className="row" id="related-products">
        {listProductsRelated &&
          listProductsRelated.map((item) => (
            <div key={item.id} className="col-3 col-md-6 col-sm-12">
              <div className="product-card">
                <div className="product-card-img">
                  <img src={item.avatar_url} alt="" />
                  <img src={item.avatar_url} alt="" />
                </div>
                <div className="product-card-info">
                  <div className="product-btn">
                    <a
                      className="btn-flat btn-hover btn-shop-now"
                      onClick={() => {
                        history.push(`/detail/${item.link_seo}/${item.id}`);
                        dispatch(productsActions.getDetailProduct(item.id));
                      }}
                    >
                      Xem ngay
                    </a>
                    <button className="btn-flat btn-hover btn-cart-add">
                      <i className="bx bxs-cart-add"></i>
                    </button>
                    <button className="btn-flat btn-hover btn-cart-add">
                      <i className="bx bxs-heart"></i>
                    </button>
                  </div>
                  <div className="product-card-name">
                    {toShortString1(item.name, 18)}
                  </div>
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
    </div>
  );
};

export default RelatedProduct;
