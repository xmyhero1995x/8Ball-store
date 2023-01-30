import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const disputchFunction = useDispatch();

  const { title, price, description, id } = props;

  const addItemHandler = () => {
    const updatedItemsQuantity = cart.itemsQuantity + 1;

    const updatedItems = cart.items.slice();
    const existingItem = updatedItems.find((item) => item.id === id);

    if(existingItem) {
      const updatedExistingItem = { ...existingItem};
      updatedExistingItem.quantity++;
      updatedExistingItem.totalPrice =  updatedExistingItem.totalPrice + price;

      const existingItemIndex = updatedItems.findIndex((item) => item.id === id);
      updatedItems[existingItemIndex] = updatedExistingItem;
    } else {
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        title: title,
      })
    }


    const updatedCart = {
      itemsQuantity: updatedItemsQuantity,
      items: updatedItems,
    }
    disputchFunction(
      cartSliceActions.updateCart(updatedCart)
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
