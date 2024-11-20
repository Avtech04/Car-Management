import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CarForm from "./components/CarForm";
import CarDetail from "./components/CarDetail";
import EditCar from "./components/EditCar";
import LandingPage from "./pages/LandingPage";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        // Redirect to the landing page manually with a Link or a handler
        window.location.href = "/";
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Car Management
                    </Link>
                    <div>
                        {!isAuthenticated ? (
                            <>
                                <Link className="btn btn-primary mx-2" to="/login">
                                    Login
                                </Link>
                                <Link className="btn btn-success" to="/signup">
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cars/new" element={<CarForm onSave={() => (window.location.href = "/home")} />} />
                    <Route path="/cars/:carId" element={<CarDetail />} />
                    <Route path="/cars/:carId/edit" element={<EditCar />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
