"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("./Usuario"));
class Imagen {
    constructor(nomPu, nomPri, tam, codUsu) {
        this.nombrePublicoImagen = nomPu;
        this.nombrePrivadoImagen = nomPri;
        this.tamanoImagen = tam;
        this.codUsuario = codUsu;
    }
}
exports.default = Usuario_1.default;
