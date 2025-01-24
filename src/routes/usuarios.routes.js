import express from "express";
import {
  crearUsuario,
  listarUsuarios,
  eliminarUsuario,
  suspenderUsuario,
  editarUsuario,
  login,
} from "../controllers/usuarios.controllers.js";
import validarJWT from "../helpers/validarJWT.js";
import validacionUsuarioCrear from "../helpers/validacionUsuarioCrear.js";
import validacionUsuarioEditar from "../helpers/validacionUsuarioEditar.js";

const router = express.Router();

// Rutas para usuarios
router
  .route("/usuarios")
  .get(listarUsuarios)
  .post(validacionUsuarioCrear, crearUsuario);
router
  .route("/usuarios/:id")
  .delete(validarJWT, eliminarUsuario)
  .put([validarJWT, validacionUsuarioEditar], editarUsuario);
router.route("/usuarios/:id/suspend").put(validarJWT, suspenderUsuario);
router.route("/usuarios/login").post(login);
export default router;
