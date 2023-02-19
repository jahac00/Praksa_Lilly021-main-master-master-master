// import ClearLocalStorageButton from "./ClearLocalStorageButton";
import styles from "../css/footer.module.css"

function Footer() {
  return (
    <div className={styles.footer}>
      <h1>The Cocktail Master is a comprehensive guide to all your favorite cocktails. With a vast database of drinks, the app provides detailed information on ingredients, mixing instructions, and nutritional information. You can easily filter through the database to find the perfect cocktail for any occasion.</h1>
      {/* <ClearLocalStorageButton/> */}
    </div>
  );
}

export default Footer;