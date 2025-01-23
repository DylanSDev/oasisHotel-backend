import express from "express";
import {
  listarReservas,
  crearReserva,
} from "../controllers/reservas.controllers.js";
const router = express.Router();

// Rutas para reservas
router.route("/reservas").get(listarReservas).post(crearReserva);

export default router;
