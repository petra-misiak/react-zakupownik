import React, { useState } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, searchForFood } from "../../redux/productsSlice";

function ProductsFilters() {
  const [searchFood, setSearchFood] = useState("");
  const [item, setItem] = useState(false);
  const filterItem = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  const handleFilterItem = (event) => {
    setItem(event.target.checked);
    if (event.target.checked) {
      dispatch(searchForFood(true));
      dispatch(filterProducts(filterItem));
    } else {
      dispatch(searchForFood(false));
      dispatch(filterProducts(filterItem));
    }
  };
  const handleFilterFood = (event) => {
    setSearchFood(event.target.value);
    dispatch(filterProducts(event.target.value));
  };
  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Nazwa"
                variant="outlined"
                value={searchFood}
                onChange={handleFilterFood}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Tylko produkty spożywcze"
            value={item}
            onChange={handleFilterItem}
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
