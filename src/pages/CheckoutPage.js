import { Table, Input, Tabs, notification, Popover, Radio } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import AppHeader from "../layout/Header";
import AppFooter from "../layout/Footer";
import Loading from "../components/Loading";
import "../css/checkout.scss";
import {
  numberToVnd,
  notificationToast,
  successNotificationToast,
} from "../utils/numberFormatter";
import { actions as cartActions } from "../redux/cartRedux";
import { actions as authActions } from "../redux/authRedux";
import PayWithPayPal from "../components/PayWithPayPal";

const { TabPane } = Tabs;
const columns = [
  {
    title: () => (
      <div
        style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}
      >
        Sản phẩm
      </div>
    ),
    dataIndex: "name",
    key: "name",
    render: (value, record) => (
      <div style={{ fontSize: "16px", display: "flex" }}>
        <img
          src={record.product.avatar_url}
          style={{ height: "50px", width: "50px", objectFit: "cover" }}
        />
        <div
          style={{ fontSize: "16px", fontWeight: "500", marginLeft: "10px" }}
        >
          {record.product.name}
        </div>
      </div>
    ),
  },
  {
    title: () => (
      <div style={{ fontSize: "15px", fontWeight: "bold" }}>Đơn giá</div>
    ),
    dataIndex: "price",
    key: "price",
    align: "right",
    render: (value, record) => (
      <div style={{ fontSize: "16px" }}>
        <span style={{ textDecoration: "line-through", marginRight: "7px" }}>
          {numberToVnd(record.product.price)}
        </span>
        <span style={{ fontWeight: "bold" }}>
          {numberToVnd(record.product.final_price)}
        </span>
      </div>
    ),
  },
  {
    title: () => (
      <div style={{ fontSize: "15px", fontWeight: "bold" }}>Số lượng</div>
    ),
    dataIndex: "quantity",
    key: "quantity",
    align: "right",
    render: (value, record) => <div style={{ fontSize: "16px" }}>{value}</div>,
  },
  {
    title: () => (
      <div style={{ fontSize: "15px", fontWeight: "bold" }}>Thành tiền</div>
    ),
    key: "total",
    dataIndex: "total",
    align: "right",
    render: (value, record) => (
      <div style={{ fontSize: "16px" }}>
        {numberToVnd(record.product.final_price * record.quantity)}
      </div>
    ),
  },
];

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabPayment: "1",
      note: "",
      isVisibleVoucher: false,
      couponId: null,
      isLogin: false,
      deliveryId: 1,
      infoCheckout: {
        note: "",
        delivery_method: 1,
        order_products: [],
        order_delivery_address: {
          full_name: "",
          phone: "",
          address: "",
          province: "",
          district: "",
          ward: "",
        },
        order_vat_invoice: {
          company_name: "",
          tax_identification_number: "",
          company_address: "",
        },
      },
      companyName: "",
      tax: "",
      companyAddress: "",
      isBLock: false,
    };
  }

  componentDidMount() {
    const { getCart, history } = this.props;

    getCart({
      onSuccess: () => {
        this.setState({ isLogin: true });
      },
      onFailure: () => {
        history.push("/login");
        this.setState({ isLogin: false });
      },
    });
  }

  onChangeKeyTab = (key) => {
    this.setState({ tabPayment: key });
  };

  onCheckout = () => {
    this.setState({ isBLock: true });
    const { checkout, userDetail, history, productsInCart } = this.props;
    const { note, companyName, tax, companyAddress, deliveryId } = this.state;
    let tempArrayProducts = [];
    for (let i = 0; i < productsInCart.length; i++) {
      tempArrayProducts.push({
        product_id: productsInCart[i].product_id,
        quantity: productsInCart[i].quantity,
      });
    }

    if (userDetail.id) {
      checkout(
        {
          note: note,
          delivery_method: deliveryId,
          order_products: tempArrayProducts,
          order_delivery_address: {
            full_name: userDetail.full_name,
            phone: userDetail.phone,
            address: userDetail.address,
            province: userDetail.province,
            district: userDetail.district,
            ward: userDetail.ward,
          },
          order_vat_invoice: {
            company_name: companyName,
            tax_identification_number: tax,
            company_address: companyAddress,
          },
        },
        {
          onSuccess: () => {
            successNotificationToast("Mua hàng thành công");
            setTimeout(() => {
              history.push("/account/profile");
            }, 3000);
          },
          onFailure: (text) => {
            this.setState({ isBLock: false });
            notificationToast(text);
          },
        }
      );
    }
  };

  onchangeNote = (event) => {
    this.setState({ note: event.target.value });
  };

  onChangeMethodDelivery = (e) => {
    this.setState({ deliveryId: e.target.value });
  };

  onChangeCompanyName = (e) => {
    this.setState({ companyName: e.target.value });
  };
  onChangeCompanyTax = (e) => {
    this.setState({ tax: e.target.value });
  };
  onChangeCompanyAddress = (e) => {
    this.setState({ companyAddress: e.target.value });
  };

  renderChooseMethodDelivery = () => {
    const { deliveryId } = this.state;

    return (
      <div>
        <Radio.Group
          onChange={this.onChangeMethodDelivery}
          style={{ display: "flex", flexDirection: "column" }}
          value={deliveryId}
        >
          <Radio value={1}>Giao tận nơi</Radio>
          <Radio value={2}>Lấy tại cửa hàng</Radio>
        </Radio.Group>
      </div>
    );
  };

  render() {
    const { isFetching, history, productsInCart, totalMoney, userDetail } =
      this.props;
    const { tabPayment, companyAddress, tax, companyName, deliveryId, isBLock } =
      this.state;

    return (
      <main style={{ background: "#F5F5F5" }}>
        <ToastContainer />
        <AppHeader isCartScreen={true} history={history} />

        <div className="container" style={{ marginBottom: "50px" }}>
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
                    {userDetail.id && userDetail.full_name} (+84){" "}
                    {userDetail.id &&
                      userDetail.phone.substring(1, userDetail.phone.length)}
                  </div>
                  <div className="checkout-address-row__address-summary">
                    {userDetail.id &&
                      `${userDetail.ward}, ${userDetail.district}, ${userDetail.province}`}
                  </div>
                  <div className="checkout-address-row__default-label">
                    Mặc định
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-info-product">
            {productsInCart && productsInCart.length > 0 && (
              <Table
                columns={columns}
                dataSource={productsInCart}
                pagination={false}
                rowKey={(item) => `${item.id}`}
              />
            )}

            <div className="checkout-note-ship">
              <div className="checkout-note">
                <div style={{ width: "100px" }}>Lời nhắn:</div>
                <Input.TextArea
                  rows={3}
                  placeholder="Lưu ý cho Người bán..."
                  onChange={this.onchangeNote}
                />
              </div>
              <div className="checkout-ship">
                <div style={{ color: "#00bfa5" }}>Phương thức vận chyển</div>

                {deliveryId === 1 ? (
                  <div>
                    <p style={{ fontWeight: "600", margin: "0 0 8px 0" }}>
                      Giao tận nơi
                    </p>
                    <p style={{ fontWeight: "400", margin: "0" }}>
                      Giao hàng nhanh
                    </p>
                    <p style={{ color: "#888", margin: "0" }}>
                      Nhận hàng sau 1 - 3 ngày
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontWeight: "600", margin: "0 0 8px 0" }}>
                      Lấy tại cửa hàng
                    </p>
                  </div>
                )}
                <Popover
                  style={{ margin: "0px" }}
                  content={this.renderChooseMethodDelivery}
                  trigger="click"
                  placement="left"
                >
                  <div
                    style={{
                      textTransform: "uppercase",
                      color: "#05a",
                      cursor: "pointer",
                    }}
                  >
                    Thay đổi
                  </div>
                </Popover>
              </div>
            </div>

            <div className="total-money">
              <div style={{ color: "#929292" }}>
                Tổng số tiền ({productsInCart.length} sản phẩm):
              </div>
              <p style={{ marginLeft: "15px", color: "#ee4d2d" }}>
                {numberToVnd(totalMoney)}
              </p>
            </div>
          </div>

          <div className="checkout-payment">
            <div
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Thông tin công ty
            </div>
            <div style={{ display: "flex" }}>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input
                      type="text"
                      placeholder="Nhập tên công ty"
                      maxLength="100"
                      value={companyName}
                      onChange={this.onChangeCompanyName}
                    />
                  </div>
                </div>
              </div>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input
                      type="number"
                      placeholder="Nhập mã số thuế"
                      maxLength="12"
                      value={tax}
                      onChange={this.onChangeCompanyTax}
                    />
                  </div>
                </div>
              </div>
              <div className="_2_JugQ">
                <div className="input-with-validator-wrapper">
                  <div className="input-with-validator">
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ công ty"
                      maxLength="100"
                      value={companyAddress}
                      onChange={this.onChangeCompanyAddress}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-payment">
            <div
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Phương thức thanh toán
            </div>

            <Tabs onChange={this.onChangeKeyTab} type="card">
              <TabPane tab="Thanh toán khi nhận hàng" key="1">
                <div style={{ margin: "15px" }}>Thanh toán khi nhận hàng</div>
              </TabPane>
              <TabPane tab="Thẻ" key="2">
                {/* {defaultAddress.id && (
                    <PayWithPayPal
                      infoCart={infoCart}
                      checkout={checkout}
                      defaultAddress={defaultAddress}
                      note={note}
                      history={history}
                    />
                  )} */}
              </TabPane>
            </Tabs>

            {tabPayment === "1" ? (
              <div
                style={{
                  margin: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  disabled={isBLock ? true : false}
                  className="btn-payment"
                  onClick={this.onCheckout}
                >
                  Đặt hàng
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <AppFooter />
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
              height: "200vh",
            }}
          >
            <Loading />
          </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = ({ cartReducer, authReducer }) => ({
  infoCart: cartReducer.infoCart,
  isFetching: cartReducer.isFetching,
  listAddressUser: authReducer.listAddressUser,
  userDetail: authReducer.userDetail,
  productsInCart: cartReducer.productsInCart,
  totalMoney: cartReducer.totalMoney,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: (meta) => dispatch(cartActions.getCart(meta)),
  checkout: (payload, meta) => dispatch(cartActions.checkout(payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
