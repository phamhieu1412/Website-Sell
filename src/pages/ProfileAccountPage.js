import { Layout } from "antd";
import React, { Component } from "react";
import { useSelector, connect } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer } from "react-toastify";

import AppFooter from "../layout/Footer";
import AppHeader from "../layout/Header";
import Account from "../components/Account";
import Loading from "../components/Loading";
import { actions as authActions } from "../redux/authRedux";
import { actions as orderActions } from "../redux/orderRedux";

const { Content } = Layout;

function ContentLayout(props) {
  const history = useHistory();
  const { isLogin, userDetail } = props;

  return (
    <div>
      <div className="page-title">
        <AppHeader isLogin={isLogin} history={history} isCartScreen={true} />
      </div>

      <div style={{ padding: "10px 30px" }}>
        <Account userDetail={userDetail} />
      </div>
    </div>
  );
}

class ProfileAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  componentDidMount() {
    const { getOrders } = this.props;

    getOrders({ page: 1, page_size: 10 });
  }

  render() {
    const { isLogin } = this.state;
    const { infoCart, userDetail, isFetching } = this.props;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ background: "#ffffff" }}>
          <ContentLayout
            isLogin={isLogin}
            infoCart={infoCart}
            userDetail={userDetail}
          />
        </Content>

        <ToastContainer />
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
            }}
          >
            <Loading />
          </div>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  userDetail: authReducer.userDetail,
  isFetching: authReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: (params) => dispatch(orderActions.getOrders(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAccountPage);
