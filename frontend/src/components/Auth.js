import React, { useState } from "react";
import api from "../api";

const Auth = ({ type }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = type === "signup" ? "/auth/signup" : "/auth/login";
            const response = await api.post(endpoint, { email, password });

            if (type === "login") {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
            } else {
                alert("Signup successful! Please log in.");
                window.location.href = "/login";
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{type === "signup" ? "Sign Up" : "Login"}</button>
        </form>
    );
};

export default Auth;
