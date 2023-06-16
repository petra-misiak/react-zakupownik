import { useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  loadShoppingList,
  setProductsLoadingState,
} from "../../redux/productsSlice";

function ShoppingList() {
  const [deleteProductId, setDeleteProductId] = useState(0);
  const loadingStatus = useSelector(
    (state) => state.products.productsLoadingState
  );
  const shoppingList = useSelector((state) => state.products.shoppingList);
  const dispatch = useDispatch();

  const handleProductClick = async (products) => {
    try {
      setDeleteProductId(products.id);
      dispatch(setProductsLoadingState("removing"));
      await axios.delete(
        `http://localhost:9000/products/shoppingList/${products.id}`
      );
      const details = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadShoppingList(details.data));
      dispatch(setProductsLoadingState("success"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shopping List</p>
        {shoppingList.length > 0
          ? shoppingList.map((product, index) => (
              <span onClick={() => handleProductClick(product, index)}>
                {" "}
                {index + 1} {product.name}{" "}
                {loadingStatus === "removing" &&
                deleteProductId === product.id ? (
                  <CircularProgress />
                ) : (
                  ""
                )}
              </span>
            ))
          : "koszyk jest pusty"}
      </header>
    </div>
  );
}

export default ShoppingList;
