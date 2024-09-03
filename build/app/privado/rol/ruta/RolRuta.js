"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RolControlador_1 = __importDefault(require("../controlador/RolControlador"));
class RolRuta {
    constructor() {
        this.apiRutaRol = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaRol.get("/all", RolControlador_1.default.obtenerRoles);
        this.apiRutaRol.get("/one/:codigo", RolControlador_1.default.obtenerRol);
        this.apiRutaRol.post("/add", RolControlador_1.default.crearRol);
        this.apiRutaRol.put("/update", RolControlador_1.default.editarRol);
        this.apiRutaRol.delete("/delete/:codigo", RolControlador_1.default.eliminarRol);
    }
}
const rolRuta = new RolRuta();
exports.default = rolRuta.apiRutaRol;
