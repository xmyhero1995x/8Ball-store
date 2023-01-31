import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { mainActions } from "./store/main-slice";
import StatusBarMessage from "./components/UI/StatusBarMessage";

function App() {
  const isCartMenuOpen = useSelector((state) => state.cart.isCartMenuOpen);
  const cart = useSelector((state) => state.cart);
  const statusMessage = useSelector((state) => state.main.statusMessage);

  const disputchFunction = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      disputchFunction(
        mainActions.showStatusMessage({
          status: "pending",
          titile: "sending data",
          message: "Cart data in process",
        })
      );
      await axios({
        method: "put",
        url: `https://ball-f928a-default-rtdb.firebaseio.com/cart.json`,
        data: cart,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

          disputchFunction(
            mainActions.showStatusMessage({
              status: "error, wasn't send",
              message: "Cart data wasn't send",
            })
          );
        });
    };
    sendCartData();
    disputchFunction(
      mainActions.showStatusMessage({
        status: "success",
        titile: "Data was send",
        message: "Cart data was send",
      })
    );
  }, [cart]);
  return (
    <Fragment>
      {statusMessage && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {isCartMenuOpen && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
