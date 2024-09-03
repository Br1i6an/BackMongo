import { model, Schema } from "mongoose";
import Ciudad from "../entidad/Ciudad";

const CiudadEsquema = new Schema<Ciudad>(
    {
        nombreCiudad: { type: String, required: true, unique: true },
        publicoFotoCiudad: { type: String, required: true },
        privadoFotoCiudad: { type: String, required: true },
        estadoCiudad: { type: Number, required: true, default: 1 }
    },
    { versionKey: false }
);

export default model("Ciudad", CiudadEsquema, "Ciudad");    