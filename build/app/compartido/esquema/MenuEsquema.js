"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MenuEsquema = new mongoose_1.Schema({
    nombreMenu: { type: String, required: true },
    codRestaurante: { type: mongoose_1.Types.ObjectId, ref: "Ciudad", required: true },
    productosMenu: [{ type: mongoose_1.Types.ObjectId, ref: "Producto", required: true }],
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)("Menu", MenuEsquema, "Menu");
