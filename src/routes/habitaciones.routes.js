import express from "express";
import {
  listarHabitaciones,
  crearHabitacion,
  eliminarHabitacion,
  editarHabitacion,
} from "../controllers/habitaciones.controllers.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Rutas para habitaciones
router
  .route("/habitaciones")
  .get(listarHabitaciones)
  .post(upload.single("image"), crearHabitacion);

router
  .route("/habitaciones/:id")
  .delete(eliminarHabitacion)
  .put(upload.single("image"), editarHabitacion);

export default router;
