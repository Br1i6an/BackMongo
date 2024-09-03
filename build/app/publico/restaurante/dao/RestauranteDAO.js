"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RestauranteEsquema_1 = __importDefault(require("../../../compartido/esquema/RestauranteEsquema"));
class RestauranteDAO {
    static consultar(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantes = yield RestauranteEsquema_1.default.find().populate({ path: "codCiudad" });
            res.status(200).json(restaurantes);
        });
    }
    static consultarXCiudad(idCiudad, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(idCiudad)) {
                const llave = { _id: idCiudad };
                RestauranteEsquema_1.default.find({ codCiudad: llave })
                    .populate({ path: "codCiudad" })
                    .then((respuesta) => {
                    res.status(200).json(respuesta);
                }).catch((miErrosito) => {
                    console.log(miErrosito);
                    res.status(400).json({ mensaje: "Fallo al consultar los restaurantes" });
                });
            }
            else {
                res.status(400).json({ mensaje: "Indentificador no valido" });
            }
        });
    }
}
exports.default = RestauranteDAO;
