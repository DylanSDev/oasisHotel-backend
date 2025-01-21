import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import habitacionesRouter from "./src/routes/habitaciones.routes.js";
import "./src/databases/database.js";

const app = express();

//1 - Configuramos un puerto
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto: " + app.get("port"));
});

//2 - Configuramos middlewares
app.use(cors()); //Obtenemos conexiones remotas
app.use(morgan("dev")); //Me dará información extra en la terminal
app.use(express.json()); //Interpreta los datos en formato JSON
app.use(express.urlencoded({ extended: true })); //Interpreta datos del body del request
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

//3 - Configuramos las rutas
app.use("/api", habitacionesRouter);
