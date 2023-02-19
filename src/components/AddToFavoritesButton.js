import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/FavoritesSlices";
import styles from "../css/addToFavoritesButton.module.css"

function AddToFavoritesButton({ cocktail }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.FavoritesSlices.items);
  const [isChecked, setIsChecked] = useState(favorites.some((c) => c.idDrink === cocktail.idDrink));
  

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(addToFavorites(cocktail));
    } else {
      dispatch(removeFromFavorites(cocktail));
    }
  };

  return (
    <label className={styles.addToFavoritesButton}>
      <Checkbox
        checked={isChecked}
        onChange={handleChange}
        color="default"
        className={styles.addToFavoritesCheckbox}
      />
      <span className={styles.addToFavoritesButtonLabel}>Add to FAVORITE!</span>
    </label>
  );
}

export default AddToFavoritesButton;