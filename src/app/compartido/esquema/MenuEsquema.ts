import { model, Schema, Types } from "mongoose";
import Menu from "../entidad/Menu";

const MenuEsquema = new Schema<Menu>(
    {
        nombreMenu: { type: String, required: true },
        codRestaurante: { type: Types.ObjectId, ref: "Ciudad", required: true },
        productosMenu: [{ type: Types.ObjectId, ref: "Producto", required: true }],
    },
    {
        versionKey: false
    }

);

export default model("Menu", MenuEsquema, "Menu");