import React, { Component } from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { actions as authActions } from "../redux/authRedux";
import { isVietnamesePhoneNumber } from "../utils/numberFormatter";
import Loading from "../components/Loading";
import "../css/loginAndSignup.css";
import "react-toastify/dist/ReactToastify.css";

const notificationToast = (text) =>
  toast.error(text, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      idContainer: "container-login-signup",
      phone: "",
      fullName: "",
      otp: "",
      showOtpUI: false,
      showInputPhoneUI: true,
      stepRegister: 1,
      stepLogin: 1,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem("token");

    if (token && token.length > 0) {
      history.push("/home");
    }
  }

  changeId = (id) => {
    if (id === 1) {
      this.setState({
        idContainer: "container-login-signup sign-up-mode",
        phone: "",
        fullName: "",
        otp: "",
        showOtpUI: false,
        showInputPhoneUI: true,
        id,
        stepRegister: 1,
        stepLogin: 1,
      });
    } else {
      this.setState({
        idContainer: "container-login-signup sign-in-mode",
        phone: "",
        fullName: "",
        otp: "",
        showOtpUI: false,
        showInputPhoneUI: true,
        id,
        stepRegister: 1,
        stepLogin: 1,
      });
    }
  };

  handleChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };
  handleChangeName = (e) => {
    this.setState({ fullName: e.target.value });
  };
  handleChangeOtp = (code) => {
    this.setState({ otp: code });
  };

  onSendOtp = () => {
    const { phone, id } = this.state;
    const statusPhone = isVietnamesePhoneNumber(phone);

    if (!statusPhone) {
      notificationToast("Số điện thoại không hợp lệ!");
      return;
    }

    this.props.sendOtp(
      { phone: phone },
      {
        onSuccess: () => {
          if (id === 2) {
            this.setState({
              showInputPhoneUI: false,
              showOtpUI: true,
              stepLogin: 2,
            });
          } else {
            this.changeId(2);
          }
        },
        onFailure: (textError) => {
          notificationToast(textError);
        },
      }
    );
  };

  onLogin = () => {
    const { phone, otp } = this.state;
    const { history } = this.props;

    this.props.login(
      { phone, otp },
      {
        onSuccess: () => {
          history.push("/home");
        },
        onFailure: (textError) => {
          notificationToast(textError);
        },
      }
    );
  };

  onRegister = () => {
    const { phone, fullName } = this.state;
    const statusPhone = isVietnamesePhoneNumber(phone);

    if (!statusPhone) {
      notificationToast("Số điện thoại không hợp lệ!");
      return;
    }

    this.props.signUp(
      {
        phone: phone,
        full_name: fullName,
      },
      {
        onSuccess: () => {
          this.setState({
            showInputPhoneUI: false,
            showOtpUI: true,
            stepRegister: 2,
          });
        },
        onFailure: (textError) => {
          toast.error(textError, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
      }
    );
  };

  render() {
    const {
      idContainer,
      otp,
      showOtpUI,
      showInputPhoneUI,
      stepRegister,
      stepLogin,
    } = this.state;
    const { isFetchingAuth, userId } = this.props;
    return (
      <div className={idContainer}>
        <ToastContainer />
        <div className="forms-container">
          <div className="signin-signup">
            {/* content login */}
            <div className="div-change-content sign-in-form">
              <h2 className="title">Đăng nhập</h2>
              {showInputPhoneUI && (
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    maxlength="10"
                    onChange={this.handleChangePhone}
                  />
                </div>
              )}
              {showOtpUI && (
                <OtpInput
                  value={otp}
                  onChange={this.handleChangeOtp}
                  numInputs={6}
                  separator={<span style={{ width: "8px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "54px",
                    height: "54px",
                    fontSize: "18px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                    backgroundColor: "#f0f0f0",
                    marginBottom: "10px",
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none",
                  }}
                />
              )}
              {stepLogin === 1 ? (
                <button className="btn solid" onClick={this.onSendOtp}>
                  Tiếp tục
                </button>
              ) : (
                <button className="btn solid" onClick={this.onLogin}>
                  Đăng nhập
                </button>
              )}

              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* content signup */}
            <div className="div-change-content sign-up-form">
              <h2 className="title">Sign up</h2>
              {showInputPhoneUI && (
                <>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      maxlength="10"
                      onChange={this.handleChangePhone}
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      onChange={this.handleChangeName}
                    />
                  </div>
                </>
              )}
              {showOtpUI && (
                <OtpInput
                  value={otp}
                  onChange={this.handleChangeOtp}
                  numInputs={6}
                  separator={<span style={{ width: "8px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "54px",
                    height: "54px",
                    fontSize: "18px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                    backgroundColor: "#f0f0f0",
                    marginBottom: "10px",
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none",
                  }}
                />
              )}
              {stepRegister === 1 ? (
                <button className="btn" onClick={this.onRegister}>
                  Tiếp tục
                </button>
              ) : (
                <button className="btn solid" onClick={this.onSendOtp}>
                  Đăng ký
                </button>
              )}
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => this.changeId(1)}
              >
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => this.changeId(2)}
              >
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>

        {isFetchingAuth && (
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
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  userId: authReducer.userId,
  isFetchingAuth: authReducer.isFetching,
  // listBooksBestSeller: bookReducer.listBooksBestSeller,
  // meta: bookReducer.meta,
  // bookReducer,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload, meta) => dispatch(authActions.login(payload, meta)),
  sendOtp: (payload, meta) => dispatch(authActions.sendOtp(payload, meta)),
  signUp: (payload, meta) => dispatch(authActions.signUp(payload, meta)),
  // getBooksBestSeller: () => dispatch(motelActions.getBooksBestSeller()),
  // getBookDetail: (product_id) => dispatch(motelActions.getBookDetail(product_id)),
  // getAllCategories: (params) => dispatch(categoryActions.getAllCategories(params)),
  // getCart: (meta) => dispatch(cartActions.getCart(meta)),
  // getAllAuthors: (params) => dispatch(authorActions.getAllAuthors(params)),
  // getAllPublishers: (params) => dispatch(publisherActions.getAllPublishers(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
