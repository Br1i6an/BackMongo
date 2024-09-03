"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RestauranteEsquema = new mongoose_1.Schema({
    nombreRestaurante: { type: String, required: true, unique: true },
    direccionRestaurante: { type: String, required: true },
    telefonoRestaurante: { type: String, required: true },
    horarioRestaurante: { type: String, required: true },
    detalleRestaurante: { type: String, required: false, default: null },
    estadoRestaurante: { type: Number, required: true, default: 1 },
    codCiudad: { type: mongoose_1.Types.ObjectId, ref: "Ciudad", required: true }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Restaurante", RestauranteEsquema, "Restaurante");
