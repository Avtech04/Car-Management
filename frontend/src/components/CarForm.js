import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import api from "../api";

const CarForm = ({ existingCar, onSave }) => {
    const [title, setTitle] = useState(existingCar?.title || "");
    const [description, setDescription] = useState(existingCar?.description || "");
    const [tags, setTags] = useState(existingCar?.tags?.join(", ") || "");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 10) {
            setError("You can upload up to 10 images only.");
        } else {
            setError("");
            setImages(selectedFiles);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        tags.split(",").forEach((tag) => formData.append("tags", tag.trim()));
        images.forEach((image) => formData.append("images", image));

        try {
            if (existingCar) {
                await api.put(`/cars/${existingCar._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/cars", formData, {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
                });
            }

            if (onSave) onSave();
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <Container>
            <h2 className="my-4">{existingCar ? "Edit Car" : "Add New Car"}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tags (comma-separated)</Form.Label>
                    <Form.Control
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                </Form.Group>
                <Button type="submit" variant="success">
                    {existingCar ? "Update Car" : "Add Car"}
                </Button>
            </Form>
        </Container>
    );
};

export default CarForm;
