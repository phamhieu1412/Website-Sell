import produce from "immer";

import { API_URLS } from "../configs/api";
import { apiCall, apiCallPromise } from "../utils/api";
import {
  isCallingApi,
  isSuccessfulApiCall,
  isFailedApiCall,
} from "./actionDedicate";
import { PREFIX, typesWithPrefix } from "./config";
import { url } from "../configs/api";

const { API_CALLING, API_CALLED_SUCCESS, API_CALLED_FAILURE, AUTH } = PREFIX;

const _types = typesWithPrefix(AUTH);
const TYPE = {
  SENT_OTP: _types("SENT_OTP"),
  SIGNUP: _types("SIGNUP"),
  LOGIN: _types("LOGIN"),
  LOGOUT: _types("LOGOUT"),
  UPDATE_INFO_USER: _types("UPDATE_INFO_USER"),
  GET_INFO_USER: _types("GET_INFO_USER"),
  GET_ADDRESS: _types("GET_ADDRESS"),
};

export const actions = {
  // login
  logging: () => ({
    type: TYPE.LOGIN,
    meta: { prefix: [AUTH, API_CALLING] },
  }),
  loginSuccess: (payload) => ({
    type: TYPE.LOGIN,
    meta: { prefix: [AUTH, API_CALLED_SUCCESS] },
    payload,
  }),
  loginFailure: () => ({
    type: TYPE.LOGIN,
    meta: { prefix: [AUTH, API_CALLED_FAILURE] },
  }),
  login: (payload, meta) => async (dispatch) => {
    dispatch(actions.logging());
    const api = API_URLS.USER.login(payload);
    const { response } = await apiCall(api);

    if (response.status === 200 && response.data && response.data.data) {
      const data = response.data.data;
      dispatch(actions.loginSuccess(data));
      meta.onSuccess();
    } else {
      dispatch(actions.loginFailure());
      meta.onFailure();
    }
  },

  // sent otp to user
  sendingOtp: () => ({
    type: TYPE.SENT_OTP,
    meta: { prefix: [AUTH, API_CALLING] },
  }),
  sendOtpSuccess: (payload) => ({
    type: TYPE.SENT_OTP,
    meta: { prefix: [AUTH, API_CALLED_SUCCESS] },
    payload,
  }),
  sendOtpFailure: () => ({
    type: TYPE.SENT_OTP,
    meta: { prefix: [AUTH, API_CALLED_FAILURE] },
  }),
  sendOtp: (payload, meta) => async (dispatch) => {
    dispatch(actions.sendingOtp());
    const api = API_URLS.USER.sendOtp(payload);
    const { response } = await apiCall(api);

    if (
      response.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      const textError = response.data.message.text;
      if (status === "success") {
        const data = response.data.data;
        dispatch(actions.sendOtpSuccess(data));
        meta.onSuccess();
      } else {
        dispatch(actions.sendOtpFailure());
        meta.onFailure(textError);
      }
    } else {
      dispatch(actions.sendOtpFailure());
      meta.onFailure("Quá trình xác thực có vấn đề");
    }
  },

  // sent otp to user
  signingUp: () => ({
    type: TYPE.SIGNUP,
    meta: { prefix: [AUTH, API_CALLING] },
  }),
  signUpSuccess: (payload) => ({
    type: TYPE.SIGNUP,
    meta: { prefix: [AUTH, API_CALLED_SUCCESS] },
    payload,
  }),
  signUpFailure: () => ({
    type: TYPE.SIGNUP,
    meta: { prefix: [AUTH, API_CALLED_FAILURE] },
  }),
  signUp: (payload, meta) => async (dispatch) => {
    dispatch(actions.signingUp());
    const api = API_URLS.USER.signUp(payload);
    const { response } = await apiCall(api);

    if (
      response.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      const textError = response.data.message.text;
      if (status === "success") {
        const data = response.data.data;
        dispatch(actions.signUpSuccess(data));
        meta.onSuccess();
      } else {
        dispatch(actions.signUpFailure());
        meta.onFailure(textError);
      }
    } else {
      dispatch(actions.signUpFailure());
      meta.onFailure("Quá trình đặng ký có vấn đề");
    }
  },

  // dang xuat
  logOut: () => (dispatch) => {
    dispatch({ type: TYPE.LOGOUT });
  },

  // get info user
  gettingInfoUser: () => ({
    type: TYPE.GET_INFO_USER,
    meta: { prefix: [AUTH, API_CALLING] },
  }),
  getInfoUserSuccess: (payload) => ({
    type: TYPE.GET_INFO_USER,
    meta: { prefix: [AUTH, API_CALLED_SUCCESS] },
    payload,
  }),
  getInfoUserFailure: () => ({
    type: TYPE.GET_INFO_USER,
    meta: { prefix: [AUTH, API_CALLED_FAILURE] },
  }),
  getUserInfo: () => async (dispatch) => {
    dispatch(actions.gettingInfoUser());
    const api = API_URLS.USER.getUserInfo();
    const { response, status } = await apiCall(api);

    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        const data = response.data.data;
        dispatch(actions.getInfoUserSuccess(data));
      } else {
        dispatch(actions.getInfoUserFailure());
      }
    } else if (status && status === 401) {
      dispatch(actions.logOut());
    } else {
      dispatch(actions.getInfoUserFailure());
    }
  },

  uploadImage: (payload) => async (dispatch) => {
    const formData = new FormData();
    formData.append("file", payload);
    const api = API_URLS.USER.uploadImage(formData);
    const { response } = await apiCall(api);

    if (
      response?.status === 200 &&
      response.data &&
      response.data.code === 200
    ) {
      const status = response.data.message.status;
      if (status === "success") {
        const data = response.data.data;
        return { data };
      } else {
        return { data: null };
      }
    } else {
      return { data: null };
    }
  },

  editingInfo: () => ({
    type: TYPE.UPDATE_INFO_USER,
    meta: { prefix: [AUTH, API_CALLING] },
  }),
  editInfoSuccess: (payload) => ({
    type: TYPE.UPDATE_INFO_USER,
    meta: { prefix: [AUTH, API_CALLED_SUCCESS] },
    payload,
  }),
  editInfoFailure: () => ({
    type: TYPE.UPDATE_INFO_USER,
    meta: { prefix: [AUTH, API_CALLED_FAILURE] },
  }),
  editInfo: (payload, urlImage, meta) => async (dispatch) => {
    dispatch(actions.editingInfo());

    let hasImg = false;
    if (urlImage) {
      hasImg = true;
    } else {
      hasImg = false;
    }

    if (hasImg) {
      const res = await dispatch(actions.uploadImage(urlImage));

      if (res && res.data && res.data.resource_id) {
        const tempData = {
          ...payload,
          avatar_url: `${url}/file/${res.data.resource_id}`,
        };
        const api = API_URLS.USER.editInfo(tempData);
        const { response } = await apiCall(api);

        if (response?.data?.message?.status === "success") {
          dispatch(actions.editInfoSuccess());
          meta.onSuccess("Cập nhập thành công");
          dispatch(actions.getUserInfo());
        } else {
          dispatch(actions.editInfoFailure());
          meta.onFailure("Cập nhập không thành công! Vui lòng thử lại.");
        }
      } else {
        dispatch(actions.editInfoFailure());
        meta.onFailure("Upload ảnh không thành công! Vui lòng thử lại.");
      }
    } else {
      const api = API_URLS.USER.editInfo(payload);
      const { response } = await apiCall(api);

      if (response?.data?.message?.status === "success") {
        dispatch(actions.editInfoSuccess());
        meta.onSuccess("Cập nhập thành công");
        dispatch(actions.getUserInfo());
      } else {
        dispatch(actions.editInfoFailure());
        meta.onFailure("Cập nhập không thành công! Vui lòng thử lại.");
      }
    }
  },
};

