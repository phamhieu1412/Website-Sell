import React, { useEffect } from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import AppFooter from "../layout/Footer";
import AppHeader from "../layout/Header";
import FilterByParams from "../components/FilterByParams";
import ProductsAfterFilter from "../components/ProductsAfterFilter";
import { actions as productsActions } from "../redux/productsRedux";
import { actions as appActions } from "../redux/appRedux";

const SearchProductPage = (props) => {
  const dispatch = useDispatch();
  const appReducer = useSelector((state) => state.appReducer);
  const productsReducer = useSelector((state) => state.productsReducer);
  const { isFetching } = appReducer;
  const { listFilter, meta } = productsReducer;

  useEffect(() => {
    initProductsAfterFilter();
  }, []);

  const initProductsAfterFilter = () => {
    const url = `${window.location.href}`;
    const categoryId = url.substr(url.lastIndexOf("/") + 1, url.length);
    dispatch(
      productsActions.getProductsByFilters({
        page: 1,
        page_size: 12,
        category_ids: [categoryId],
      })
    );
    dispatch(productsActions.getFilterProduct(categoryId));
  };

  const menu1 = () => {
    return (
      <Menu>
        {meta.sort_by === "time" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: '0 10px',
            }}
          >
            <CheckOutlined />
            <Menu.Item>
              <div onClick={() => selectParams("sort_by", "time")}>
                Thời gian
              </div>
            </Menu.Item>
          </div>
        ) : (
          <Menu.Item>
            <div onClick={() => selectParams("sort_by", "time")}>Thời gian</div>
          </Menu.Item>
        )}
        {meta.sort_by === "sales" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: '0 10px',
            }}
          >
            <CheckOutlined />
            <Menu.Item>
              <div onClick={() => selectParams("sort_by", "sales")}>
                Thời gian
              </div>
            </Menu.Item>
          </div>
        ) : (
          <Menu.Item>
            <div onClick={() => selectParams("sort_by", "sales")}>Bán chạy</div>
          </Menu.Item>
        )}
        {meta.sort_by === "price" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: '0 10px',
            }}
          >
            <CheckOutlined />
            <Menu.Item>
              <div onClick={() => selectParams("sort_by", "price")}>
                Thời gian
              </div>
            </Menu.Item>
          </div>
        ) : (
          <Menu.Item>
            <div onClick={() => selectParams("sort_by", "price")}>Giá</div>
          </Menu.Item>
        )}
      </Menu>
    );
  };
  const menu2 = () => {
    return (
      <Menu>
        {meta.order === "asc" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: '0 10px',
            }}
          >
            <CheckOutlined />
            <Menu.Item>
              <div onClick={() => selectParams("order", "asc")}>Thời gian</div>
            </Menu.Item>
          </div>
        ) : (
          <Menu.Item>
            <div onClick={() => selectParams("order", "asc")}>Tăng dần</div>
          </Menu.Item>
        )}
        {meta.order === "desc" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: '0 10px',
            }}
          >
            <CheckOutlined />
            <Menu.Item>
              <div onClick={() => selectParams("order", "desc")}>Thời gian</div>
            </Menu.Item>
          </div>
        ) : (
          <Menu.Item>
            <div onClick={() => selectParams("order", "desc")}>Giảm dần</div>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const selectParams = (type, value) => {
    if (type === "sort_by") {
      let temp = {
        page: 1,
        page_size: 12,
        sort_by: value,
        category_ids: meta.category_ids,
        manufacturer_ids: meta.manufacturer_ids,
      };
      if (meta?.order?.length > 0) {
        temp.order = meta.order;
      }
      dispatch(productsActions.getProductsByFilters(temp));
    } else if (type === "order") {
      let temp = {
        page: 1,
        page_size: 12,
        order: value,
        category_ids: meta.category_ids,
        manufacturer_ids: meta.manufacturer_ids,
      };
      if (meta?.sort_by?.length > 0) {
        temp.sort_by = meta.sort_by;
      }
      dispatch(productsActions.getProductsByFilters(temp));
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader history={props.history} />

      <div className="bg-main">
        <div className="container">
          {!isFetching && (
            <div className="box box-header-filter">
              <div className="breadcumb">
                <a href="./index.html">home</a>
                <span>
                  <i className="bx bxs-chevrons-right"></i>
                </span>
                <a href="./products.html">all products</a>
              </div>
              <div className="params-filter-select">
                <Dropdown
                  overlay={menu1}
                  placement="bottomCenter"
                  trigger="click"
                  arrow
                >
                  <Button>Xếp theo</Button>
                </Dropdown>
                <Dropdown
                  overlay={menu2}
                  placement="bottomCenter"
                  trigger="click"
                  arrow
                  style={{ marginLeft: "10px" }}
                >
                  <Button>Tăng/Giảm dần</Button>
                </Dropdown>
              </div>
            </div>
          )}
          <div class="box">
            <div class="row">
              <FilterByParams listFilter={listFilter} />

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
