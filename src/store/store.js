import { createStore, action } from "easy-peasy";

const store = createStore({
  dropdownValues: {
    page: 0,
    pageSize: 10,
    sortItems: [
      {
        field: "brandId",
        desc: true,
      },
    ],
  },
  isLogin: false,
  userData: null,
  brandData: null,
  styleData: null,
  originData: null,
  // Action to update a dropdown value
  setDropdownValue: action((state, payload) => {
    const { key, value } = payload;

    state.dropdownValues[key] = value;
    state.dropdownValues.sortItems[0].field =
      key === "maxPrice" || key === "minPrice"
        ? "price"
        : key === "page"
        ? "brandId"
        : key;
  }),
  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
  setIsLogin: action((state, payload) => {
    state.isLogin = payload;
  }),
  setBrand: action((state, payload) => {
    state.brandData = payload;
  }),
  setStyle: action((state, payload) => {
    state.styleData = payload;
  }),
  setOrigin: action((state, payload) => {
    state.originData = payload;
  }),
});

export default store;
