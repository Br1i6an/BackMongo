"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RolDAO_1 = __importDefault(require("../dao/RolDAO"));
class RolControlador extends RolDAO_1.default {
    obtenerRoles(req, res) {
        RolControlador.consultar(res);
    }
    obtenerRol(req, res) {
        RolControlador.consultarRol(req.params.codigo, res);
    }
    crearRol(req, res) {
        RolControlador.agregarRol(res, req.body);
    }
    editarRol(req, res) {
        RolControlador.actualizar(res, req.body.codRol, req.body);
    }
    eliminarRol(req, res) {
        RolControlador.borrar(res, req.params.codigo);
    }
}
const rolControlador = new RolControlador();
exports.default = rolControlador;
