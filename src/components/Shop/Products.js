import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
  { id: "1", price: 7, title: "Item-1", description: "Description" },
  { id: "2", price: 11, title: "Item-2", description: "Description" },
  { id: "3", price: 72, title: "Item-3", description: "Description" },
  { id: "4", price: 4, title: "Item-4", description: "Description" },
  { id: "5", price: 78, title: "Item-6", description: "Description" },
];

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>Top quality items here</h2>
      <ul>
        {DUMMY_ITEMS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              title={item.title}
              id={item.id}
              description={item.description}
              price={item.price}
            ></ProductItem>
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
