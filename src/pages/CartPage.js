import { Col, Row, Button, Layout } from 'antd';
import React, { Component } from 'react';

import '../css/CartProductItem';
import CartsContainer from '../containers/CartsContainer';
import AppFooter from '../../layout/Footer';

const { Header } = Layout;

export default class ProductCart extends Component {
  render() {
    const { history } = this.props;
    return (

          <div className="container" style={{ marginBottom: '50px' }}>
            {/* <!-- Cart --> */}
            <section className="section">
              <h2 className="section-heading">Giỏ hàng</h2>
              {/* product-table */}
              <CartsContainer history={history} />
            </section>
          </div>
    );
  }
}
