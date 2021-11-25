import React, { Component } from "react";
import { connect } from "react-redux";

import { actions as cartActions } from "../redux/cartRedux";
import {
  numberToVnd,
  notificationToast,
  successNotificationToast,
} from "../utils/numberFormatter";

class CartItems extends Component {
  //action
  onUpdateQuantity = (id, quantity) => {
    const { updateQuantity } = this.props;

    if (quantity > 0) {
      updateQuantity(
        {
          quantity,
        },
        id,
        {
          onSuccess: () => {
            successNotificationToast("Cập nhập giỏ hàng thành công");
          },
          onFailure: () => {
            notificationToast("Cập nhập giỏ hàng thất bại.Vui lòng thử lại.");
          },
        }
      );
    }
  };

  showTotal = (price, quantity) => {
    return numberToVnd(price * quantity);
  };

  onDeleteToCart = (id) => {
    const { deleteItemInCart } = this.props;

    deleteItemInCart(id, {
      onSuccess: () => {
        successNotificationToast("Xóa sản phẩm khỏi giỏ hàng thành công");
      },
      onFailure: () => {
        notificationToast(
          "Xóa sản phẩm khỏi giỏ hàng thất bại.Vui lòng thử lại."
        );
      },
    });
  };

  render() {
    var { item } = this.props; // item tu cartcontainer
    var { quantity, product } = item;

    return (
      <tbody>
        <tr>
          <th scope="row">
            <img
              src={product.avatar_url}
              alt={product.name}
              style={{ width: "200px", marginTop: "10px" }}
            />
          </th>
          <td>
            <h4>
              <strong>{product.name}</strong>
            </h4>
          </td>
          <td>
            <h6 className="price">{numberToVnd(product.price)}</h6>
            <h6 className="final-price">{numberToVnd(product.final_price)}</h6>
          </td>
          <td className="center-on-small-only">
            <span className="">{quantity}</span>
            <br />
            <div className="btn-group-action">
              <label
                className="label-btn-group"
                onClick={() => this.onUpdateQuantity(item.id, quantity - 1)}
              >
                <p>—</p>
              </label>
              <label
                className="label-btn-group"
                onClick={() => this.onUpdateQuantity(item.id, quantity + 1)}
              >
                <p>+</p>
              </label>
            </div>
          </td>
          <td>
            <h6
              style={{
                fontSize: "1.3rem",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              {this.showTotal(product.final_price, quantity)}
            </h6>
          </td>
          <td>
            <button
              type="button"
              className="btn-delete-item"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Remove item"
              onClick={() => this.onDeleteToCart(item.id)}
            >
              X
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateQuantity: (payload, cartItemId, meta) =>
    dispatch(cartActions.updateQuantity(payload, cartItemId, meta)),
  deleteItemInCart: (cart_item_id, meta) =>
    dispatch(cartActions.deleteItemInCart(cart_item_id, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
