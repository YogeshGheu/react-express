import mongoose from "mongoose";

const connection = async function(DbUrl){
    try {
        const dbConnection = await mongoose.connect(DbUrl)
        console.log("Mongo DB is conencted.")
        return dbConnection
    } catch (error) {
        console.log("Failed to connect to DB, Something went wrong!")
    }
}

export default connection;