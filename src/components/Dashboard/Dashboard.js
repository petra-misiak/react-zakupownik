import ProductsList from "../ProductsList/ProductsList";
import ShoppingList from "../ShopingList/ShopingList";
import styles from "../../App.module.scss";

function Dashboard() {
  return (
    <div className={styles.columnsWrapper}>
      <ProductsList />
      <ShoppingList />
    </div>
  );
}

export default Dashboard;
