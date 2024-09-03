"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producto {
    constructor(codP, nom, det, val, pub, priv, base) {
        this.codProducto = codP;
        this.nombreProducto = nom;
        this.detalleProducto = det;
        this.valorProducto = val;
        this.publicoFotoProducto = pub;
        this.privadoFotoProducto = priv;
        this.base64Producto = base;
    }
}
exports.default = Producto;
