import produce from "immer";

import { API_URLS } from "../configs/api";
import { apiCall } from "../utils/api";
import {
  isCallingApi,
  isSuccessfulApiCall,
  isFailedApiCall,
} from "./actionDedicate";
import { PREFIX, typesWithPrefix } from "./config";

const { API_CALLING, API_CALLED_SUCCESS, API_CALLED_FAILURE, CART } = PREFIX;

const _types = typesWithPrefix(CART);
const TYPE = {
  GET_CART: _types("GET_CART"),
  UPDATE_CART: _types("UPDATE_CART"),
  DELETE_ITEM_IN_CART: _types("DELETE_ITEM_IN_CART"),
};

export const actions = {
  // lay danh sach gio hang
  gettingCart: () => ({
    type: TYPE.GET_CART,
    meta: { prefix: [CART, API_CALLING] },
  }),
  getCartSuccess: (payload) => ({
    type: TYPE.GET_CART,
    meta: { prefix: [CART, API_CALLED_SUCCESS] },
    payload,
  }),
  getCartFailure: () => ({
    type: TYPE.GET_CART,
    meta: { prefix: [CART, API_CALLED_FAILURE] },
  }),
  getCart: (meta) => async (dispatch) => {
    dispatch(actions.gettingCart());
    const api = API_URLS.CART.getCart();
    const { response } = await apiCall(api);

    if (
      response?.status === 200 &&
      response.data.message.status === "success"
    ) {
      const data = response.data.data;
      dispatch(actions.getCartSuccess(data));
      meta.onSuccess();
    } else {
      dispatch(actions.getCartFailure());
      meta.onFailure("Lấy giỏ hàng thất bại.Vui lòng thử lại.");
    }
  },

  // cap nhap so luong
  updateQuantity: (payload, cart_item_id, meta) => async (dispatch) => {
    // dispatch(actions.updatingCart());
    const api = API_URLS.CART.updateQuantity(payload, cart_item_id);
    const { response } = await apiCall(api);

    if (
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      dispatch(
        actions.getCart({
          onSuccess: () => {},
          onFailure: () => {},
        })
      );
      // dispatch(actions.updateCartSuccess());
      meta.onSuccess();
    } else {
      // dispatch(actions.updateCartFailure());
      meta.onFailure();
    }
  },
  updatingCart: () => ({
    type: TYPE.UPDATE_CART,
    meta: { prefix: [CART, API_CALLING] },
  }),
  updateCartSuccess: () => ({
    type: TYPE.UPDATE_CART,
    meta: { prefix: [CART, API_CALLED_SUCCESS] },
  }),
  updateCartFailure: () => ({
    type: TYPE.UPDATE_CART,
    meta: { prefix: [CART, API_CALLED_FAILURE] },
  }),

  // xoa san pham trong gio hang
  deleteItemInCart: (cart_item_id, meta) => async (dispatch) => {
    const api = API_URLS.CART.deleteItemInCart(cart_item_id);
    const { response } = await apiCall(api);

    if (
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      dispatch(
        actions.getCart({
          onSuccess: () => {},
          onFailure: () => {},
        })
      );
      meta.onSuccess();
    } else {
      meta.onFailure();
    }
  },

  // them san pham trong gio hang
  addToCart: (payload, meta) => async (dispatch) => {
    const api = API_URLS.CART.addToCart(payload);
    const { response } = await apiCall(api);

    if (
      response &&
      response.data &&
      response.data &&
      response.data.message.status === "success"
    ) {
      meta.onSuccess();
    } else {
      meta.onFailure();
    }
  },

  // checkout
  checkout: (payload, meta) => async (dispatch) => {
    dispatch(actions.updatingCart());
    const api = API_URLS.CART.checkout(payload);
    const { response } = await apiCall(api);
    if (response?.data?.message.status === 'success') {
      dispatch(actions.updateCartSuccess());
      meta.onSuccess();
    } else {
      dispatch(actions.updateCartFailure());
      meta.onFailure(response?.data?.message?.text ? response.data.message.text : 'Có lỗi khi thanh toán');
    }
  },
};

const initialState = {
  infoCart: {},
  productsInCart: [],
  isFetching: false,
  totalMoney: 0,
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPE.GET_CART:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.productsInCart = action.payload;
        draft.totalMoney = getTotalMoneyCart(action.payload);
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.productsInCart = [];
      }
      break;

    case TYPE.UPDATE_CART:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
      }
      break;

    // case TYPE.LOGOUT:
    //     localStorage.removeItem("userInfo");
    //   break;

    default:
  }
}, initialState);

const getTotalMoneyCart = (carts) => {
  let total = 0;
  if (carts.length > 0) {
    for (let i = 0; i < carts.length; i++) {
      const element = carts[i];
      total += element.quantity * element.product.final_price;
    }
  }
  return total;
};
