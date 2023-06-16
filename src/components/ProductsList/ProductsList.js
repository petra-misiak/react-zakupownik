import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  setSelectedProducts,
  loadShoppingList,
  setProductsLoadingState,
} from "../../redux/productsSlice";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Snackbar } from "@mui/material";

function ProductsList() {
  const [snackbarIsVisible, setSnackbarIsVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.list);
  console.log(productsList);
  const loadingStatus = useSelector(
    (state) => state.products.productsLoadingState
  );
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const errorFromAPI = useSelector((state) => state.products.errorFromAPI);

  useEffect(() => {
    if (errorFromAPI.length !== 0) {
      setSnackbarIsVisible(true);
    }
  }, [errorFromAPI]);

  const handleProductClick = async (products) => {
    try {
      setProductId(products.id);
      const newProducts = { ...products };
      newProducts.id = uuidv4();
      dispatch(setProductsLoadingState(`loading`));
      await axios.post(
        `http://localhost:9000/products/shoppingList/new`,
        newProducts
      );
      const details = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(setSelectedProducts(details));
      dispatch(loadShoppingList(details.data));
      dispatch(setProductsLoadingState("success"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={commonColumnsStyles.AppColumn}>
      <Snackbar
        open={snackbarIsVisible}
        autoHideDuration={3000}
        onClose={() => setSnackbarIsVisible(false)}
        message={`${errorFromAPI}`}
      />
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <span onClick={() => handleProductClick(product)}>
                {" "}
                {product.name} {product.id}{" "}
                {loadingStatus === "loading" && productId === product.id ? (
                  <CircularProgress />
                ) : (
                  ""
                )}
              </span>
            ))
          : "brak produktów do wyświetlenia"}
      </header>
    </div>
  );
}

export default ProductsList;
