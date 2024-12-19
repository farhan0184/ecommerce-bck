import mongoose from "mongoose";
import config from "./index";

const connectMongo = async () => {
    try {
        await mongoose.connect(config.database.url)
        console.log('MongoDB Connected Successfully.')
    } catch (e) {
        console.log('Database connection failed.')
        console.log('Retrying in 2 seconds...', config.database.url)
        setTimeout(() => {
            connectMongo()
        }, 2000)
    }
}

export default connectMongo