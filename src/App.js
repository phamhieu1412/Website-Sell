import React, { Component } from "react";
import { connect } from "react-redux";

import AppLayout from "./layout/Layout";
import { actions as appActions } from "./redux/appRedux";
import { actions as productsActions } from "./redux/productsRedux";

class App extends Component {
  componentDidMount() {
    const { getBanners, getProductsBestSeller, getProductsByFilters, } =
      this.props;
    getBanners();
    getProductsBestSeller({
      page: 1,
      page_size: 8,
    });
    getProductsByFilters({
      page: 1,
      page_size: 12,
    });
  }

  render() {
    return <AppLayout />;
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
  getBanners: () => dispatch(appActions.getBanners()),
  getProductsByFilters: (payload) =>
    dispatch(productsActions.getProductsByFilters(payload)),
  getProductsBestSeller: () =>
    dispatch(productsActions.getProductsBestSeller()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
