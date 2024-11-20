const mongoose = require("mongoose");

const connectDB = () => {
    try {
        console.log(process.env.MONGO_URI);
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true});
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
