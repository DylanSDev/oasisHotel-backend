import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

const app = express();

//1 - Configuramos un puerto
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto: " + app.get("port"));
});

//2 - Configuramos middlewares
app.use(cors()); //Obtenemos conexiones remotas
app.use(morgan("dev")); //Me dará información extra en la terminal
//Faltan agregar middlewares

//3 - Configuramos las rutas
app.get("/", (req, res) => {
  console.log("procesando una solicitud get");
  res.send("Respuesta del backend loquito");
});
