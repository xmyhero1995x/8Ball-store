import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const isCartMenuOpen = useSelector((state) => state.cartMenu.isCartMenuOpen);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    try{axios({
      method: 'put',
      url: `https://ball-f928a-default-rtdb.firebaseio.com/cart.json`,
      data: cart,
    })} catch(error) {
      if(error.response.status === 404) {
        console.log('Resource could not be found');
      } else {
        console.log(error.message);
      }
    }; 
  }, [cart]);
  return (
    <Layout>
      {isCartMenuOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
