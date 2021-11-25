import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import { useHistory } from "react-router";

import "../css/search.scss";
import { numberToVnd, toShortString } from "../utils/numberFormatter";
import { actions as productsActions } from "../redux/productsRedux";
import Loading from "../components/Loading";

const ProductsAfterFilter = (props) => {
  const dispatch = useDispatch();
  const productsReducer = useSelector((state) => state.productsReducer);
  const history = useHistory();
  const { listProducts, meta, isFetching } = productsReducer;

  const onChangePage = (current, pageSize) => {
    dispatch(
      productsActions.getProductsByFilters({
        page: current,
        page_size: pageSize,
      })
    );
  };

  return (
    <div className="col-10 col-md-12 search-product-page">
      <div className="box filter-toggle-box">
        <button className="btn-flat btn-hover" id="filter-toggle">
          filter
        </button>
      </div>
      <div>
        {/* list product after filter */}
        <div className="row" id="products">
          {!isFetching ? (
            listProducts.map((item) => (
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
                      <button className="btn-flat btn-hover btn-cart-add">
                        <i className="bx bxs-cart-add"></i>
                      </button>
                      <button className="btn-flat btn-hover btn-cart-add">
                        <i className="bx bxs-heart"></i>
                      </button>
                    </div>
                    <div className="product-card-name">
                      {toShortString(item.name)}
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
            ))
          ) : (
            <div className="box-product-search-page">
              <Loading />
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="box-pagination">
        <Pagination
          total={meta.totalItem}
          current={meta.page}
          pageSize={meta.pageSize}
          size="default"
          showSizeChanger={false}
          onChange={onChangePage}
        />
        {/* <ul className="pagination">
          <li>
            <a href="#">
              <i className="bx bxs-chevron-left"></i>
            </a>
          </li>
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-chevron-right"></i>
            </a>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default ProductsAfterFilter;
