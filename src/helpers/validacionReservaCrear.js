import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionReservaCrear = [
  check("idUser")
    .notEmpty()
    .withMessage("El ID de usuario es obligatorio.")
    .isMongoId()
    .withMessage("El ID de usuario debe ser válido."),

  check("type")
    .notEmpty()
    .withMessage("El tipo de habitación es obligatorio.")
    .isIn(["Superior", "Deluxe", "Presidencial", "Ejecutiva", "Junior"])
    .withMessage("El tipo de habitación no es válido."),

  check("checkIn")
    .notEmpty()
    .withMessage("La fecha de check-in es obligatoria.")
    .isISO8601()
    .toDate()
    .withMessage("La fecha de check-in debe ser válida."),

  check("checkOut")
    .notEmpty()
    .withMessage("La fecha de check-out es obligatoria.")
    .isISO8601()
    .toDate()
    .withMessage("La fecha de check-out debe ser válida.")
    .custom((value, { req }) => {
      const checkInDate = new Date(req.body.checkIn);
      if (value <= checkInDate) {
        throw new Error(
          "La fecha de check-out debe ser posterior al check-in."
        );
      }
      return true;
    }),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionReservaCrear;
