import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a recipe from favorites
  const removeFavorite = (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update local storage
  };

  // Navigate to RecipeDetails and store full recipe details in localStorage
  const viewRecipe = (recipe) => {
    localStorage.setItem(`recipe_${recipe.id}`, JSON.stringify(recipe));
    navigate(`/recipe/${recipe.id}`); // Redirect to recipe details page
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">My Favorite Recipes</h2>
      <Row>
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <Col xs={12} sm={6} md={4} key={recipe.id} className="mb-3">
              <Card className="shadow-sm border-0">
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} className="img-fluid" />
                <Card.Body>
                  <Card.Title className="text-center">{recipe.title}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => viewRecipe(recipe)}>
                      View Recipe
                    </Button>
                    <Button variant="danger" onClick={() => removeFavorite(recipe.id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center w-100">No favorite recipes yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
