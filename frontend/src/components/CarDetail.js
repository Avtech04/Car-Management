import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import api from "../api";

const CarDetail = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get(`/cars/${carId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCar(response.data);
            } catch (error) {
                console.error("Error fetching car details:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [carId]);

    if (loading) return <p>Loading...</p>;
    if (!car) return <p>Car not found!</p>;

    return (
        <Container>
            <h2 className="my-4">{car.title}</h2>
            <Row>
                <Col md={6}>
                    {car.images.map((img, index) => (
                        <Image
                            key={index}
                            src={`http://localhost:5000/${img}`}
                            alt={`Car ${index}`}
                            className="mb-3"
                            fluid
                        />
                    ))}
                </Col>
                <Col md={6}>
                    <p>{car.description}</p>
                    <Button variant="warning" href={`/cars/${car._id}/edit`} className="me-2">
                        Edit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CarDetail;
