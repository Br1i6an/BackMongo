"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioEsquema = new mongoose_1.Schema({
    nombresUsuario: { type: String, required: true },
    apellidosUsuario: { type: String, required: true },
    documentoUsuario: { type: String, required: true, unique: true },
    tipoDocumentoUsuario: { type: Number, required: true },
    telefonoUsuario: { type: String, required: true },
    direccionUsuario: { type: String, required: true },
    estadoUsuario: { type: Number, required: true, default: 2 },
    codCiudad: { type: mongoose_1.Types.ObjectId, ref: "Ciudad", required: true },
    codRol: { type: mongoose_1.Types.ObjectId, ref: "Rol", required: true },
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)("Usuario", UsuarioEsquema, "Usuario");
