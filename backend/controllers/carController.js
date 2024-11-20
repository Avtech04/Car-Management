const Car = require("../models/carModel");

// Create a car
exports.createCar = async (req, res) => {
    try {
        if (req.files.length > 10) {
            return res.status(400).json({ message: "A car can have up to 10 images only." });
        }

        const images = req.files.map(file => file.path);
        const car = await Car.create({ ...req.body, images, user: req.user.id });
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all cars for the logged-in user
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        if (req.files && req.files.length > 10) {
            return res.status(400).json({ message: "A car can have up to 10 images only." });
        }

        const images = req.files ? req.files.map(file => file.path) : undefined;
        const updateData = {
            ...req.body,
            ...(images && { images }),
        };

        const car = await Car.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updateData,
            { new: true }
        );

        if (!car) return res.status(404).json({ message: "Car not found or unauthorized" });

        res.json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!car) return res.status(404).json({ message: "Car not found or unauthorized" });
        res.json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search cars globally
exports.globalSearch = async (req, res) => {
    try {
        const { keyword } = req.query;

        const cars = await Car.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } },
            ],
        });

        res.json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGlobalCars = async (req, res) => {
  try {
      const cars = await Car.find().select("-user"); // Exclude the user field to make it public
      res.json(cars);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};