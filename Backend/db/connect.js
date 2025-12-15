import "dotenv/config";
import mongoose from "mongoose";



async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb Connected");
    } catch (err) {
        console.log("Enter connecting to DB", err);
    }
}

export default connectToDB;