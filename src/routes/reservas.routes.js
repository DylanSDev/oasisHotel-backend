import express from "express";
import {
  listarReservas,
  listarReservasPorUsuario,
  crearReserva,
  eliminarReserva,
  verificarDisponibilidad,
} from "../controllers/reservas.controllers.js";
import validacionReservaCrear from "../helpers/validacionReservaCrear.js";

const router = express.Router();

// Rutas para reservas
router
  .route("/reservas")
  .get(listarReservas)
  .post(validacionReservaCrear, crearReserva);
router.route("/reservas/usuario/:idUser").get(listarReservasPorUsuario);
router.delete("/reservas/:id", eliminarReserva);
router.get("/reservas/disponibilidad", verificarDisponibilidad);

export default router;
