import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cart from '../components/Cart';
import CartItems from '../components/CartItems';
import CartResult from '../components/CartResult';
// import { actions as cartActions } from '../../redux/cartRedux';
// import { actDeleteToCart, actMessageChange, actUpdateProductInCart } from '../../actions/indexAction';

class CartsContainer extends Component {
  componentDidMount() {
    const { getCart, history } = this.props;
    const token = localStorage.getItem('token');

    if (token && token.length > 0) {
      getCart({
        onSuccess: () => {},
        onFailure: () => {
          history.push('/login');
        },
      });
    }
  }

  showCartItem = (carts) => {
    let result = (
      <tbody>
        <tr>
          <td>Giỏ hàng trống! Hãy cập nhập giỏ hàng</td>
        </tr>
      </tbody>
    );

    if (carts.length > 0) {
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
    }
    return result;
  };

  showTotalItem = (carts) => {
    var result = null;
    var { history } = this.props;

    if (carts.items && carts.items.length > 0) {
      result = <CartResult carts={carts} history={history} />;
    }
    return result;
  };

  render() {
    // carts lay tu reducer su dung qua props
    var { infoCart, history } = this.props;

    return (
      <Cart>
        {/* show san pham them gior hang */}
        {infoCart.items && this.showCartItem(infoCart.items)}
        {/* show tong tien san pham */}
        {infoCart.items && this.showTotalItem(infoCart)}
      </Cart>
    );
  }
}

const mapStateToProps = ({ cartReducer }) => ({
  // infoCart: cartReducer.infoCart,
  // isFetching: cartReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  // getCart: (meta) => dispatch(cartActions.getCart(meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartsContainer);
