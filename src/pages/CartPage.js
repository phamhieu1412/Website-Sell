import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

import "../css/CartProductItem.css";
import "react-toastify/dist/ReactToastify.css";
import CartsContainer from "../containers/CartsContainer";
import Header from "../layout//Header";
import AppFooter from "../layout/Footer";
import { actions as appActions } from "../redux/appRedux";
import { actions as cartActions } from "../redux/cartRedux";
import { notificationToast } from "../utils/numberFormatter";

class CartPage extends Component {
  componentDidMount() {
    const { getCart } = this.props;
    getCart({
      onSuccess: () => {},
      onFailure: (textError) => {
        notificationToast(textError);
      },
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div className="container" style={{ padding: "0px" }}>
        <Header history={history} />
        {/* <!-- Cart --> */}
        <section className="section" style={{ margin: " 30px 40px 50px" }}>
          {/* product-table */}
          <CartsContainer history={history} />
        </section>

        <AppFooter />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
  getCart: (meta) => dispatch(cartActions.getCart(meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
