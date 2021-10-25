import React, { useState } from "react";
import { Layout } from "antd";
import Slider from "react-slick";
import { useSelector, connect } from "react-redux";

import "../css/SlideProductCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FilterByParams = (props) => {
  return (
    <div class="col-3 filter-col" id="filter-col">
      <div class="box filter-toggle-box">
        <button class="btn-flat btn-hover" id="filter-close">
          close
        </button>
      </div>
      <div class="box">
        <span class="filter-header">Categories</span>
        <ul class="filter-list">
          <li>
            <a href="#">Wireless</a>
          </li>
          <li>
            <a href="#">In-ear headphone</a>
          </li>
          <li>
            <a href="#">Over-ear headphone</a>
          </li>
          <li>
            <a href="#">sport headphone</a>
          </li>
        </ul>
      </div>
      <div class="box">
        <span class="filter-header">Price</span>
        <div class="price-range">
          <input type="text" />
          <span>-</span>
          <input type="text" />
        </div>
      </div>
      <div class="box">
        <ul class="filter-list">
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="status1" />
              <label for="status1">
                On sale
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="status2" />
              <label for="status2">
                In stock
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="status3" />
              <label for="status3">
                Featured
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div class="box">
        <span class="filter-header">Brands</span>
        <ul class="filter-list">
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" checked="checked" />
              <label for="remember1">
                JBL
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember2" />
              <label for="remember2">
                Beat
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember3" />
              <label for="remember3">
                Logitech
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember4" />
              <label for="remember4">
                Samsung
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember5" />
              <label for="remember5">
                Sony
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div class="box">
        <span class="filter-header">Colors</span>
        <ul class="filter-list">
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" />
              <label for="remember1">
                Red
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember2" />
              <label for="remember2">
                Blue
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember3" />
              <label for="remember3">
                White
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember4" />
              <label for="remember4">
                Pink
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember5" />
              <label for="remember5">
                Yellow
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div class="box">
        <span class="filter-header">rating</span>
        <ul class="filter-list">
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" />
              <label for="remember1">
                <span class="rating">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                </span>
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" />
              <label for="remember1">
                <span class="rating">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                </span>
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" />
              <label for="remember1">
                <span class="rating">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                </span>
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" />
              <label for="remember1">
                <span class="rating">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                </span>
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
          <li>
            <div class="group-checkbox">
              <input type="checkbox" id="remember1" />
              <label for="remember1">
                <span class="rating">
                  <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                  <i class="bx bx-star"></i>
                </span>
                <i class="bx bx-check"></i>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterByParams;
