// import { UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { Component } from 'react';
import { useSelector, connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Route, Switch, Link } from 'react-router-dom';

// import { actions as cartActions } from '../redux/cartRedux';
import logo from '../assets/images/logo.png';
// import Motel from '../pages/motel/Motel';
// import MotelFavorite from '../pages/motel/components/MotelFavorite';
// import MotelInfor from '../pages/motel/components/MotelInfor';
// import Login from '../pages/login/Login';
// import MenuMotel from '../pages/motel/components/menuMotel';
import '../css/layout.scss';
import AppFooter from './Footer';
import AppHeader from './Header';
import SlideProduct from '../components/SlideProduct';
import PromotionProduct from '../components/PromotionProduct';
import ListProduct from '../components/ListProduct';
import ListSpecialProduct from '../components/ListSpecialProduct';
import ListBestSellingProduct from '../components/ListBestSellingProduct';
import Blogs from '../components/Blogs';

const { Content } = Layout;

function ContentLayout(props) {
  const history = useHistory();
  const myState = useSelector((state) => state);
  // const { listCategories } = myState.categoryReducer;
  const { isLogin, infoCart } = props;
  // const items = infoCart && infoCart.items && infoCart.items.length > 0 ? infoCart.items : [];
  
  return (
    <div style={{ padding: '10px 30px' }}>
      <div
        className="page-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}>
        <div>
          <img src={logo} style={{ width: '120px' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* {listCategories.length > 0 &&
              listCategories.map((category) => <Link to="/home/${category.name}">{category.name}</Link>)} */}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div id="wrap">
              <input id="search" name="search" type="text" placeholder="Tìm kiếm" />
              <input id="search_submit" value="Rechercher" type="submit" />
            </div>
            {/* <MenuMotel history={history} isLogin={isLogin} infoCart={infoCart} items={items} /> */}
            {/* <UserOutlined
              style={{ fontSize: '30px' }}
              onClick={() => {
                history.push('/dashboard');
              }}
            /> */}
          </div>
        </div>
      </div>

      <SlideProduct />
      <PromotionProduct />
      <ListProduct />
      <ListSpecialProduct />
      <ListBestSellingProduct />
      <Blogs />
      <div style={{ padding: '30px 60px 50px' }}>
        {/* <Switch>
          <Route path="/home" component={Motel} />
          <Route path="/home/:id" component={MotelInfor} /> */}
          {/* <Route path="/home/thongke" component={<></>} />
          <Route path="/home/bieudo" component /> */}

          {/* <Route path="/nha-tro-detail" component={MotelInfor} /> */}
          {/* <Route path="/home/nha-tro-favorite" component={MotelFavorite} /> */}
          {/* <Route extract path="/" component={Home} /> */}
        {/* </Switch> */}
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

  componentDidMount() {
    // this.props.getCart({
    //   onSuccess: () => {
    //     this.setState({ isLogin: true });
    //   },
    //   onFailure: () => {
    //     this.setState({ isLogin: false });
    //   },
    // });
  }

  render() {
    const { isLogin } = this.state;
    const { infoCart } = this.props;

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <AppHeader isLogin={isLogin} />

          <Content style={{ background: '#ffffff', padding: '10px' }}>
            <ContentLayout isLogin={isLogin} infoCart={infoCart} />
          </Content>

          <AppFooter />
        </Layout>
    );
  }
}

const mapStateToProps = ({  }) => ({
  // infoCart: cartReducer.infoCart,
});

const mapDispatchToProps = (dispatch) => ({
  // getCart: (meta) => dispatch(cartActions.getCart(meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
