import React, { Component } from "react";
import { connect } from "react-redux";

import { numberToVnd } from "../utils/numberFormatter";
import "../css/voucher.scss";

class VoucherItem extends Component {
  render() {
    const { detailCoupon } = this.props;

    return (
      <div className="voucher-item">
        <div className="voucher-item__logo">
          <div className="voucher-item-logo__logo">
            <img
              src={require("../../../../assets/logo_TriThuc.png")}
              style={{ width: "100px" }}
            />
            <div>{detailCoupon.value} %</div>
          </div>
        </div>
        <div className="voucher-item__content">
          <div>
            <h5>{detailCoupon.description}</h5>
            <p>{numberToVnd(detailCoupon.max_value)}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ couponReducer }) => ({
  detailCoupon: couponReducer.detailCoupon,
});

// const mapDispatchToProps = (dispatch) => ({
// getAllBooks: (params) => dispatch(motelActions.getAllBooks(params)),
// });

export default connect(mapStateToProps, null)(VoucherItem);
