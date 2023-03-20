import commonColumnsStyles from "../../common/styles/Columns.module.scss";

function shoppingList() {
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shopping List</p>
      </header>
    </div>
  );
}

export default shoppingList;
