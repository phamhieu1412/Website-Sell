import { combineReducers } from "redux";

import { reducer as authReducer } from "./authRedux";
import { reducer as appReducer } from "./appRedux";
import { reducer as productsReducer } from "./productsRedux";
import { reducer as cartReducer } from "./cartRedux";
import { reducer as orderReducer } from './orderRedux';

export default combineReducers({
  authReducer,
  appReducer,
  productsReducer,
  cartReducer,
  orderReducer,
});
