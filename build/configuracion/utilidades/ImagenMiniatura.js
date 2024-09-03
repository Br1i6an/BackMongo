"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
class ImagenMinuatura {
    static crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamano) {
        let esperar = true;
        const dataSharp = (0, sharp_1.default)(rutaImagenPrivada).resize({ width: tamano })
            .toFile(imagenMiniatura, (err) => { if (err) { }
        else {
            esperar = false;
        } });
        while (esperar) {
            require('deasync').sleep(200);
        }
        return dataSharp;
    }
}
exports.default = ImagenMinuatura;
