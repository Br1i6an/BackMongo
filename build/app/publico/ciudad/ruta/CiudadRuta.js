"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CiudadControlador_1 = __importDefault(require("../controlador/CiudadControlador"));
class CiudadRuta {
    constructor() {
        this.apiRutaCiudad = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaCiudad.get("/all", CiudadControlador_1.default.obtenerCiudades);
    }
}
const ciudadRuta = new CiudadRuta();
exports.default = ciudadRuta.apiRutaCiudad;
