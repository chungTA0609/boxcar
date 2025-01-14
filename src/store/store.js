import { createStore, action } from "easy-peasy";

const store = createStore({
  dropdownValues: {
    page: 0,
    pageSize: 12,
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
  modelData: null,
  fuelData: null,
  colorData: null,
  editCarData: null,
  searchBrand: "",
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
  resetDropDownValue: action((state) => {
    state.dropdownValues = {
      page: 0,
      pageSize: 12,
      sortItems: [
        {
          field: "brandId",
          desc: true,
        },
      ],
    };
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
  setModel: action((state, payload) => {
    state.modelData = payload;
  }),
  setFuel: action((state, payload) => {
    state.fuelData = payload;
  }),
  setColor: action((state, payload) => {
    state.colorData = payload;
  }),
  setSearchBrand: action((state, payload) => {
    state.searchBrand = payload;
  }),
  setEditCarData: action((state, payload) => {
    state.editCarData = payload;
  }),
});

export default store;
