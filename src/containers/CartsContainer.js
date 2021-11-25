import React, { Component } from "react";
import { connect } from "react-redux";

import Cart from "../components/Cart";
import CartItems from "../components/CartItems";
import CartResult from "../components/CartResult";

class CartsContainer extends Component {
  showCartItem = (carts) => {
    let result;

    result = carts.map((item, index) => {
      return (
        <CartItems
          key={index}
          item={item}
          onDeleteToCart={this.props.onDeleteToCart}
          onChangeMessage={this.props.onChangeMessage}
          onUpdateProductInCart={this.props.onUpdateProductInCart}
        />
      );
    });
    return result;
  };

  showTotalItem = (carts) => {
    let result = null;
    const { history, totalMoney } = this.props;

    if (carts && carts.length > 0) {
      result = <CartResult totalMoney={totalMoney} history={history} />;
    }
    return result;
  };

  render() {
    // carts lay tu reducer su dung qua props
    var { productsInCart } = this.props;

    if (productsInCart.length === 0) {
      return (
        <div
          style={{ fontSize: "2rem", textAlign: "center", margin: "20px 0" }}
        >
          Giỏ hàng trống! Hãy cập nhập giỏ hàng
        </div>
      );
    }
    return (
      <Cart>
        {/* show san pham them gior hang */}
        {productsInCart && this.showCartItem(productsInCart)}
        {/* show tong tien san pham */}
        {productsInCart && this.showTotalItem(productsInCart)}
      </Cart>
    );
  }
}

const mapStateToProps = ({ cartReducer }) => ({
  productsInCart: cartReducer.productsInCart,
  totalMoney: cartReducer.totalMoney,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartsContainer);
