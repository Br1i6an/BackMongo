"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccesoControlador_1 = __importDefault(require("../controlador/AccesoControlador"));
class AccesoRuta {
    constructor() {
        this.rutaAccesoAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAccesoAPI.post("/singin", AccesoControlador_1.default.iniciarSesion);
    }
} // End class
const accesoRuta = new AccesoRuta();
exports.default = accesoRuta.rutaAccesoAPI;
