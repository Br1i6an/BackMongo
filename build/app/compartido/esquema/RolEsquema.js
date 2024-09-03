"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RolEsquema = new mongoose_1.Schema({
    nombreRol: { type: String, required: true, unique: true },
    estadoRol: { type: Number, required: true, default: 1 }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)("Rol", RolEsquema, "Rol");
