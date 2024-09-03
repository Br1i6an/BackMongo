"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CiudadEsquema = new mongoose_1.Schema({
    nombreCiudad: { type: String, required: true, unique: true },
    publicoFotoCiudad: { type: String, required: true },
    privadoFotoCiudad: { type: String, required: true },
    estadoCiudad: { type: Number, required: true, default: 1 }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Ciudad", CiudadEsquema, "Ciudad");
