"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RestauranteControlador_1 = __importDefault(require("../controlador/RestauranteControlador"));
class RestauranteRuta {
    constructor() {
        this.apiRutaRestaurante = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaRestaurante.get("/all", RestauranteControlador_1.default.obtenerRestaurantes);
        this.apiRutaRestaurante.get("/city/:codigo", RestauranteControlador_1.default.obtenerRestauranteCiudad);
    }
}
const restauranteRuta = new RestauranteRuta();
exports.default = restauranteRuta.apiRutaRestaurante;
