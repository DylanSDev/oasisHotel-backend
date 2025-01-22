import express from "express";
import { listarUsuarios } from "../controllers/usuarios.controllers.js";
const router = express.Router();

// Rutas para usuarios
router.route("/usuarios").get(listarUsuarios);

export default router;
