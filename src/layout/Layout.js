import { Layout } from "antd";
import React, { Component } from "react";
import { useSelector, connect } from "react-redux";
import { useHistory } from "react-router";
import "../css/layout.scss";
import AppFooter from "./Footer";
import AppHeader from "./Header";
import SlideProduct from "../components/SlideProduct";
import VoucherHome from "../components/VoucherHome";
import PromotionProduct from "../components/PromotionProduct";
import ListProduct from "../components/ListProduct";
import ListSpecialProduct from "../components/ListSpecialProduct";
import ListBestSellingProduct from "../components/ListBestSellingProduct";

const { Content } = Layout;

function ContentLayout(props) {
  const history = useHistory();
  const { isLogin } = props;

  return (
    <div>
      <div className="page-title">
        <AppHeader isLogin={isLogin} history={history} />
      </div>

      <div style={{ padding: "10px 30px" }}>
        <div className="introduction-content">
          <SlideProduct />
          <VoucherHome />
        </div>
        <PromotionProduct />
        <ListBestSellingProduct />
        <ListSpecialProduct />
        <ListProduct history={history} />
      </div>
    </div>
  );
}

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    const { isLogin } = this.state;
    const { infoCart, listMenu } = this.props;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ background: "#ffffff" }}>
          <ContentLayout
            isLogin={isLogin}
            infoCart={infoCart}
            listMenu={listMenu}
          />
        </Content>

        <AppFooter />
      </Layout>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  listMenu: appReducer.menu,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
