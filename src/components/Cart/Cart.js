import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={styles.cart}>
      <h2>My cart</h2>
      <ul>
        {cartItems.map((item) => {
          return (
            <CartItem
              item={{
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
              }}
              key={item.id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
