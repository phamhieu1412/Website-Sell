import produce from "immer";

import { API_URLS } from "../configs/api";
import { apiCall } from "../utils/api";
import {
  isCallingApi,
  isSuccessfulApiCall,
  isFailedApiCall,
} from "./actionDedicate";
import { PREFIX, typesWithPrefix } from "./config";

const { API_CALLING, API_CALLED_SUCCESS, API_CALLED_FAILURE, APP } = PREFIX;

const _types = typesWithPrefix(APP);
const TYPE = {
  GET_MENU: _types("GET_MENU"),
  GET_BANNERS: _types("GET_BANNERS"),
};

export const actions = {
  // get menu
  gettingMenu: () => ({
    type: TYPE.GET_MENU,
    meta: { prefix: [APP, API_CALLING] },
  }),
  getMenuSuccess: (payload) => ({
    type: TYPE.GET_MENU,
    meta: { prefix: [APP, API_CALLED_SUCCESS] },
    payload,
  }),
  getMenuFailure: () => ({
    type: TYPE.GET_MENU,
    meta: { prefix: [APP, API_CALLED_FAILURE] },
  }),
  getMenu: () => async (dispatch) => {
    dispatch(actions.gettingMenu());
    const api = API_URLS.MENU.getMenu();
    const { response } = await apiCall(api);

    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        const data = response.data.data;
        dispatch(actions.getMenuSuccess(data));
      } else {
        dispatch(actions.getMenuFailure());
      }
    } else {
      dispatch(actions.getMenuFailure());
    }
  },

  // get banners
  gettingBanners: () => ({
    type: TYPE.GET_BANNERS,
    meta: { prefix: [APP, API_CALLING] },
  }),
  getBannersSuccess: (payload) => ({
    type: TYPE.GET_BANNERS,
    meta: { prefix: [APP, API_CALLED_SUCCESS] },
    payload,
  }),
  getBannersFailure: () => ({
    type: TYPE.GET_BANNERS,
    meta: { prefix: [APP, API_CALLED_FAILURE] },
  }),
  getBanners: () => async (dispatch) => {
    dispatch(actions.gettingBanners());
    const api = API_URLS.MENU.getBanners();
    const { response } = await apiCall(api);

    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        const data = response.data.data;
        dispatch(actions.getBannersSuccess(data));
      } else {
        dispatch(actions.getBannersFailure());
      }
    } else {
      dispatch(actions.getBannersFailure());
    }
  },
};

const initialState = {
  isFetching: false,
  menu: [],
  banners: [],
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPE.GET_MENU:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.menu = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.menu = [];
      }
      break;

    case TYPE.GET_BANNERS:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.banners = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.banners = [];
      }
      break;

    default:
  }
}, initialState);
