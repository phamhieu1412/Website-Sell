import React, { Component } from 'react';

export default class Cart extends Component {
  render() {
    return (
      <section className="section">
        <div className="table-responsive">
          <table className="table product-table">
            <tbody>
              <tr>
                <th>Ảnh</th>
                <th className="th-2">Sản Phẩm</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng Cộng</th>
                <th style={{ width: '10%' }} />
              </tr>
            </tbody>

            {/* //cart items */}
            {this.props.children}
          </table>
        </div>
      </section>
    );
  }
}
