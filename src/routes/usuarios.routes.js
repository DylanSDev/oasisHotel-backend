import express from "express";
import {
  crearUsuario,
  listarUsuarios,
  eliminarUsuario,
  suspenderUsuario,
  editarUsuario,
} from "../controllers/usuarios.controllers.js";
const router = express.Router();

// Rutas para usuarios
router.route("/usuarios").get(listarUsuarios).post(crearUsuario);
router.route("/usuarios/:id").delete(eliminarUsuario).put(editarUsuario);
router.route("/usuarios/:id/suspend").put(suspenderUsuario);
export default router;
