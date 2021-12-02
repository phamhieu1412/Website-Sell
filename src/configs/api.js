export const url = "http://3197-210-245-54-40.ngrok.io";

export const HEADERS = {
  default_header: () => ({
    "Content-Type": "application/json",
  }),
  DEFAULT_HEADER: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  }),
  header: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: localStorage.getItem("token"),
  }),
  json_header: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: localStorage.getItem("token"),
  }),
  auth_header: () => ({
    Authorization: localStorage.getItem("token"),
  }),
  file_header: () => ({
    "Content-Type": "multipart/form-data",
  }),
};

export const API_URLS = {
  USER: {
    sendOtp: (payload) => ({
      endPoint: `${url}/api/v1/auth/send_otp`,
      method: "POST",
      headers: HEADERS.default_header(),
      payload,
    }),
    login: (payload) => ({
      endPoint: `${url}/api/v1/auth/login`,
      method: "POST",
      headers: HEADERS.default_header(),
      payload,
    }),
    signUp: (payload) => ({
      endPoint: `${url}/api/v1/auth/signup`,
      method: "POST",
      headers: HEADERS.default_header(),
      payload,
    }),
    getUserInfo: () => ({
      endPoint: `${url}/api/v1/users/profile`,
      method: "GET",
      headers: HEADERS.auth_header(),
    }),
    uploadImage: (payload) => ({
      endPoint: `${url}/api/v1/upload`,
      method: "POST",
      headers: HEADERS.json_header(),
      payload,
    }),
    editInfo: (payload) => ({
      endPoint: `${url}/api/v1/users/profile`,
      method: "PUT",
      headers: HEADERS.json_header(),
      payload,
    }),
  },
  MENU: {
    getMenu: () => ({
      endPoint: `${url}/api/v1/menu`,
      method: "GET",
      headers: HEADERS.default_header(),
    }),
    getBanners: () => ({
      endPoint: `${url}/api/v1/banners`,
      method: "GET",
      headers: HEADERS.default_header(),
    }),
    getProvinces: () => ({
      endPoint: "https://thongtindoanhnghiep.co/api/city",
      method: "GET",
      headers: HEADERS.default_header(),
    }),
    getDistricts: (idProvinces) => ({
      endPoint: `https://thongtindoanhnghiep.co/api/city/${idProvinces}/district`,
      method: "GET",
      headers: HEADERS.default_header(),
    }),
    getWards: (idDistrict) => ({
      endPoint: `https://thongtindoanhnghiep.co/api/district/${idDistrict}/ward`,
      method: "GET",
      headers: HEADERS.default_header(),
    }),
  },
  PRODUCTS: {
    getProductsBestSeller: (params) => ({
      endPoint: `${url}/api/v1/products/best_selling`,
      method: "GET",
      headers: HEADERS.default_header(),
      params,
    }),
    getProductsByFilters: (payload) => ({
      endPoint: `${url}/api/v1/products/filter`,
      method: "POST",
      headers: HEADERS.default_header(),
      payload,
    }),
    getSearchProducts: (payload) => ({
      endPoint: `${url}/api/v1/products/search`,
      method: "POST",
      headers: HEADERS.default_header(),
      payload,
    }),
    getFilterProduct: (id) => ({
      endPoint: `${url}/api/v1/products/parameters?category_id=${id}`,
      method: "GET",
      headers: HEADERS.default_header(),
    }),
    getDetailProduct: (id) => ({
      endPoint: `${url}/api/v1/products/${id}`,
      method: "GET",
      headers: HEADERS.default_header(),
    }),
  },
  CATEGORY: {
    getAllCategories: (params) => ({
      endPoint: "/api/v1/category",
      method: "GET",
      headers: HEADERS.DEFAULT_HEADER(),
      params,
    }),
  },
  CART: {
    getCart: () => ({
      endPoint: `${url}/api/v1/carts`,
      method: "GET",
      headers: HEADERS.auth_header(),
    }),
    addToCart: (payload) => ({
      endPoint: `${url}/api/v1/carts`,
      method: "POST",
      headers: HEADERS.auth_header(),
      payload,
    }),
    updateQuantity: (payload, cart_item_id) => ({
      endPoint: `${url}/api/v1/carts/${cart_item_id}`,
      method: "PUT",
      headers: HEADERS.auth_header(),
      payload,
    }),
    deleteItemInCart: (cart_item_id) => ({
      endPoint: `${url}/api/v1/carts/${cart_item_id}`,
      method: "DELETE",
      headers: HEADERS.auth_header(),
    }),
    checkout: (payload) => ({
      endPoint: `${url}/api/v1/orders`,
      method: "POST",
      headers: HEADERS.auth_header(),
      payload,
    }),
  },
  ORDER: {
    getOrders: (params) => ({
      endPoint: `${url}/api/v1/orders`,
      method: "GET",
      headers: HEADERS.auth_header(),
      params,
    }),
    getOrderDetail: (id) => ({
      endPoint: `${url}/api/v1/orders/${id}`,
      method: "GET",
      headers: HEADERS.auth_header(),
    }),
    deleteOrderDetail: (id, payload) => ({
      endPoint: `${url}/api/v1/orders/${id}`,
      method: "DELETE",
      headers: HEADERS.auth_header(),
      payload,
    }),
  },
};
