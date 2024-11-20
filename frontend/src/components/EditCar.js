import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import CarForm from "../components/CarForm";

const EditCar = () => {
    const { carId } = useParams(); // Get car ID from the route parameters
    const [car, setCar] = useState(null); // Store the car data
    const [loading, setLoading] = useState(true); // Manage loading state
    const navigate = useNavigate(); // For navigation after editing

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get(`/cars/${carId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCar(response.data); // Save car data
            } catch (error) {
                console.error("Error fetching car details:", error.response?.data || error.message);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchCar();
    }, [carId]);

    if (loading) {
        return <p>Loading...</p>; // Show loading message while fetching
    }

    if (!car) {
        return <p>Car not found!</p>; // Handle the case where the car is not found
    }

    return (
        <CarForm
            existingCar={car} // Pass the existing car data to the form
            onSave={() => navigate("/")} // Redirect to the home page after saving
        />
    );
};

export default EditCar;
