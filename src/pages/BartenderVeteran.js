import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddToFavoritesButton from "../components/AddToFavoritesButton";
import axios from "axios";
import styles from "../css/searchButton.module.css"

const BartenderVeteran = () => {
  const [ingredients, setIngredients] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alcoholic, setAlcoholic] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    glass: [],
    ingredient: [],
    category: [],
    alcohol: [],
  });
  const [loading, setLoading] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Display options into combobox
  useEffect(() => {
    setLoading(true);
    axios.all([
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'),
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list'),
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'),
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
    ])
    .then(axios.spread((ingredientsResponse, glassesResponse, categoriesResponse, alcoholicResponse) => {
      setIngredients(ingredientsResponse.data.drinks.map((drink) => drink.strIngredient1));
      setGlasses(glassesResponse.data.drinks.map((drink) => drink.strGlass));
      setCategories(categoriesResponse.data.drinks.map((drink) => drink.strCategory));
      setAlcoholic(alcoholicResponse.data.drinks.map((drink) => drink.strAlcoholic));
      setLoading(false);
    }))
    .catch((error) => console.log(error));
  }, []);

  const handleSearch = async () => {
    const { ingredient, glass, alcohol, category } = searchCriteria;
    const cocktails = await searchAllCocktails(
      ingredient,
      glass,
      alcohol,
      category
    );
    console.log(cocktails);
    setCocktails(cocktails);
    setFilteredResults(filteredResults);
  };

  const searchAllCocktails = async (ingredient, glass, alcohol, category) => {
    const responses = {
      ingredient: [],
      glass: [],
      alcohol: [],
      category: [],
    };

    if (ingredient && ingredient.length > 0) {
      for (let i = 0; i < ingredient.length; i++) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient[i]}`);
        responses.ingredient = responses.ingredient.concat(response.data.drinks);
      }
    }
    
    if (glass && glass.length > 0) {
      for (let i = 0; i < glass.length; i++) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass[i]}`);
        responses.glass = responses.glass.concat(response.data.drinks);
      }
    }
    
    if (alcohol && alcohol.length > 0) {
      for (let i = 0; i < alcohol.length; i++) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol[i]}`);
        responses.alcohol = responses.alcohol.concat(response.data.drinks);
      }
    }
    
    if (category && category.length > 0) {
      for (let i = 0; i < category.length; i++) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category[i]}`);
        responses.category = responses.category.concat(response.data.drinks);
      }
    }

    // Filter cocktails that appear in every array
    let filteredResults = [];
if (responses && Object.keys(responses).length > 0) {
  const arraysToSearch = [];
  if (responses.ingredient && responses.ingredient.length > 0) {
    arraysToSearch.push(responses.ingredient);
  }
  if (responses.glass && responses.glass.length > 0) {
    arraysToSearch.push(responses.glass);
  }
  if (responses.category && responses.category.length > 0) {
    arraysToSearch.push(responses.category);
  }
  if (responses.alcohol && responses.alcohol.length > 0) {
    arraysToSearch.push(responses.alcohol);
  }

  if (arraysToSearch.length > 0) {
    const drinkIds = arraysToSearch.map(arr => arr.map(drink => drink.idDrink));
    const intersection = drinkIds.reduce((acc, curr) => acc.filter(drink => curr.includes(drink)));
    const uniqueDrinks = new Set(intersection);
    filteredResults = [...uniqueDrinks]
    .map(drinkId => arraysToSearch[0].find(drink => drink.idDrink === drinkId))
    .sort((a, b) => a.strDrink.localeCompare(b.strDrink));
  }
}

    const results = [];

    return {
      responses,
      results,
      filteredResults
    };
  };

  return (
    <div>
      <h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={glasses}
          sx={{ width: 300 }}
          multiple
          value={searchCriteria.glass}
          onChange={(event, value) =>
            setSearchCriteria({ ...searchCriteria, glass: value })
          }
          renderInput={(params) => <TextField {...params} label="Glasses" />}
        />
      </h3>
      <h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ingredients}
          sx={{ width: 300 }}
          multiple
          value={searchCriteria.ingredient}
          onChange={(event, value) =>
            setSearchCriteria({ ...searchCriteria, ingredient: value })
          }
          renderInput={(params) => (
            <TextField {...params} label="Ingridients" />
          )}
        />
      </h3>
      <h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          sx={{ width: 300 }}
          multiple
          value={searchCriteria.category}
          onChange={(event, value) =>
            setSearchCriteria({ ...searchCriteria, category: value })
          }
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </h3>
      <h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={alcoholic}
          sx={{ width: 300 }}
          multiple
          value={searchCriteria.alcohol}
          onChange={(event, value) =>
            setSearchCriteria({ ...searchCriteria, alcohol: value })
          }
          renderInput={(params) => <TextField {...params} label="Alcohol" />}
        />
      </h3>
      <div>
        <Button className={styles.button} variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <ul>
          {cocktails.filteredResults?.map((cocktail) => (
            <li key={cocktail.idDrink}>
              <NavLink to={`/cocktail/${cocktail.idDrink}`}>
                {cocktail.strDrink}
              </NavLink>
              <AddToFavoritesButton cocktail={cocktail} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BartenderVeteran;