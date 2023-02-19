import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddToFavoritesButton from "../components/AddToFavoritesButton";
import axios from "axios";
import styles from "../css/searchButton.module.css"

const BartenderBeginner = () => {
  const [ingredients, setIngredients] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alcoholic, setAlcoholic] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    glass: null,
    ingredient: null,
    category: null,
    alcohol: null,
  });
  const [loading, setLoading] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Display options into combobox
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then((response) => setIngredients(response.data.drinks.map((drink) => drink.strIngredient1))),
      axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
        .then((response) => setGlasses(response.data.drinks.map((drink) => drink.strGlass))),
      axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        .then((response) => setCategories(response.data.drinks.map((drink) => drink.strCategory))),
      axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list")
        .then((response) => setAlcoholic(response.data.drinks.map((drink) => drink.strAlcoholic)))
    ])
    .then(() => setLoading(false))
    .catch((error) => console.log(error));
  }, []);

  // let cocktails = [];

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
    const requests = [];
    const responses = {
      ingredient: [],
      glass: [],
      alcohol: [],
      category: [],
    };

    if (ingredient) {
      requests.push(
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
        )
      );
    }

    if (glass) {
      requests.push(
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`
        )
      );
    }

    if (alcohol) {
      requests.push(
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`
        )
      );
    }

    if (category) {
      requests.push(
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        )
      );
    }

    const results = [];

    for (let i = 0; i < requests.length; i++) {
      const response = await requests[i];
      const result = await response.json();
      responses[Object.keys(responses)[i]] = result.drinks;
      results.push(result.drinks);
    }

    //Filtering if drink is in ALL parameters
    const filteredResults = results.reduce((accumulator, currentValue) => {
      return accumulator.filter((drink) =>
        currentValue.some((d) => d.idDrink === drink.idDrink)
      );
    });

    // Filter drinks found in at least 1 endpoint
    const filteredResultsAny = results.reduce((accumulator, currentValue) => {
      return accumulator.concat(
        currentValue.filter(
          (drink) => !accumulator.some((d) => d.idDrink === drink.idDrink)
        )
      );
    }, []);

    const filteredNames = filteredResults.map((drink) => drink.strDrink);

    return {
      filteredResults,
      filteredResultsAny,
      responses,
      filteredNames,
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

export default BartenderBeginner;
