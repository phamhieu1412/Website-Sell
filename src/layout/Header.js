import React, { Component } from "react";
import { connect } from "react-redux";
import { Popover, Button } from "antd";

import "antd/dist/antd.css";
import "../css/app.css";
import "../css/grid.css";
import { actions as authActions } from "../redux/authRedux";
import { actions as appActions } from "../redux/appRedux";
import { actions as productsActions } from "../redux/productsRedux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategoryId: 1,
      keyword: "",
      classActive: "header-wrapper",
    };
  }

  componentDidMount() {
    const { history, getMenu, getUserInfo } = this.props;
    const url = `${window.location.href}`;
    const urlCart = url.indexOf("cart");
    const urlCheckout = url.indexOf("checkout");
    const urlProfile = url.indexOf("account/profile");

    getMenu();
    if (urlCart !== -1 || urlCheckout !== -1 || urlProfile !== -1) {
      getUserInfo({
        onSuccess: () => {},
        onFailure: (status) => {
          if (status && (status === 401 || status === 422)) {
            history.push("/login");
          }
        },
      });
    } else {
      getUserInfo({
        onSuccess: () => {},
        onFailure: () => {},
      });
    }
  }

  goToCart = () => {
    const { history } = this.props;
    history.push("/cart");
  };

  onLogout = () => {
    this.props.logOut();
  };

  renderUserContent = () => {
    const { userDetail, history, isFetching } = this.props;
    if (isFetching) {
      return;
    }
    if (userDetail && userDetail.id) {
      return (
        <div className="render-user-content">
          <div onClick={() => history.push("/account/profile")}>
            Tài khoản của tôi
          </div>
          <div onClick={this.onLogout}>Đăng xuất</div>
        </div>
      );
    }

    return (
      <div className="render-user-content">
        <p onClick={() => history.push("/login")}>Đăng nhập</p>
      </div>
    );
  };

  changeCategory = (id) => {
    const { history, getProductsByFilters, getFilterProduct } = this.props;
    getProductsByFilters({
      page: 1,
      page_size: 12,
      category_ids: [id],
    });
    history.push(`/category/${id}`);
    getFilterProduct(id);
  };

  onChangeKeyword = (e) => {
    this.setState({ keyword: e.target.value });
  };

  openSubMenu = () => {
    this.setState({ classActive: "header-wrapper active" });
  };
  closeSubMenu = () => {
    this.setState({ classActive: "header-wrapper" });
  };

  render() {
    const {
      userDetail,
      isCartScreen,
      history,
      meta,
      listMenu,
      getSearchProducts,
      isFetching,
    } = this.props;
    const { keyword, classActive } = this.state;
    let listMenuPublic = [];
    let listMenuPrivate = [];

    if (listMenu.length > 0) {
      for (let i = 0; i < 6; i++) {
        listMenuPublic.push(listMenu[i]);
      }
      for (let j = 6; j < listMenu.length; j++) {
        listMenuPrivate.push(listMenu[j]);
      }
    }

    // header-wrapper active
    return (
      <header>
        <div className="mobile-menu bg-second">
          <a onClick={() => history.push("/home")} className="mb-logo">
            ATShop
          </a>
          <span
            className="mb-menu-toggle"
            id="mb-menu-toggle"
            onClick={this.openSubMenu}
          >
            <i className="bx bx-menu"></i>
          </span>
        </div>

        <div className={classActive} id="header-wrapper">
          <span
            className="mb-menu-toggle mb-menu-close"
            id="mb-menu-close"
            onClick={this.closeSubMenu}
          >
            <i className="bx bx-x"></i>
          </span>

          <div className="bg-second">
            <div className="top-header container">
              <ul className="devided">
                <li>
                  <a href="#">+840123456789</a>
                </li>
                <li>
                  <a href="#">atshop@mail.com</a>
                </li>
              </ul>
              <ul className="devided">
                <li className="dropdown">
                  <a href="">USD</a>
                  <i className="bx bxs-chevron-down"></i>
                  <ul className="dropdown-content">
                    <li>
                      <a href="#">VND</a>
                    </li>
                    <li>
                      <a href="#">JPY</a>
                    </li>
                    <li>
                      <a href="#">EUR</a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="">ENGLISH</a>
                  <i className="bx bxs-chevron-down"></i>
                  <ul className="dropdown-content">
                    <li>
                      <a href="#">VIETNAMESE</a>
                    </li>
                    <li>
                      <a href="#">JAPANESE</a>
                    </li>
                    <li>
                      <a href="#">FRENCH</a>
                    </li>
                    <li>
                      <a href="#">SPANISH</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">ORDER TRACKING</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-main">
            <div className="mid-header container">
              <a onClick={() => history.push("/home")} className="logo">
                ASTShop
              </a>
              <div className="search">
                <input
                  type="text"
                  placeholder="Bạn cần tìm gì ...?"
                  onChange={this.onChangeKeyword}
                />
                <i
                  onClick={() => {
                    history.push("/search");
                    getSearchProducts({
                      page: 1,
                      keyword: keyword,
                      page_size: 10,
                    });
                  }}
                  className="bx bx-search-alt"
                ></i>
              </div>
              <div className="user-menu">
                <Button>
                  <i className="bx bx-bell"></i>
                </Button>
                <Popover
                  style={{ margin: "0px" }}
                  content={this.renderUserContent}
                  title={userDetail && userDetail.id && userDetail.full_name}
                  trigger="hover"
                  placement="bottom"
                >
                  <Button>
                    <i className="bx bx-user-circle"></i>
                  </Button>
                </Popover>
                <Button onClick={() => history.push("/cart")}>
                  <i className="bx bx-cart"></i>
                </Button>
              </div>
            </div>
          </div>

          {/* list menu .id-active-menu*/}
          {!isCartScreen && (
            <div className="bg-second">
              <div className="bottom-header container">
                <ul className="main-menu">
                  {listMenuPublic.length > 0 &&
                    listMenuPublic.map((item) => (
                      <li
                        key={item.id}
                        className={
                          meta.category_ids.length > 0 &&
                          meta.category_ids[0] == item.id
                            ? "item-menu id-active-menu"
                            : "item-menu"
                        }
                      >
                        <img src={item.image_url} />
                        <a onClick={() => this.changeCategory(item.id)}>
                          {item.name}
                        </a>
                      </li>
                    ))}

                  <li className="mega-dropdown">
                    <a href="">
                      Xem thêm <i className="bx bxs-chevron-down"></i>
                    </a>
                    <div className="mega-content">
                      <div className="row">
                        <div className="box-menu-private">
                          {listMenuPrivate.length > 0 &&
                            listMenuPrivate.map((item) => (
                              <div
                                key={item.id}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  margin: "15px 20px 15px 35px",
                                }}
                                className={
                                  meta.category_ids.length > 0 &&
                                  meta.category_ids[0] == item.id &&
                                  "item-menu id-active-menu"
                                }
                              >
                                <img
                                  src={item.image_url}
                                  style={{ width: "28px" }}
                                />
                                <a
                                  onClick={() => this.changeCategory(item.id)}
                                  style={{ fontSize: "1em" }}
                                >
                                  {item.name}
                                </a>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ authReducer, appReducer, productsReducer }) => ({
  userDetail: authReducer.userDetail,
  isFetching: authReducer.isFetching,
  listMenu: appReducer.menu,
  flagGetMenu: appReducer.flagGetMenu,
  meta: productsReducer.meta,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(authActions.logOut()),
  getUserInfo: (meta) => dispatch(authActions.getUserInfo(meta)),
  getProductsByFilters: (payload) =>
    dispatch(productsActions.getProductsByFilters(payload)),
  getSearchProducts: (payload) =>
    dispatch(productsActions.getSearchProducts(payload)),
  getFilterProduct: (payload) =>
    dispatch(productsActions.getFilterProduct(payload)),
  getMenu: () => dispatch(appActions.getMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
