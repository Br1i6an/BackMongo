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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AccesoEsquema_1 = __importDefault(require("../esquema/AccesoEsquema"));
const UsuarioEsquema_1 = __importDefault(require("../../../compartido/esquema/UsuarioEsquema"));
const AccesoVerificarControlador_1 = __importDefault(require("../controlador/AccesoVerificarControlador"));
class AccesoDAO {
    static sesion(correo, clave, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const objAcceso = yield AccesoEsquema_1.default.findOne({ correoAcceso: correo });
            if (objAcceso != null) {
                const verificarClave = bcryptjs_1.default.compareSync(clave, objAcceso.claveAcceso);
                if (verificarClave) {
                    const usuario = yield UsuarioEsquema_1.default.findById(objAcceso.codUsuario)
                        .populate({ path: "codRol", select: "nombreRol" })
                        .populate({ path: "codCiudad", select: "nombreCiudad" });
                    const respuesta = AccesoVerificarControlador_1.default.procesarRespuesta(usuario, objAcceso.correoAcceso);
                    res.status(200).json(respuesta);
                }
                else {
                    res.status(401).json({ mensaje: "Contraseña no valida " });
                }
            }
            else {
                res.status(401).json({ mensaje: "Correo Eléctronico no valido " });
            }
        });
    }
}
exports.default = AccesoDAO;
