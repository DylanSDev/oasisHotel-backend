import express from "express";
import {
  listarReservas,
  listarReservasPorUsuario,
  crearReserva,
  eliminarReserva,
} from "../controllers/reservas.controllers.js";
const router = express.Router();

// Rutas para reservas
router.route("/reservas").get(listarReservas).post(crearReserva);
router.route("/reservas/usuario/:idUser").get(listarReservasPorUsuario);
router.delete("/reservas/:id", eliminarReserva);

export default router;
