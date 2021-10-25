import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Col, Row, Button, Layout, Table, Input, Tabs, notification, Modal, Avatar, Dropdown, Menu } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppFooter from '../layout/Footer';
import '../css/checkout.scss';
import Voucher from '../assets/images/voucher';
import VoucherEmpty from '../assets/images/voucherEmpty';
import { numberToVnd } from '../utils/numberFormatter';
import { actions as cartActions } from '../../redux/cartRedux';
import { actions as authActions } from '../../redux/authRedux';
import { actions as couponActions } from '../../redux/couponRedux';
import PayWithPayPal from '../components/PayWithPayPal';
import VoucherItem from '../components/VoucherItem';

const { TabPane } = Tabs;
const { Header } = Layout;
const columns = [
  {
    title: () => <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Sản phẩm</div>,
    dataIndex: 'name',
    key: 'name',
    render: (value, record) => (
      <div style={{ fontSize: '16px', display: 'flex' }}>
        <img src={record.thumbnail_url} style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
        <div style={{ fontSize: '16px', fontWeight: '500', marginLeft: '10px' }}>{record.product_title}</div>
      </div>
    ),
  },
  {
    title: () => <div style={{ fontSize: '15px', opacity: 0.5 }}>Đơn giá</div>,
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (value, record) => (
      <div style={{ fontSize: '16px' }}>
        <span style={{ textDecoration: 'line-through', marginRight: '7px' }}>{numberToVnd(record.product_price)}</span>
        {numberToVnd(record.product_price - record.product_discount)}
      </div>
    ),
  },
  {
    title: () => <div style={{ fontSize: '15px', opacity: 0.5 }}>Số lượng</div>,
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'right',
    render: (value, record) => <div style={{ fontSize: '16px' }}>{value}</div>,
  },
  {
    title: () => <div style={{ fontSize: '15px', opacity: 0.5 }}>Thành tiền</div>,
    key: 'total',
    dataIndex: 'total',
    align: 'right',
    render: (value, record) => (
      <div style={{ fontSize: '16px' }}>
        {numberToVnd((record.product_price - record.product_discount) * record.quantity)}
      </div>
    ),
  },
];
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Thông tin tài khoản
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">Đăng xuất</Menu.Item>
  </Menu>
);

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabPayment: '1',
      note: '',
      isVisibleVoucher: false,
      couponId: null,
      isLogin: false,
    };
  }

  componentDidMount() {
    const { getCart, history, getAddressUser } = this.props;

    getCart({
      onSuccess: () => {
        getAddressUser();
        this.setState({ isLogin: true });
      },
      onFailure: () => {
        history.push('/login');
        this.setState({ isLogin: false });
      },
    });
  }

  onChangeKeyTab = (key) => {
    this.setState({ tabPayment: key });
  };

  onCheckout = () => {
    const { checkout, defaultAddress, history } = this.props;
    const { note } = this.state;

    if (defaultAddress.id) {
      checkout(
        {
          address_id: defaultAddress.id,
          content: note,
        },
        {
          onSuccess: () => {
            notification.open({
              message: 'Thành công',
              description: 'Mua hàng thành công',
              type: 'success',
            });
            history.push('/home');
          },
          onFailure: () => {
            notification.open({
              message: 'Lỗi',
              description: 'Mua hàng thất bại.Vui lòng thử lại.',
              type: 'error',
            });
          },
        },
      );
    }
  };

  onchangeNote = (event) => {
    this.setState({ note: event.target.value });
  };

  onChangeCoupon = (event) => {
    this.setState({ couponId: event.target.value });
  };

  getDetailCoupon = () => {
    const { getDetailCoupon } = this.props;
    const { couponId } = this.state;

    getDetailCoupon(couponId, {
      onSuccess: () => {
        notification.open({
          message: 'Thành công',
          description: 'Mã giảm giá có thể sử dụng',
          type: 'success',
        });
      },
      onFailure: () => {
        notification.open({
          message: 'Lỗi',
          description: 'Mã giảm giá không đúng.Vui lòng thử lại.',
          type: 'error',
        });
      },
    });
  };

  render() {
    const { infoCart, checkout, defaultAddress, history, detailCoupon } = this.props;
    const { tabPayment, note, isVisibleVoucher, couponId, isLogin } = this.state;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
      <>
        <main style={{ background: '#F5F5F5' }}>
          {/* <Layout style={{ minHeight: '100vh' }}> */}
          <Header
            style={{
              background: 'rgb(53, 153, 255) none repeat scroll 0% 0%',
              fontSize: '16px',
              fontWeight: 'bolder',
              textAlign: 'center',
              padding: '10px 20px 10px 10px',
              height: '100%',
            }}>
            <Row>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: 'Helvetica Neue',
                  color: 'white',
                  fontSize: '14px',
                }}>
                <div style={{ paddingRight: '20px' }}>Chào mừng bạn đến với cửa hàng sách Tri Thức</div>
                <div>Liên hệ với chúng tôi: 123-456-789</div>
              </Col>
              <Col span={4} />
              <Col span={8}>
                {isLogin === false ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      style={{ marginRight: '10px' }}
                      onClick={() => {
                        history.push('/register');
                      }}>
                      Đăng ký
                    </Button>
                    <Button
                      onClick={() => {
                        history.push('/login');
                      }}>
                      Đăng nhập
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => e.preventDefault()} >
                        {userInfo.nickname}
                        <DownOutlined style={{ marginLeft: '5px', marginTop: '3px' }} />
                      </a>
                    </Dropdown>
                  </div>
                )}
              </Col>
            </Row>
          </Header>

          <div className="container" style={{ marginBottom: '50px' }}>
            <div className="checkout-address-selection">
              <div className="checkout-address-selection--draw" />

              <div className="checkout-address-selection__container">
                <div className="checkout-address-selection__section-header">
                  <i className="fa fa-map-marker" aria-hidden="true" />
                  <p>Địa Chỉ Nhận Hàng</p>
                </div>
                <div className="checkout-address-selection__selected-address-summary">
                  <div className="checkout-address-row">
                    <div className="checkout-address-row__user-detail">
                      {defaultAddress.id && defaultAddress.name} (+84){' '}
                      {defaultAddress.id && defaultAddress.phone.substring(2, defaultAddress.phone.length)}
                    </div>
                    <div className="checkout-address-row__address-summary">
                      {defaultAddress.id &&
                        `${defaultAddress.address}, ${defaultAddress.district}, ${defaultAddress.city}`}
                    </div>
                    <div className="checkout-address-row__default-label">Mặc định</div>
                  </div>
                  <div className="checkout-address-selection__change-btn">Thay đổi</div>
                </div>
              </div>
            </div>

            <div className="checkout-info-product">
              {infoCart && infoCart.id && (
                <Table
                  columns={columns}
                  dataSource={infoCart.items}
                  pagination={false}
                  rowKey={(item) => `${item.id}`}
                />
              )}

              <div className="checkout-note-ship">
                <div className="checkout-note">
                  <div style={{ width: '100px' }}>Lời nhắn:</div>
                  <Input.TextArea rows={3} placeholder="Lưu ý cho Người bán..." onChange={this.onchangeNote} />
                </div>
                <div className="checkout-ship">
                  <div style={{ color: '#00bfa5' }}>Đơn vị vận chuyển</div>
                  <div>
                    <p style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Vận Chuyển Nhanh</p>
                    <p style={{ fontWeight: '400', margin: '0' }}>Shopee Express</p>
                    <p style={{ color: '#888', margin: '0' }}>Nhận hàng vào 0 Th03 - 0 Th03</p>
                  </div>
                  <div style={{ textTransform: 'uppercase', color: '#05a', cursor: 'pointer' }}>Thay đổi</div>
                  <div style={{ color: 'black' }}>{numberToVnd(infoCart.shipping && infoCart.shipping)}</div>
                </div>
              </div>

              <div className="total-money">
                <div style={{ color: '#929292' }}>
                  Tổng số tiền ({infoCart && infoCart.items && infoCart.items.length} sản phẩm):
                </div>
                <p style={{ marginLeft: '15px', color: '#ee4d2d' }}>{numberToVnd(infoCart.total && infoCart.total)}</p>
              </div>
            </div>

            <div className="checkout-voucher">
              <div className="checkout-voucher__left">
                <div style={{ width: '30px', marginRight: '15px' }}>
                  <Voucher />
                </div>
                <div style={{ fontWeight: '400', fontSize: '18px' }}>Mã giảm giá</div>
              </div>
              <div className="checkout-voucher__right">
                <div>
                  Đã chọn <span style={{ color: '#ee4d2d' }}>1</span> mã (-20.000d)
                </div>
                {/* <div style={{ color: '#05a', fontWeight: '500' }}>Chọn Voucher</div> */}
                <div
                  style={{ color: '#05a', fontWeight: '500', marginLeft: '25px' }}
                  onClick={() => this.setState({ isVisibleVoucher: true })}>
                  THAY ĐỔI
                </div>
              </div>
            </div>

            <div className="checkout-payment">
              <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '10px' }}>Phương thức thanh toán</div>

              <Tabs onChange={this.onChangeKeyTab} type="card">
                <TabPane tab="Thanh toán khi nhận hàng" key="1">
                  <div style={{ margin: '15px' }}>Thanh toán khi nhận hàng</div>
                </TabPane>
                <TabPane tab="Thẻ" key="2">
                  {defaultAddress.id && (
                    <PayWithPayPal
                      infoCart={infoCart}
                      checkout={checkout}
                      defaultAddress={defaultAddress}
                      note={note}
                      history={history}
                    />
                  )}
                </TabPane>
              </Tabs>

              <div className="payment-grand-total">
                <div style={{ width: '30%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>Tiền sách</div>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>{numberToVnd(infoCart.subtotal)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>Phí vận chuyển</div>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>+{numberToVnd(infoCart.shipping)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>Giảm giá từ sách</div>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>-{numberToVnd(infoCart.item_discount)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>Giảm giá từ mã giảm giá</div>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>-{numberToVnd(infoCart.discount)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'rgba(0,0,0,.54)' }}>Tổng thanh toán:</div>
                    <div style={{ color: '#ee4d2d', fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>
                      {numberToVnd(infoCart.grand_total)}
                    </div>
                  </div>
                </div>
              </div>

              {tabPayment === '1' ? (
                <div style={{ margin: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn-payment" onClick={() => this.onCheckout()}>
                    Đặt hàng
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <AppFooter />
          {/* </Layout> */}
          <Modal closable={false} title="Chọn mã giảm giá" visible={isVisibleVoucher} footer={null}>
            <div className="modal-voucher">
              <div className="voucher-input">
                <div className="voucher-input__text">Mã Voucher</div>
                <div className="voucher-input__input">
                  <Input placeholder="Mã Voucher" onChange={this.onChangeCoupon} />
                </div>
                <div className="voucher-input__button">
                  <Button disabled={couponId && couponId.length > 0 ? false : true} onClick={this.getDetailCoupon}>
                    Áp Dụng
                  </Button>
                </div>
              </div>
              <div className="voucher-content">
                {detailCoupon && detailCoupon.code ? (
                  <VoucherItem />
                ) : (
                  <>
                    <VoucherEmpty />
                    <h3 style={{ color: 'rgba(0,0,0,.65)', margin: '15px 0', lineHeight: '13px', textAlign: 'center' }}>
                      Không tìm thấy mã giảm giá nào trong mục Ví Voucher của bạn
                    </h3>
                    <p
                      style={{
                        color: 'rgba(0,0,0,.65)',
                        margin: '15px 0',
                        lineHeight: '13px',
                        textAlign: 'center',
                        fontSize: '14px',
                      }}>
                      Không tìm thấy mã giảm giá nào trong mục Ví Voucher của bạn. Hãy bắt đầu lưu voucher từ những
                      trang chương trình khuyến mãi nhé!
                    </p>
                    <div style={{ width: '100%', marginTop: '20px' }}>
                      <Button
                        style={{ float: 'right', background: '#fa5e4e', color: 'white' }}
                        onClick={() => this.setState({ isVisibleVoucher: false })}>
                        OK
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Modal>
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ cartReducer, authReducer, couponReducer }) => ({
  infoCart: cartReducer.infoCart,
  isFetching: cartReducer.isFetching,
  listAddressUser: authReducer.listAddressUser,
  defaultAddress: authReducer.defaultAddress,
  detailCoupon: couponReducer.detailCoupon,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: (meta) => dispatch(cartActions.getCart(meta)),
  checkout: (payload, meta) => dispatch(cartActions.checkout(payload, meta)),
  getAddressUser: () => dispatch(authActions.getAddressUser()),
  getDetailCoupon: (couponId, meta) => dispatch(couponActions.getDetailCoupon(couponId, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
