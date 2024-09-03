import { Schema, Types, model } from "mongoose";
import Acceso from "../entidad/Acceso";


const AccesoEsquema = new Schema<Acceso>(
    {
        correoAcceso: { type: String, required: true, unique: true },
        claveAcceso: { type: String, required: true },
        codUsuario: { type: Types.ObjectId, ref: "Usuario", required: true }
    },
    {
        versionKey: false
    }
)

export default model("Acceso", AccesoEsquema, "Acceso");