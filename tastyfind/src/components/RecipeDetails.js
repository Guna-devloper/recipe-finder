import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner, Row, Col } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
        );
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container className="mt-4">
      {recipe ? (
        <Card className="shadow-sm border-0">
          <Row className="g-0">
            {/* Recipe Image */}
            <Col xs={12} md={5} className="d-flex justify-content-center align-items-center p-3">
              <Card.Img
                src={recipe.image}
                alt={recipe.title}
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Col>

            {/* Recipe Details */}
            <Col xs={12} md={7}>
              <Card.Body>
                <Card.Title className="text-center text-md-start">{recipe.title}</Card.Title>

                <h5 className="mt-3">Ingredients:</h5>
                <ul className="list-unstyled ps-3">
                  {recipe.extendedIngredients.map((ing) => (
                    <li key={ing.id} className="mb-1">• {ing.original}</li>
                  ))}
                </ul>

                <h5 className="mt-3">Instructions:</h5>
                <p className="small" dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ) : (
        <p className="text-center">Recipe not found</p>
      )}
    </Container>
  );
};

export default RecipeDetails;
