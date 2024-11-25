import { createStore, action } from "easy-peasy";

const store = createStore({
  dropdownValues: {
    brandId: 0,
    styleId: 0,
    originId: 0,
    fuelId: 0,
    outsideColorId: 0,
    insideColorId: 0,
    cityId: 0,
    districtId: 0,
    wardId: 0,
    page: 0,
    pageSize: 10,
    minPrice: 0,
    maxPrice: 0,
    sortItems: [
      {
        field: "string",
        desc: true,
      },
    ],
    keyword: "string",
    manufacturingYear: 0,
    version: "string",
    kmDriven: 0,
    seatCapacity: 0,
    status: "Tình trạng xe",
    transmission: "Hộp số",
    drivetrain: "Hệ dẫn động",
  },
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
});

export default store;
