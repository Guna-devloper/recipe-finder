import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RecipeList = ({ recipes }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavorite = (recipe) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === recipe.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container className="mt-4">
      <Row>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Col xs={12} sm={6} md={4} key={recipe.id} className="mb-3">
              <Card className="shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  alt={recipe.title}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title className="text-center">{recipe.title}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="primary"
                      onClick={() => {
                        // Save selected recipe details before navigating
                        localStorage.setItem(`recipe_${recipe.id}`, JSON.stringify(recipe));
                        navigate(`/recipe/${recipe.id}`);
                      }}
                    >
                      View Recipe
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleFavorite(recipe)}
                      className="border-0"
                    >
                      {favorites.some((fav) => fav.id === recipe.id) ? (
                        <FaHeart color="red" size={20} />
                      ) : (
                        <FaRegHeart size={20} />
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center w-100">No recipes found</p>
        )}
      </Row>
    </Container>
  );
};

export default RecipeList;
