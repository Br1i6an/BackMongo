"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ciudad {
    constructor(cod, nom, pub, pri, est, base) {
        this.codCiudad = cod;
        this.nombreCiudad = nom;
        this.publicoFotoCiudad = pub;
        this.privadoFotoCiudad = pri;
        this.estadoCiudad = est;
        this.base64Ciudad = base;
    }
}
exports.default = Ciudad;
