import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSelectedProducts } from "../../redux/productsSlice";
import axios from "axios";

function ProductsList() {
  const [snackbarIsVisible, setSnackbarIsVisible] = useState(false);
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.list);
  console.log(productsList);

  const loadingStatus = useSelector(
    (state) => state.products.productsLoadingState
  );

  const errorFromAPI = useSelector((state) => state.products.errorFromAPI);

  useEffect(() => {
    if (errorFromAPI.length !== 0) {
      setSnackbarIsVisible(true);
    }
  }, [errorFromAPI]);

  const handleItemClick = async (products) => {
    try {
      const details = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(setSelectedProducts(details));
    } catch (e) {}
  };

  return (
    <div className={commonColumnsStyles.AppColumn}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {loadingStatus === "loading" ? (
          <CircularProgress />
        ) : productsList.length > 0 ? (
          productsList.map((products) => (
            <span onClick={() => handleItemClick(products)}>
              {" "}
              {products.name}{" "}
            </span>
          ))
        ) : (
          "brak produktow do wyświetlenia"
        )}
      </header>
    </div>
  );
}

export default ProductsList;
