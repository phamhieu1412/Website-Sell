import produce from "immer";

import { API_URLS } from "../configs/api";
import { apiCall } from "../utils/api";
import {
  isCallingApi,
  isSuccessfulApiCall,
  isFailedApiCall,
} from "./actionDedicate";
import { PREFIX, typesWithPrefix } from "./config";
import { actions as appActions } from "./appRedux";
const _types = typesWithPrefix(PREFIX.PRODUCTS);
const { API_CALLING, API_CALLED_SUCCESS, API_CALLED_FAILURE, PRODUCTS } =
  PREFIX;

const TYPE = {
  GET_PRODUCTS_BEST_SELLER: _types("GET_PRODUCTS_BEST_SELLER"),
  GET_PRODUCTS_BY_FILTERS: _types("GET_PRODUCTS_BY_FILTERS"),
  GET_ALL_BOOKS: _types("GET_ALL_BOOKS"),
  GET_FILTER_PRODUCT: _types("GET_FILTER_PRODUCT"),
  GET_PRODUCT_DETAIL: _types("GET_PRODUCT_DETAIL"),
  GET_PRODUCT_RELATED: _types("GET_PRODUCT_RELATED"),
  SEARCH_PRODUCT: _types("SEARCH_PRODUCT"),
};

export const actions = {
  // get products detail
  gettingProductDetail: () => ({
    type: TYPE.GET_PRODUCT_DETAIL,
    meta: { prefix: [PRODUCTS, API_CALLING] },
  }),
  getProductDetailSuccess: (payload) => ({
    type: TYPE.GET_PRODUCT_DETAIL,
    meta: { prefix: [PRODUCTS, API_CALLED_SUCCESS] },
    payload,
  }),
  getProductDetailFailure: () => ({
    type: TYPE.GET_PRODUCT_DETAIL,
    meta: { prefix: [PRODUCTS, API_CALLED_FAILURE] },
  }),
  getDetailProduct: (id) => async (dispatch) => {
    dispatch(actions.gettingProductDetail());
    const api = API_URLS.PRODUCTS.getDetailProduct(id);
    const { response } = await apiCall(api);

    if (
      response &&
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      const data = response.data.data;
      dispatch(actions.getProductDetailSuccess(data));
      dispatch(
        actions.getProductsRelated({
          page: 1,
          page_size: 4,
          manufacturer_ids: [data.manufacturer.id],
        })
      );
    } else {
      dispatch(actions.getProductDetailFailure());
    }
  },

  // get product related
  getProductsRelated: (params) => async (dispatch) => {
    dispatch(actions.gettingProductsRelated());
    const api = API_URLS.PRODUCTS.getProductsByFilters(params);
    const { response } = await apiCall(api);

    if (
      response &&
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      const data = response.data.data;
      dispatch(actions.getProductsRelatedSuccess(data.items));
    } else {
      dispatch(actions.getProductsRelatedFailure());
    }
  },
  gettingProductsRelated: () => ({
    type: TYPE.GET_PRODUCT_RELATED,
    meta: { prefix: [PRODUCTS, API_CALLING] },
  }),
  getProductsRelatedSuccess: (payload) => ({
    type: TYPE.GET_PRODUCT_RELATED,
    meta: { prefix: [PRODUCTS, API_CALLED_SUCCESS] },
    payload,
  }),
  getProductsRelatedFailure: () => ({
    type: TYPE.GET_PRODUCT_RELATED,
    meta: { prefix: [PRODUCTS, API_CALLED_FAILURE] },
  }),

  // search product
  getSearchProducts: (payload) => async (dispatch) => {
    dispatch(actions.searchingProduct());
    const api = API_URLS.PRODUCTS.getSearchProducts(payload);
    const { response } = await apiCall(api);

    console.log("xxx 1", response);
    if (
      response &&
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      const data = response.data.data;
      dispatch(
        actions.searchProductSuccess({
          ...data,
          page: payload.page,
          pageSize: payload.page_size,
          sort_by: payload.sort_by ? payload.sort_by : payload.sort_by,
          order: payload.order ? payload.order : payload.order,
          category_ids: payload.category_ids ? payload.category_ids : [],
          manufacturer_ids: payload.manufacturer_ids
            ? payload.manufacturer_ids
            : [],
        })
      );
    } else {
      dispatch(actions.searchProductFailure());
    }
  },
  searchingProduct: () => ({
    type: TYPE.SEARCH_PRODUCT,
    meta: { prefix: [PRODUCTS, API_CALLING] },
  }),
  searchProductSuccess: (payload) => ({
    type: TYPE.SEARCH_PRODUCT,
    meta: { prefix: [PRODUCTS, API_CALLED_SUCCESS] },
    payload,
  }),
  searchProductFailure: () => ({
    type: TYPE.SEARCH_PRODUCT,
    meta: { prefix: [PRODUCTS, API_CALLED_FAILURE] },
  }),

  // get products best seller
  gettingProductsBestSeller: () => ({
    type: TYPE.GET_PRODUCTS_BEST_SELLER,
    meta: { prefix: [PRODUCTS, API_CALLING] },
  }),
  getProductsBestSellerSuccess: (payload) => ({
    type: TYPE.GET_PRODUCTS_BEST_SELLER,
    meta: { prefix: [PRODUCTS, API_CALLED_SUCCESS] },
    payload,
  }),
  getProductsBestSellerFailure: () => ({
    type: TYPE.GET_PRODUCTS_BEST_SELLER,
    meta: { prefix: [PRODUCTS, API_CALLED_FAILURE] },
  }),
  getProductsBestSeller: (params) => async (dispatch) => {
    dispatch(actions.gettingProductsBestSeller());
    const api = API_URLS.PRODUCTS.getProductsBestSeller(params);
    const { response } = await apiCall(api);

    if (
      response &&
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      const data = response.data.data;
      dispatch(actions.getProductsBestSellerSuccess(data.items));
    } else {
      dispatch(actions.getProductsBestSellerFailure());
    }
  },

  // get filter product
  gettingFilterProduct: () => ({
    type: TYPE.GET_FILTER_PRODUCT,
    meta: { prefix: [PRODUCTS, API_CALLING] },
  }),
  getFilterProductSuccess: (payload) => ({
    type: TYPE.GET_FILTER_PRODUCT,
    meta: { prefix: [PRODUCTS, API_CALLED_SUCCESS] },
    payload,
  }),
  getFilterProductFailure: () => ({
    type: TYPE.GET_FILTER_PRODUCT,
    meta: { prefix: [PRODUCTS, API_CALLED_FAILURE] },
  }),
  getFilterProduct: (id) => async (dispatch) => {
    dispatch(actions.gettingFilterProduct());
    const api = API_URLS.PRODUCTS.getFilterProduct(id);
    const { response } = await apiCall(api);

    if (
      response &&
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      const data = response.data.data;
      dispatch(actions.getFilterProductSuccess(data));
    } else {
      dispatch(actions.getFilterProductFailure());
    }
  },

  gettingProductsByFilters: () => ({
    type: TYPE.GET_PRODUCTS_BY_FILTERS,
    meta: { prefix: [PRODUCTS, API_CALLING] },
  }),
  getProductsByFiltersSuccess: (payload) => ({
    type: TYPE.GET_PRODUCTS_BY_FILTERS,
    meta: { prefix: [PRODUCTS, API_CALLED_SUCCESS] },
    payload,
  }),
  getProductsByFiltersFailure: () => ({
    type: TYPE.GET_PRODUCTS_BY_FILTERS,
    meta: { prefix: [PRODUCTS, API_CALLED_FAILURE] },
  }),
  getProductsByFilters: (payload) => async (dispatch) => {
    dispatch(actions.gettingProductsByFilters());
    const api = API_URLS.PRODUCTS.getProductsByFilters(payload);
    const { response } = await apiCall(api);

    if (
      response &&
      response.status === 200 &&
      response?.data?.message?.status === "success"
    ) {
      const data = response.data.data;
      dispatch(
        actions.getProductsByFiltersSuccess({
          ...data,
          page: payload.page,
          pageSize: payload.page_size,
          sort_by: payload.sort_by ? payload.sort_by : payload.sort_by,
          order: payload.order ? payload.order : payload.order,
          category_ids: payload.category_ids ? payload.category_ids : [],
          manufacturer_ids: payload.manufacturer_ids
            ? payload.manufacturer_ids
            : [],
        })
      );
    } else {
      dispatch(actions.getProductsByFiltersFailure());
    }
  },
};

