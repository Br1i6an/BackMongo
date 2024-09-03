"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductoDAO_1 = __importDefault(require("../dao/ProductoDAO"));
class ProductoControlador extends ProductoDAO_1.default {
    obtenerProducto(req, res) {
        ProductoControlador.consultarProducto(req.params.codProducto, res);
    }
    obtenerProductos(req, res) {
        ProductoControlador.consultar(res);
    }
    obtenerProductosPaginar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = ((paginaActual - 1) * cantidadMostrar);
        const parametros = [valorRegistro, cantidadMostrar];
        ProductoControlador.productosPaginar(parametros, res);
    }
    crearProducto(req, res) {
        ProductoControlador.agregarProducto(res, req.body);
    }
    editarProducto(req, res) {
        ProductoControlador.actualizarProducto(res, req.body.codProducto, req.body);
    }
    editarFotoProducto(req, res) {
        ProductoControlador.actualizarFotoProducto(res, req.body.codProducto, req.body);
    }
    eliminarProducto(req, res) {
        ProductoControlador.borrarProducto(res, req.params.codProducto);
    }
}
const productoControlador = new ProductoControlador();
exports.default = productoControlador;
