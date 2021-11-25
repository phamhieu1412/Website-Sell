import React, { useState } from "react";
import { connect } from "react-redux";
import { Table, Button, Modal, Input } from "antd";
import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

import "../css/order.scss";
import {
  numberToVnd,
  notificationToast,
  successNotificationToast,
} from "../utils/numberFormatter";
import Loading from "../components/Loading";
import { actions as orderActions } from "../redux/orderRedux";

export const ListOrders = (props) => {
  const {
    isFetching,
    listOrders,
    getOrderDetail,
    orderDetail,
    deleteOrderDetail,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [id, setId] = useState(0);
  const [reason, setReason] = useState("");

  const renderStatusOrder = (status) => {
    let str = "";
    if (status === 1 || status === 2) {
      str = "Chờ thanh toán";
    } else if (status === 3 || status === 4) {
      str = "Chờ lấy hàng";
    } else if (status === 5) {
      str = "Đang giao";
    } else if (status === 6) {
      str = "Đã giao";
    } else if (status === 7) {
      str = "Đã hủy";
    }
    return str;
  };

  const dateToString = (time) => {
    const date = new Date(time);
    return `${date.getMinutes()}:${date.getHours()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setVisiblePopover(false);
    setId(0);
    setReason("");
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      filterMode: "tree",
      filterSearch: true,
      width: "10%",
    },
    {
      title: "Tổng giá",
      dataIndex: "final_total_price",
      render: (value, record) => <>{numberToVnd(record.final_total_price)}</>,
      sorter: (a, b) => a.final_total_price - b.final_total_price,
      align: "right",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      render: (value, record) => (
        <>{dateToString(record.created_date * 1000)}</>
      ),
      align: "right",
      filterSearch: true,
      width: "30%",
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      filters: [
        {
          text: "Chờ thanh toán",
          value: 1,
        },
        {
          text: "Chờ thanh toán",
          value: 2,
        },
        {
          text: "Chờ lấy hàng",
          value: 3,
        },
        {
          text: "Chờ lấy hàng",
          value: 4,
        },
        {
          text: "Đang giao",
          value: 5,
        },
        {
          text: "Đã giao",
          value: 6,
        },
        {
          text: "Đã hủy",
          value: 7,
        },
      ],
      onFilter: (value, record) => record.status === value,
      filterSearch: true,
      width: "40%",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      render: (value, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ border: "none", margin: "0 5px" }}
            onClick={() => showDetail(record.id)}
          >
            <FileTextOutlined style={{ fontSize: "25px" }} />
          </Button>
          <Button
            onClick={() => {
              setId(record.id);
              setVisiblePopover(true);
            }}
            style={{ border: "none" }}
          >
            <DeleteOutlined style={{ fontSize: "25px" }} />
          </Button>
        </div>
      ),
      align: "right",
      filterSearch: true,
      width: "30%",
    },
  ];
  const columnsProduct = [
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
      render: (value, record) => (
        <div style={{ fontSize: "16px" }}>{value}</div>
      ),
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

  const onDeleteOrder = (id, reason) => {
    deleteOrderDetail(
      id,
      {
        cancel_reason: reason,
      },
      {
        onSuccess: (text) => {
          successNotificationToast(text);
        },
        onFailure: (text) => {
          notificationToast(text);
        },
      }
    );
  };

  const showDetail = (id) => {
    getOrderDetail(id);
    setIsModalVisible(true);
  };

  return (
    <div className="order-tab">
      <ToastContainer />
      {!isFetching && <Table columns={columns} dataSource={listOrders} />}

      <Modal
        title="Chi tiết đơn hàng"
        visible={visiblePopover}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <Input
            value={reason}
            style={{ marginBottom: "15px" }}
            onChange={(e) => setReason(e.target.value)}
          />

          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              setVisiblePopover(false);
              onDeleteOrder(id, reason);
              setReason("");
            }}
          >
            Gửi
          </Button>
        </div>
      </Modal>

      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {!isFetching && orderDetail?.id ? (
          <div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
            >
              <h6
                style={{
                  fontSize: "16px",
                  margin: "0 10px 0 0",
                  fontWeight: "600",
                }}
              >
                Phương thức vận chuyển
              </h6>
              <span>
                {orderDetail.delivery_method === 1
                  ? "Giao tận nơi"
                  : "Lấy tại cửa hàng"}
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
            >
              <h6
                style={{
                  fontSize: "16px",
                  margin: "0 10px 0 0",
                  fontWeight: "600",
                }}
              >
                Tổng tiền
              </h6>
              <span>{numberToVnd(orderDetail.final_total_price)}</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
            >
              <h6
                style={{
                  fontSize: "16px",
                  margin: "0 10px 0 0",
                  fontWeight: "600",
                }}
              >
                Lời nhắn
              </h6>
              <span>{orderDetail.note}</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
            >
              <h6
                style={{
                  fontSize: "16px",
                  margin: "0 10px 0 0",
                  fontWeight: "600",
                }}
              >
                Trạng thái đơn hàng
              </h6>
              <span>{renderStatusOrder(orderDetail.status)}</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
            >
              {orderDetail.vat_invoice && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span>
                    Công ty: {orderDetail.order_vat_invoice.company_name}
                  </span>
                  <span>
                    Mã số thuế:{" "}
                    {orderDetail.order_vat_invoice.tax_identification_number}
                  </span>
                  <span>
                    Địa chỉ công ty:{" "}
                    {orderDetail.order_vat_invoice.company_address}
                  </span>
                </div>
              )}
            </div>
            {/* <h6>Sản phẩm</h6> */}
            <Table
              columns={columnsProduct}
              dataSource={orderDetail.order_products}
              pagination={true}
              rowKey={(item) => `${item.id}`}
              scroll={{ x: 1500, y: 300 }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ orderReducer }) => ({
  isFetching: orderReducer.isFetching,
  listOrders: orderReducer.listOrders,
  meta: orderReducer.meta,
  orderDetail: orderReducer.orderDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getOrderDetail: (id) => dispatch(orderActions.getOrderDetail(id)),
  deleteOrderDetail: (id, payload, meta) =>
    dispatch(orderActions.deleteOrderDetail(id, payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders);
