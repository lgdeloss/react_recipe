import './App.css';
import React,{useEffect, useState} from "react";
import Recipe from './Recipe';


const App = () => {

  const APP_ID = 'd752b8e3';
  const APP_KEY = 'c185a549e49d9d7792385b98fee65bc6';

  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
         <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}/>))}
      </div>
    </div>
  );
};

export default App;
