import mongoose, { mongo } from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);

mongoose.connect(mongoURI);

const datosConexion = mongoose.connection;

datosConexion.once("open", () => {
  console.log("Base de datos conectada.");
});
