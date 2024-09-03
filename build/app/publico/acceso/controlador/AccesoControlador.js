"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccesoDAO_1 = __importDefault(require("../dao/AccesoDAO"));
class AccesoControlador extends AccesoDAO_1.default {
    iniciarSesion(req, res) {
        const correoAcceso = req.body.correoAcceso;
        const claveAcceso = req.body.claveAcceso;
        AccesoControlador.sesion(correoAcceso, claveAcceso, res);
    }
} // end class
const accesoControlador = new AccesoControlador();
exports.default = accesoControlador;
