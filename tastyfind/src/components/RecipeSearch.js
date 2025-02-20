import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import RecipeList from "./RecipeList";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=740b664b0edb42219d46355c669d07fa&query=${query}&number=10`
      );

      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center">Find Recipes 🍽️</h2>
      <Form className="d-flex">
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe..."
        />
        <Button variant="primary" onClick={fetchRecipes}>Search</Button>
      </Form>

      <RecipeList recipes={recipes} />
    </Container>
  );
};

export default RecipeSearch;
