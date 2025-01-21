import { Router } from "express";
import {
  crearHabitacion,
  listarHabitaciones,
} from "../controllers/habitaciones.controllers.js";

const router = Router();

//Como crear las rutas
router.route("/habitaciones").get(listarHabitaciones).post(crearHabitacion);

export default router;
