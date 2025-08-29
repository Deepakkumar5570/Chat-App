import mongoose, { mongo } from "mongoose";

//function to connect to MongoDB
export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
};    