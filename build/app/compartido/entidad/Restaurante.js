"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Restaurante {
    constructor(nom, dir, tel, hor, des, est, codC) {
        this.nombreRestaurante = nom;
        this.direccionRestaurante = dir;
        this.telefonoRestaurante = tel;
        this.horarioRestaurante = hor;
        this.detalleRestaurante = des;
        this.estadoRestaurante = est;
        this.codCiudad = codC;
    }
}
exports.default = Restaurante;
