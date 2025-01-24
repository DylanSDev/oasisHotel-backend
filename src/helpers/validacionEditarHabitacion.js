import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionEditarHabitacion = [
  check("number")
    .optional()
    .isNumeric()
    .withMessage("El número de habitación debe ser un número."),
  check("type")
    .optional()
    .isIn(["Superior", "Deluxe", "Presidencial", "Ejecutiva", "Junior"])
    .withMessage(
      "El tipo de habitación debe ser Superior, Deluxe, Presidencial, Ejecutiva o Junior."
    ),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("El precio debe ser un número.")
    .isIn([1050, 1550, 3050, 2550, 2050])
    .withMessage(
      "El precio debe ser uno de los siguientes: 1050, 1550, 3050, 2550, 2050."
    ),
  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de inicio debe estar en formato ISO8601."),
  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de fin debe estar en formato ISO8601.")
    .custom((value, { req }) => {
      if (value <= req.body.startDate) {
        throw new Error(
          "La fecha de fin debe ser posterior a la fecha de inicio."
        );
      }
      return true;
    }),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionEditarHabitacion;
