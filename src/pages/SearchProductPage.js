import React, { useState } from "react";
import { Layout } from "antd";
import Slider from "react-slick";
import { useSelector, connect } from "react-redux";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/JBLHorizon_001_dvHAMaster.png";
import AppFooter from "../layout/Footer";
import AppHeader from "../layout/Header";
import FilterByParams from "../components/FilterByParams";
import ProductsAfterFilter from "../components/ProductsAfterFilter";

const SearchProductPage = (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <div class="bg-main">
        <div class="container">
          <div class="box">
            <div class="breadcumb">
              <a href="./index.html">home</a>
              <span>
                <i class="bx bxs-chevrons-right"></i>
              </span>
              <a href="./products.html">all products</a>
            </div>
          </div>
          <div class="box">
            <div class="row">
              <FilterByParams />

              <ProductsAfterFilter />
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </Layout>
  );
};

export default SearchProductPage;