const initialState = {
  listProducts: [],
  isFetching: false,
  meta: {
    page: 1,
    pageSize: 10,
    pages: 0,
    totalItem: 0,
    sort_by: "",
    order: "",
    category_ids: [],
    manufacturer_ids: [],
    keyword: "",
  },
  listFilter: {},
  detailProduct: {},
  listProductsRelated: [],
  listReviewsBook: [],
  listBooksBestSeller: [],
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case TYPE.GET_PRODUCT_DETAIL:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.detailProduct = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.detailProduct = [];
      }
      break;

    case TYPE.GET_ALL_BOOKS:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.listProducts = action.payload.items;
        draft.meta.page = action.payload.page;
        draft.meta.pages = action.payload.total;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listProducts = [];
      }
      break;

    case TYPE.GET_PRODUCT_RELATED:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.listProductsRelated = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listProductsRelated = [];
      }
      break;

    case TYPE.GET_FILTER_PRODUCT:
      if (isCallingApi(action)) {
      }
      if (isSuccessfulApiCall(action)) {
        draft.listFilter = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.listFilter = {};
      }
      break;

    case TYPE.GET_PRODUCTS_BY_FILTERS:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.listProducts = action.payload.items;
        draft.meta.page = action.payload.page;
        draft.meta.pageSize = action.payload.pageSize;
        draft.meta.totalItem = action.payload.total;
        draft.meta.category_ids = action.payload.category_ids;
        draft.meta.manufacturer_ids = action.payload.manufacturer_ids;
        draft.meta.sort_by = action.payload.sort_by;
        draft.meta.order = action.payload.order;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listProducts = [];
      }
      break;

    case TYPE.SEARCH_PRODUCT:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.listProducts = action.payload.items;
        draft.meta.page = action.payload.page;
        draft.meta.pageSize = action.payload.pageSize;
        draft.meta.totalItem = action.payload.total;
        draft.meta.category_ids = action.payload.category_ids;
        draft.meta.manufacturer_ids = action.payload.manufacturer_ids;
        draft.meta.sort_by = action.payload.sort_by;
        draft.meta.order = action.payload.order;
        draft.meta.keyword = action.payload.keyword;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listProducts = [];
      }
      break;

    case TYPE.GET_PRODUCTS_BEST_SELLER:
      if (isCallingApi(action)) {
        draft.isFetching = true;
      }
      if (isSuccessfulApiCall(action)) {
        draft.isFetching = false;
        draft.listBooksBestSeller = action.payload;
      }
      if (isFailedApiCall(action)) {
        draft.isFetching = false;
        draft.listBooksBestSeller = [];
      }
      break;

    default:
  }
}, initialState);
