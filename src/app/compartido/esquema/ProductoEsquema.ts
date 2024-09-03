import { model, Schema } from "mongoose";
import Producto from "../entidad/Producto";

const ProductoEsquema = new Schema<Producto>(
  {
    nombreProducto: { type: String, required: true, unique: true },
    valorProducto: { type: Number, required: true },
    detalleProducto: { type: String, required: true },
    publicoFotoProducto: { type: String, required: true },
    privadoFotoProducto: { type: String, required: true }
  },
  {
    versionKey: false,
  }
);

export default model("Producto", ProductoEsquema, "Producto");
