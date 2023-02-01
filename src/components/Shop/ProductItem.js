import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  // const cart = useSelector((state) => state.cart);
  const dispatchAction = useDispatch();

  const { title, price, description, id } = props;

  const addItemHandler = () => {
    dispatchAction(
      cartSliceActions.addItem({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Add to cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
