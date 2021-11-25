import produce from "immer";

import { API_URLS } from "../configs/api";
import { apiCall } from "../utils/api";
import {
  isCallingApi,
  isSuccessfulApiCall,
  isFailedApiCall,
} from "./actionDedicate";
import { PREFIX, typesWithPrefix } from "./config";

const { API_CALLING, API_CALLED_SUCCESS, API_CALLED_FAILURE, ORDER } = PREFIX;

const _types = typesWithPrefix(ORDER);
const TYPE = {
  GET_ORDERS: _types("GET_ORDERS"),
  GET_ORDER_DETAIL: _types("GET_ORDER_DETAIL"),
  CANCEL_ORDER: _types("CANCEL_ORDER"),
};

export const actions = {
  // get menu
  gettingOrders: () => ({
    type: TYPE.GET_ORDERS,
    meta: { prefix: [ORDER, API_CALLING] },
  }),
  getOrdersSuccess: (payload) => ({
    type: TYPE.GET_ORDERS,
    meta: { prefix: [ORDER, API_CALLED_SUCCESS] },
    payload,
  }),
  getOrdersFailure: () => ({
    type: TYPE.GET_ORDERS,
    meta: { prefix: [ORDER, API_CALLED_FAILURE] },
  }),
  getOrders: (params) => async (dispatch) => {
    dispatch(actions.gettingOrders());
    const api = API_URLS.ORDER.getOrders(params);
    const { response } = await apiCall(api);

    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        const data = response.data.data;
        dispatch(
          actions.getOrdersSuccess({
            data,
            page: params.page,
            page_size: params.page_size,
          })
        );
      } else {
        dispatch(actions.getOrdersFailure());
      }
    } else {
      dispatch(actions.getOrdersFailure());
    }
  },

  gettingDetail: () => ({
    type: TYPE.GET_ORDER_DETAIL,
    meta: { prefix: [ORDER, API_CALLING] },
  }),
  getDetailSuccess: (payload) => ({
    type: TYPE.GET_ORDER_DETAIL,
    meta: { prefix: [ORDER, API_CALLED_SUCCESS] },
    payload,
  }),
  getDetailFailure: () => ({
    type: TYPE.GET_ORDER_DETAIL,
    meta: { prefix: [ORDER, API_CALLED_FAILURE] },
  }),
  getOrderDetail: (id) => async (dispatch) => {
    dispatch(actions.gettingDetail());
    const api = API_URLS.ORDER.getOrderDetail(id);
    const { response } = await apiCall(api);

    console.log("xxx response", response);
    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        const data = response.data.data;
        dispatch(actions.getDetailSuccess(data));
      } else {
        dispatch(actions.getDetailFailure());
      }
    } else {
      dispatch(actions.getDetailFailure());
    }
  },

  deleteOrderDetail: (id, payload, meta) => async (dispatch) => {
    const api = API_URLS.ORDER.deleteOrderDetail(id, payload);
    const { response } = await apiCall(api);

    console.log("xxx response", response);
    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        meta.onSuccess("Huỷ đơn hàng thành công ");
        dispatch(
          actions.getOrders({
            page: 1,
            page_size: 10,
          })
        );
      } else {
        meta.onSuccess("Huỷ đơn hàng thất bại");
      }
    } else {
      meta.onSuccess("Huỷ đơn hàng thất bại");
    }
  },
};

const initialState = {
  isFetching: false,
  listOrders: [],
  orderDetail: {},
  meta: {
    totalOrders: 0,
    page: 1,
    pageSize: 10,
  },
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPE.GET_ORDERS:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.listOrders = action.payload.data.items;
        draft.meta.totalOrders = action.payload.data.total;
        draft.meta.page = action.payload.page;
        draft.meta.pageSize = action.payload.page_size;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listOrders = [];
      }
      break;

    case TYPE.GET_ORDER_DETAIL:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.orderDetail = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.orderDetail = {};
      }
      break;

    default:
  }
}, initialState);
