"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoEsquema = new mongoose_1.Schema({
    nombreProducto: { type: String, required: true, unique: true },
    valorProducto: { type: Number, required: true },
    detalleProducto: { type: String, required: true },
    publicoFotoProducto: { type: String, required: true },
    privadoFotoProducto: { type: String, required: true }
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Producto", ProductoEsquema, "Producto");
