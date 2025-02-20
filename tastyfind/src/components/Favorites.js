import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage when component mounts
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

  return (
    <Container className="mt-4">
      <h2>My Favorite Recipes</h2>
      <Row>
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <Col xs={12} sm={6} md={4} key={recipe.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary">View Recipe</Button>
                    <Button variant="danger" onClick={() => removeFavorite(recipe.id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
