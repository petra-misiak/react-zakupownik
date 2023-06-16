import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    selectedProducts: null,
    filteredProducts: [],
    filters: "",
    shoppingList: [],
    productsLoadingState: "initial",
    errorFromAPI: "",
    onlyFood: false,
  },
  reducers: {
    loadProducts: (state, value) => {
      state.list = value.payload;
    },
    setProductsLoadingState: (state, value) => {
      state.productsLoadingState = value.payload;
    },
    loadShoppingList: (state, value) => {
      state.shoppingList = value.payload;
    },
    setErrorFromAPI: (state, value) => {
      state.errorFromAPI = value.payload;
    },
    removeProducts: (state) => {
      state.list = [];
    },
    setSelectedProducts: (state, value) => {
      state.selectedProducts = value.payload;
    },
    filterProducts: (state, value) => {
      state.filters = value.payload;
      state.filteredProducts = state.filteredProducts.filter((product) =>
        product.name.includes(state.filters)
      );
    },
    searchForFood: (state, value) => {
      state.onlyFood = value.payload;
    },
  },
});

export const {
  loadProducts,
  removeProducts,
  setSelectedProducts,
  removeProduct,
  setProductsLoadingState,
  setErrorFromAPI,
  loadShoppingList,
  filterProducts,
  searchForFood,
} = productSlice.actions;

export default productSlice.reducer;
