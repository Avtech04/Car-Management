const express = require("express");
const {
    createCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar,
    getGlobalCars,
} = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Route to get all cars globally (publicly accessible, no authentication required)
router.get("/global", getGlobalCars);  // Removed authMiddleware

// Other routes remain the same...
router.get("/", authMiddleware, getCars);
router.get("/:id", authMiddleware, getCarById);
router.post("/", authMiddleware, upload.array("images", 10), createCar);
router.put("/:id", authMiddleware, upload.array("images", 10), updateCar);
router.delete("/:id", authMiddleware, deleteCar);

module.exports = router;
