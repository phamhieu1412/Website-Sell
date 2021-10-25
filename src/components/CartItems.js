import { notification } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { actions as cartActions } from '../../redux/cartRedux';
import { numberToVnd } from '../utils/numberFormatter';

class CartItems extends Component {
  //action
  onUpdateQuantity = (product, quantity) => {
    const { updateQuantity } = this.props;

    if (quantity > 0) {
      updateQuantity(
        {
          product_id: product.product_id,
          quantity,
        },
        product.id,
        {
          onSuccess: () => {
            notification.open({
              message: 'Thành công',
              description: 'Cập nhập giỏ hàng thành công',
              type: 'success',
            });
          },
          onFailure: () => {
            notification.open({
              message: 'Lỗi',
              description: 'Cập nhập giỏ hàng thất bại.Vui lòng thử lại.',
              type: 'error',
            });
          },
        },
      );
    }
  };

  showTotal = (price, quantity) => {
    return numberToVnd(price * quantity);
  };

  onDeleteToCart = (product) => {
    const { deleteItemInCart } = this.props;

    deleteItemInCart(product.id, {
      onSuccess: () => {
        notification.open({
          message: 'Thành công',
          description: 'Xóa sản phẩm khỏi giỏ hàng thành công',
          type: 'success',
        });
      },
      onFailure: () => {
        notification.open({
          message: 'Lỗi',
          description: 'Xóa sản phẩm khỏi giỏ hàng thất bại.Vui lòng thử lại.',
          type: 'error',
        });
      },
    });
  };

  render() {
    var { item } = this.props; // item tu cartcontainer
    var { quantity } = item;

    return (
      <tbody>
        <tr>
          <th scope="row">
            <img src={item.thumbnail_url} alt="" className="img-fluid z-depth-0" />
          </th>
          <td>
            <h5>
              <strong>{item.product_title}</strong>
            </h5>
          </td>
          <td>
            <h6>{numberToVnd(item.product_price)}</h6>
          </td>
          <td className="center-on-small-only">
            <span className="">{quantity}</span>
            <br />
            <div className="btn-group radio-group" data-toggle="buttons">
              <label
                className="btn btn-sm btn-primary btn-rounded waves-effect waves-light"
                onClick={() => this.onUpdateQuantity(item, quantity - 1)}>
                <a href="#">—</a>
              </label>
              <label
                className="btn btn-sm btn-primary btn-rounded waves-effect waves-light"
                onClick={() => this.onUpdateQuantity(item, quantity + 1)}>
                <a href="#">+</a>
              </label>
            </div>
          </td>
          <td>
            <h6>{this.showTotal(item.product_price, quantity)}</h6>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-sm btn-primary waves-effect waves-light"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Remove item"
              onClick={() => this.onDeleteToCart(item)}>
              X
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = ({ cartReducer }) => ({
  // infoCart: cartReducer.infoCart,
  // isFetching: cartReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  // updateQuantity: (payload, cart_item_id, meta) => dispatch(cartActions.updateQuantity(payload, cart_item_id, meta)),
  // deleteItemInCart: (cart_item_id, meta) => dispatch(cartActions.deleteItemInCart(cart_item_id, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
