import mongoose from "mongoose";

export default async function connect(){
    try {
        const dbInstance = await mongoose.connect(process.env.MONGO_URI!)
        console.log('db is connected on port ::', dbInstance.connection.port)
    } catch (error) {
        console.log("db conection is failed")
        console.log(error)
        process.exit(1)
    }
}