const initialState = {
  isFetching: false,
  userDetail: {},
  listAddressUser: [],
  defaultAddress: {},
  userId: null,
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPE.SENT_OTP:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.userId = action.payload.user_id;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.userId = null;
      }
      break;

    case TYPE.SIGNUP:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.userId = action.payload.user_id;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.userId = null;
      }
      break;

    case TYPE.LOGIN:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.userDetail = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        localStorage.setItem("token", `Bearer ${action.payload.access_token}`);
        localStorage.setItem(
          "refresh_token",
          `Bearer ${action.payload.refresh_token}`
        );
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.userDetail = {};
        draft.userId = null;
      }
      break;

    case TYPE.GET_INFO_USER:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.userDetail = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.userDetail = {};
      }
      break;

    case TYPE.GET_ADDRESS:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        const arrayAddress = action.payload;
        draft.isFetching = false;
        draft.listAddressUser = action.payload;
        if (arrayAddress.length > 0) {
          for (let i = 0; i < arrayAddress.length; i++) {
            if (arrayAddress[i].default === true) {
              draft.defaultAddress = arrayAddress[i];
            }
          }
        }
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listAddressUser = [];
        draft.defaultAddress = {};
      }
      break;

    case TYPE.LOGOUT:
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      draft.userDetail = {};
      draft.userId = null;
      break;

    case TYPE.UPDATE_INFO_USER:
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

    default:
  }
}, initialState);
