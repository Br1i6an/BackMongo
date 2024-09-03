"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CiudadDAO_1 = __importDefault(require("../dao/CiudadDAO"));
class CiudadControlador extends CiudadDAO_1.default {
    obtenerCiudades(req, res) {
        CiudadControlador.consultar(res);
    }
}
const ciudadControlador = new CiudadControlador();
exports.default = ciudadControlador;
