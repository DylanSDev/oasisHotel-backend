import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionUsuarioEditar = [
  check("name")
    .optional()
    .isLength({ min: 5, max: 30 })
    .withMessage("El nombre debe tener entre 5 y 30 caracteres."),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido.")
    .isLength({ max: 35 })
    .withMessage("El correo electrónico no debe exceder los 35 caracteres."),

  check("phone")
    .optional()
    .matches(/^\d{10,}$/)
    .withMessage("El número de teléfono debe tener al menos 10 dígitos.")
    .isLength({ max: 20 })
    .withMessage("El número de teléfono no debe exceder los 20 caracteres."),

  check("state")
    .optional()
    .isIn(["activo", "suspendido"])
    .withMessage('El estado debe ser "activo" o "suspendido".'),

  check("role")
    .optional()
    .isIn(["usuario", "admin"])
    .withMessage('El rol debe ser "usuario" o "admin".'),

  (req, res, next) => resultadoValidacion(req, res, next), // Procesa errores
];

export default validacionUsuarioEditar;
