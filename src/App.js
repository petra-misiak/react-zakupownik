import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import ProductsList from "./components/ProductsList/ProductsList";
// import shoppingList from "./components/shoppingList/shoppingList";
import Dashboard from "../../react2223/src/components/Dashboard/Dashboard";

function App(props) {
  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.appWrapper}>
      <Header />
      <ProductsFilters />
      <Dashboard />
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
