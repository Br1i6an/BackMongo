"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductoControlador_1 = __importDefault(require("../controlador/ProductoControlador"));
class ProductoRuta {
    constructor() {
        this.apiRutaProducto = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaProducto.get("/all", ProductoControlador_1.default.obtenerProductos);
    }
}
const productoRuta = new ProductoRuta();
exports.default = productoRuta.apiRutaProducto;
