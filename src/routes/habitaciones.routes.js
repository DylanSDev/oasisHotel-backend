import express from "express";
import {
  listarHabitaciones,
  crearHabitacion,
  eliminarHabitacion,
  editarHabitacion,
} from "../controllers/habitaciones.controllers.js";
import validacionEditarHabitacion from "../helpers/validacionEditarHabitacion.js";
import validacionCrearHabitacion from "../helpers/validacionCrearHabitacion.js";
import validarJWT from "../helpers/validarJWT.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Rutas para habitaciones
router
  .route("/habitaciones")
  .get(listarHabitaciones)
  .post(
    [validarJWT, upload.single("image"), validacionCrearHabitacion],
    crearHabitacion
  );

router
  .route("/habitaciones/:id")
  .delete(validarJWT, eliminarHabitacion)
  .put(
    [validarJWT, upload.single("image"), validacionEditarHabitacion],
    editarHabitacion
  );

export default router;
