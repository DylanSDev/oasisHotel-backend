import express from "express";
import {
  listarReservas,
  listarReservasPorUsuario,
  crearReserva,
} from "../controllers/reservas.controllers.js";
const router = express.Router();

// Rutas para reservas
router.route("/reservas").get(listarReservas).post(crearReserva);
router.route("/reservas/usuario/:idUser").get(listarReservasPorUsuario);

export default router;
