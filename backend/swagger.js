const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Car Management API",
            version: "1.0.0",
            description: "API documentation for the Car Management system",
        },
        servers: [
            {
                url: "http://localhost:5000/api",  
            },
        ],
    },
    apis: ["./routes/carRoutes.js"], // Path to  API route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
