import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

import "../css/CartProductItem.css";
import "react-toastify/dist/ReactToastify.css";
import CartsContainer from "../containers/CartsContainer";
import Header from "../layout//Header";
import AppFooter from "../layout/Footer";
import Loading from "../components/Loading";
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
    const { history, isFetching } = this.props;
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
        {isFetching && (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              zIndex: 11,
            }}
          >
            <Loading />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cartReducer }) => ({
  isFetching: cartReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: (meta) => dispatch(cartActions.getCart(meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
