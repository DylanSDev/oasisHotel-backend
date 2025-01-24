import jwt from "jsonwebtoken";
import "dotenv/config";

const generarJWT = async (userName, userEmail) => {
  try {
    const payload = { userName, userEmail };
    const token = await jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    console.error("Error al generar el token:", error.message);
    throw new Error("No se pudo generar el token");
  }
};

export default generarJWT;
