"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductoDAO_1 = __importDefault(require("../dao/ProductoDAO"));
class ProductoControlador extends ProductoDAO_1.default {
    obtenerProductos(req, res) {
        ProductoControlador.consultarProductos(res);
    }
}
const productoControlador = new ProductoControlador();
exports.default = productoControlador;
