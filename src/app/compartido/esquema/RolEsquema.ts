import { model, Schema } from "mongoose";
import Rol from "../entidad/Rol";

const RolEsquema = new Schema<Rol>(
    {
        nombreRol: { type: String, required: true, unique: true },
        estadoRol: { type: Number, required: true, default: 1 }
    },
    {
        versionKey: false
    }
);

export default model("Rol", RolEsquema, "Rol");