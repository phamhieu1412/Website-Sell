import React, { Component } from "react";

import { numberToVnd } from "../utils/numberFormatter";

export default class CartResult extends Component {
  render() {
    const { history, totalMoney } = this.props;
    return (
      <tbody>
        <tr>
          <td colSpan="2"></td>
          <td>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "15px 0 0 0",
              }}
            >
              Tổng Tiền
            </h4>
          </td>
          <td>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "15px 0 0 0",
              }}
            >
              {numberToVnd(totalMoney)}
            </h4>
          </td>
          <td colSpan="3">
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
              onClick={() => history.push("/checkout")}
            >
              Thanh toán
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}
