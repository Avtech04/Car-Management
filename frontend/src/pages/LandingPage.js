import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Carousel, Alert } from "react-bootstrap";
import api from "../api";

const LandingPage = () => {
    const [globalCars, setGlobalCars] = useState([]);
    const [error, setError] = useState("");

    const fetchGlobalCars = async () => {
        try {
            const response = await api.get("/cars/global");
            setGlobalCars(response.data);
        } catch (error) {
            setError("Unable to fetch global cars at the moment. Please try again later.");
            console.error("Error fetching global cars:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchGlobalCars();
    }, []);

    return (
        <Container>
            <h2 className="text-center my-4">Explore Cars Globally</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {globalCars.map((car) => (
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
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default LandingPage;
