"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MenuControlador_1 = __importDefault(require("../controlador/MenuControlador"));
class MenuRuta {
    constructor() {
        this.apiRutaMenu = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaMenu.get("/all", MenuControlador_1.default.obtenerMenus);
        this.apiRutaMenu.get("/one/:codigo", MenuControlador_1.default.obtenerMenu);
    }
}
const menuRuta = new MenuRuta();
exports.default = menuRuta.apiRutaMenu;
