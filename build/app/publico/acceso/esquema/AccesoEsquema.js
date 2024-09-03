"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AccesoEsquema = new mongoose_1.Schema({
    correoAcceso: { type: String, required: true, unique: true },
    claveAcceso: { type: String, required: true },
    codUsuario: { type: mongoose_1.Types.ObjectId, ref: "Usuario", required: true }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)("Acceso", AccesoEsquema, "Acceso");
