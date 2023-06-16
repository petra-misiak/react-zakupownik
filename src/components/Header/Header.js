import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProducts,
  setProductsLoadingState,
  setErrorFromAPI,
  loadShoppingList,
  filterProducts,
} from "../../redux/productsSlice";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const filters = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  const getProductsFromApi = async (sufix) => {
    try {
      const response = await axios.get(`http://localhost:9000/${sufix}`);
      dispatch(setProductsLoadingState("loading"));
      dispatch(loadProducts(response.data));
      console.log(response.data);
      dispatch(setProductsLoadingState("success"));
      dispatch(filterProducts(filters));
      const allShoppingList = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadShoppingList(allShoppingList.data));
    } catch (e) {
      dispatch(setErrorFromAPI(e.response.data.error));
      dispatch(setProductsLoadingState("error loading products"));
      console.log(e);
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button
          onClick={() => getProductsFromApi("products")}
          variant="contained"
        >
          Załaduj produkty
        </Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
