import express from "express";
import {
  listarReservas,
  listarReservasPorUsuario,
  crearReserva,
  eliminarReserva,
  verificarDisponibilidad,
} from "../controllers/reservas.controllers.js";
import validacionReservaCrear from "../helpers/validacionReservaCrear.js";
import validarJWT from "../helpers/validarJWT.js";

const router = express.Router();

// Rutas para reservas
router
  .route("/reservas")
  .get(listarReservas)
  .post([validarJWT, validacionReservaCrear], crearReserva);
router.route("/reservas/usuario/:idUser").get(listarReservasPorUsuario);
router.get("/reservas/disponibilidad", verificarDisponibilidad);

// Esta petición solo esta disponible desde el backend
router.delete("/reservas/:id", eliminarReserva);

export default router;
