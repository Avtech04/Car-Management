import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Carousel } from "react-bootstrap";
import api from "../api";

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    // Fetch all cars for the logged-in user
    const fetchCars = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/cars", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error.response?.data || error.message);
        }
    };

    // Search cars by keyword
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await api.get(`/cars/search?keyword=${keyword}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCars(response.data);
        } catch (error) {
            console.error("Error searching cars:", error.response?.data || error.message);
        }
    };
    const handleDelete = async (carId) => {
      if (window.confirm("Are you sure you want to delete this car?")) {
          try {
              const token = localStorage.getItem("token");
              await api.delete(`/cars/${carId}`, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              fetchCars(); // Refresh car list
          } catch (error) {
              console.error("Error deleting car:", error.response?.data || error.message);
          }
      }
  };
  
    // Fetch cars on component mount
    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <Container>
            <h2 className="my-4">Your Cars</h2>
            <Form onSubmit={handleSearch} className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search by title, description, or tags..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button type="submit" variant="primary" className="mt-2">
                    Search
                </Button>
            </Form>

            {/* Add Car Button */}
            <div className="mb-4">
                <Button
                    variant="success"
                    onClick={() => navigate("/cars/new")}
                >
                    Add New Car
                </Button>
            </div>

            <Row>
                {cars.map((car) => (
                    <Col md={4} key={car._id} className="mb-4">
                        <Card>
                            {car.images.length > 0 && (
                                <Carousel>
                                    {car.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={`http://localhost:5000/${image}`}
                                                alt={`Car image ${index + 1}`}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}
                            <Card.Body>
                                <Card.Title>{car.title}</Card.Title>
                                <Card.Text>{car.description}</Card.Text>
                                <Button
                                    variant="info"
                                    onClick={() => navigate(`/cars/${car._id}`)}
                                    className="me-2"
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => navigate(`/cars/${car._id}/edit`)} className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
    variant="danger"
    onClick={() => handleDelete(car._id)}
>
    Delete
</Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CarList;
