import React, { useState } from "react";
import { Menu } from "antd";
import {
  OrderedListOutlined,
  UserOutlined,
  NotificationOutlined,
  EditOutlined,
} from "@ant-design/icons";

import "../css/profile.scss";
import ProfileAccount from "../components/ProfileAccount";
import ListOrders from "../components/ListOrders";

const { SubMenu } = Menu;
const rootSubMenuKeys = ["profile", "purchase", "notification"];

const Account = (props) => {
  const [currentKey, setCurrentKey] = useState("profile");
  const { userDetail } = props;

  const handleClick = (e) => {
    setCurrentKey(e.key);
  };

  const renderContent = () => {
    if (currentKey === "profile") {
      return <ProfileAccount userDetail={userDetail} />;
    } else if (currentKey === "purchase") {
      return <ListOrders userDetail={userDetail} />;
    }

    return <div />;
  };

  return (
    <div className="profile-component">
      {/* block left */}
      <div className="left-profile">
        <div className="profile-avatar">
          <div className="avatar">
            <UserOutlined />
          </div>
          <div className="name-avatar">
            <p>hh</p>
            <button className="btn-edit-info">
              <EditOutlined />
              <p>Sửa Hồ Sơ</p>
            </button>
          </div>
        </div>
        <Menu
          mode="inline"
          openKeys={currentKey}
          onClick={handleClick}
          defaultSelectedKeys={["profile"]}
          defaultOpenKeys={["profile"]}
          style={{ width: 256 }}
        >
          <Menu.Item icon={<UserOutlined />} key="profile">
            Hồ sơ
          </Menu.Item>
          <Menu.Item key="purchase" icon={<OrderedListOutlined />}>
            Đơn mua
          </Menu.Item>
          <Menu.Item key="notification" icon={<NotificationOutlined />}>
            Thông báo
          </Menu.Item>
        </Menu>
      </div>

      {/* block right */}
      <div className="right-profile">{userDetail.id && renderContent()}</div>
    </div>
  );
};

export default Account;
