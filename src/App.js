import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import "./App.css";


const App = () => {

const APP_ID = "35e9f46c";
const APP_KEY = "75333fc938c50b48b817493bc83e2470";


const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('olive');


useEffect(() => {
  getRecipes();
}, [query]);


const getRecipes = async () => {
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = event => {
  setSearch(event.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch(''); 
}

  return (
    <div className="App">
      <form onSubmit = {getSearch} className="search-form">
        <input className="search-bar" type="text" value = {search} onChange = {updateSearch} ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe => (
          <Recipe 
          title = {recipe.recipe.label} 
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          />
      ))};
      </div>
    </div>
  );
};

export default App;
