import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionCrearHabitacion = [
  check("number")
    .notEmpty()
    .withMessage("El número de habitación es obligatorio.")
    .isNumeric()
    .withMessage("El número de habitación debe ser un número."),
  check("type")
    .notEmpty()
    .withMessage("El tipo de habitación es obligatorio.")
    .isIn(["Superior", "Deluxe", "Presidencial", "Ejecutiva", "Junior"])
    .withMessage(
      "El tipo de habitación debe ser Superior, Deluxe, Presidencial, Ejecutiva o Junior."
    ),
  check("price")
    .notEmpty()
    .withMessage("El precio es obligatorio.")
    .isNumeric()
    .withMessage("El precio debe ser un número.")
    .isIn([1050, 1550, 3050, 2550, 2050])
    .withMessage(
      "El precio debe ser uno de los siguientes: 1050, 1550, 3050, 2550, 2050."
    ),
  check("startDate")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria.")
    .isISO8601()
    .withMessage("La fecha de inicio debe estar en formato ISO8601."),
  check("endDate")
    .notEmpty()
    .withMessage("La fecha de fin es obligatoria.")
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

export default validacionCrearHabitacion;
