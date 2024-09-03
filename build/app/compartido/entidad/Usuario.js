"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nom, ape, doc, tip, dir, tel, est, rol, ciu) {
        this.nombresUsuario = nom;
        this.apellidosUsuario = ape;
        this.documentoUsuario = doc;
        this.tipoDocumentoUsuario = tip;
        this.telefonoUsuario = tel;
        this.direccionUsuario = dir;
        this.estadoUsuario = est;
        this.codRol = rol;
        this.codCiudad = ciu;
    }
}
exports.default = Usuario;
