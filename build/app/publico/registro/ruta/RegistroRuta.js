"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegistroControlador_1 = __importDefault(require("../controlador/RegistroControlador"));
class RegistroRuta {
    constructor() {
        this.rutaRegistroAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaRegistroAPI.post("/user", RegistroControlador_1.default.registrarUsuario);
    }
} // End class
const registroRuta = new RegistroRuta();
exports.default = registroRuta.rutaRegistroAPI;
