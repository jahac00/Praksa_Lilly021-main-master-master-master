import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../youtube/VideoPlayer";
import AddToFavoritesButton from "../components/AddToFavoritesButton";
import styles from "../css/cocktailDetails.module.css";

function CocktailDetails() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
        );
        const [cocktail] = response.data.drinks || [];
        const ingredients = Object.entries(cocktail || {})
          .filter(([key, value]) => key.startsWith("strIngredient") && value)
          .map(([key, value], index) => ({
            name: value,
            measure: cocktail[`strMeasure${index + 1}`],
            image: `https://www.thecocktaildb.com/images/ingredients/${value}-Small.png`,
          }));
        setCocktail(cocktail);
        setIngredients(ingredients);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchCocktail();
  }, [cocktailId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles["cocktail-details"]}>
      <div className={styles["cocktail-header"]}>
        <h2>{cocktail.strDrink}</h2>
        <AddToFavoritesButton cocktail={cocktail} />
      </div>
      <p>
        {cocktail.strAlcoholic === "Alcoholic"
          ? "This is an ALCOHOLIC drink"
          : "This is a NON-alcoholic drink"}
      </p>
      <p>Category: {cocktail.strCategory}</p>
      <p>Instructions: {cocktail.strInstructions}</p>
      <p>Serve in: {cocktail.strGlass}</p>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        style={{ width: "400px", height: "auto", paddingBottom: "20px" }}
      />
      <div className={styles["ingredients-wrapper"]}>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <img
                src={ingredient.image}
                alt={ingredient.name}
                style={{ width: "50px" }}
              />
              {ingredient.name} - {ingredient.measure}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className={styles["video-player-wrapper"]}>
        <VideoPlayer cocktailName={"how to make " + cocktail.strDrink + " cocktail"} />
      </div>
      <div className={styles["footer"]}>
      </div> */}
    </div>
  );
}

export default CocktailDetails;

//Video player zakomentarisan zbog api requesta. Odkomentarisati po potrebi
