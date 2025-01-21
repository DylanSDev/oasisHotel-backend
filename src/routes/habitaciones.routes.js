import { Router } from "express";
import { listarHabitaciones } from "../controllers/habitaciones.controllers.js";

const router = Router();

//Como crear las rutas
router.route("/habitaciones").get(listarHabitaciones);

export default router;
