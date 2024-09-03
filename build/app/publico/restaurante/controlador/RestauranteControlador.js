"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RestauranteDAO_1 = __importDefault(require("../dao/RestauranteDAO"));
class RestauranteControlador extends RestauranteDAO_1.default {
    obtenerRestaurantes(req, res) {
        RestauranteControlador.consultar(res);
    }
    obtenerRestauranteCiudad(req, res) {
        RestauranteControlador.consultarXCiudad(req.params.codigo, res);
    }
}
const restauranteControlador = new RestauranteControlador();
exports.default = restauranteControlador;
