import { model, Schema, Types } from "mongoose";
import Restaurante from "../entidad/Restaurante";

const RestauranteEsquema = new Schema<Restaurante>(
    {
        nombreRestaurante: { type: String, required: true, unique: true },
        direccionRestaurante: { type: String, required: true },
        telefonoRestaurante: { type: String, required: true },
        horarioRestaurante: { type: String, required: true },
        detalleRestaurante: { type: String, required: false, default: null },
        estadoRestaurante: { type: Number, required: true, default: 1 },
        codCiudad: { type: Types.ObjectId, ref: "Ciudad", required: true }
    },
    { versionKey: false }
);

export default model("Restaurante", RestauranteEsquema, "Restaurante");