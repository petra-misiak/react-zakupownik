import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    selectedProducts: null,
    ProductsLoadingState: "initial",
    errorFromAPI: "",
  },
  reducers: {
    loadProducts: (state, value) => {
      state.list = value.payload;
    },
    setProductsLoadingState: (state, value) => {
      state.productsLoadingState = value.payload;
    },
    setErrorFromAPI: (state, value) => {
      state.errorFromAPI = value.payload;
    },
    removeProducts: (state) => {
      // state.list = [];
    },
    setSelectedProducts: (state, value) => {
      state.selectedProducts = value.payload;
    },
    removeProduct: (state, value) => {},
  },
});

export const {
  loadProducts,
  removeProducts,
  setSelectedProducts,
  removeProduct,
  setProductsLoadingState,
  setErrorFromAPI,
} = productSlice.actions;

export default productSlice.reducer;
