import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatchFunction = useDispatch();

  const { id, title, quantity, total, price } = props.item;

  const addItemHandler = () => {
    dispatchFunction(
      cartSliceActions.addItem({
        id,
        title,
        price,
      })
    );
  };

  const removeItemHandler = () => {
    dispatchFunction(cartSliceActions.removeItem(id));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{" "}
          <span className={styles["item-price"]}>
            (${price.toFixed(2)} / pcs.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>+</button>
          <button onClick={removeItemHandler}>-</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;