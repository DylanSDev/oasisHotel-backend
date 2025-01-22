import express from "express";
import {
  crearUsuario,
  listarUsuarios,
} from "../controllers/usuarios.controllers.js";
const router = express.Router();

// Rutas para usuarios
router.route("/usuarios").get(listarUsuarios).post(crearUsuario);

export default router;
