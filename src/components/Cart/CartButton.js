import styles from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mainActions } from "../../store/main-slice";

export const CartButton = (props) => {
  const cartItemsNumber = useSelector((state) => state.cart.itemsQuantity)
  const dispatchAction = useDispatch();
  
  const cartVisibilityHandler = () => {
    dispatchAction(mainActions.toggleCartVisibility());
  };

  return (
    <button className={styles.button} onClick={cartVisibilityHandler}>
      <span>Cart</span>
      <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
  );
};
