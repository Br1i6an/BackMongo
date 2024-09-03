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
const AccesoEsquema_1 = __importDefault(require("../../acceso/esquema/AccesoEsquema"));
const RolEsquema_1 = __importDefault(require("../../../compartido/esquema/RolEsquema"));
const RegistroControladorVerificar_1 = __importDefault(require("../controlador/RegistroControladorVerificar"));
const UsuarioEsquema_1 = __importDefault(require("../../../compartido/esquema/UsuarioEsquema"));
const Acceso_1 = __importDefault(require("../../acceso/entidad/Acceso"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CiudadEsquema_1 = __importDefault(require("../../../compartido/esquema/CiudadEsquema"));
class RegistroDAO {
    static registrar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificarCorreo = yield AccesoEsquema_1.default.findOne({ correoAcceso: parametros.correoAcceso });
            if (verificarCorreo == null) {
                const rol = yield RolEsquema_1.default.findOne({ nombreRol: "Invitado" });
                const ciudad = yield CiudadEsquema_1.default.findOne({ nombreCiudad: "BOGOTÁ, D.C." });
                const usuRegistro = RegistroControladorVerificar_1.default.usuarioRegisto(parametros, ciudad, rol);
                const nuevoUsuario = new UsuarioEsquema_1.default(usuRegistro);
                yield nuevoUsuario.save();
                const claveCifrada = bcryptjs_1.default.hashSync(parametros.claveAcceso);
                const nuevoAcceso = new AccesoEsquema_1.default(new Acceso_1.default(parametros.correoAcceso, claveCifrada, nuevoUsuario));
                nuevoAcceso.save()
                    .then((respuesta) => {
                    const respuestaRegistro = RegistroControladorVerificar_1.default.procesarRespuesta(respuesta.codUsuario, respuesta.correoAcceso);
                    res.status(200).json(respuestaRegistro);
                })
                    .catch((miError) => {
                    console.log(miError);
                    res.status(400).json({ respuesta: "Fallo al registrar el usuario" });
                });
            }
            else {
                res.status(400).json({ respuesta: "Correo ya registrado" });
            }
        });
    }
}
exports.default = RegistroDAO;
