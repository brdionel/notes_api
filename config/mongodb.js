import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.DATABASE_URL}`)

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url} `)
    } catch(err) {
        console.log(`error: ${err.message}`);
        process.exit(1);
    }
}

export default conectarDB;