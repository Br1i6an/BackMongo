"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegistroDAO_1 = __importDefault(require("../dao/RegistroDAO"));
class RegistroControlador extends RegistroDAO_1.default {
    registrarUsuario(req, res) {
        const usuarioCrear = req.body;
        RegistroControlador.registrar(usuarioCrear, res);
    }
} // end class
const registroControlador = new RegistroControlador();
exports.default = registroControlador;
