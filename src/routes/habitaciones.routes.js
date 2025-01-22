import { Router } from "express";
import {
  crearHabitacion,
  eliminarHabitacion,
  listarHabitaciones,
} from "../controllers/habitaciones.controllers.js";

const router = Router();

//Como crear las rutas
router.route("/habitaciones").get(listarHabitaciones).post(crearHabitacion);
router.route("/habitaciones/:id").delete(eliminarHabitacion);
export default router;
