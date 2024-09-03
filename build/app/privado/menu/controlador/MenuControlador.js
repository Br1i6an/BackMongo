"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuDAO_1 = __importDefault(require("../dao/MenuDAO"));
class MenuControlador extends MenuDAO_1.default {
    obtenerMenus(req, res) {
        MenuControlador.consultar(res);
    }
    obtenerMenu(req, res) {
        MenuControlador.consultarMenu(req.params.codigo, res);
    }
}
const menuControlador = new MenuControlador();
exports.default = menuControlador;
