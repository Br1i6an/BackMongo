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
const UsuarioEsquema_1 = __importDefault(require("../../../compartido/esquema/UsuarioEsquema"));
const RolEsquema_1 = __importDefault(require("../../../compartido/esquema/RolEsquema"));
const mongoose_1 = require("mongoose");
const Rol_1 = __importDefault(require("../../../compartido/entidad/Rol"));
class RolDAO {
    static consultar(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield RolEsquema_1.default.find();
            const arrRol = [];
            roles.map((rol) => __awaiter(this, void 0, void 0, function* () {
                arrRol.push(new Rol_1.default(rol._id, rol.nombreRol, rol.estadoRol));
            }));
            res.status(200).json(arrRol);
        });
    }
    static consultarRol(codigoRol, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(codigoRol)) {
                yield RolEsquema_1.default.findById(codigoRol)
                    .then((respuesta) => {
                    res.status(200).json(new Rol_1.default(respuesta._id, respuesta.nombreRol, respuesta.estadoRol));
                })
                    .catch((err) => {
                    res.status(400).json({ mensaje: "Fallo al consultar el Rol" });
                });
            }
            else {
                res.status(400).json({ mensaje: "Indentificador no valido" });
            }
        });
    }
    static agregarRol(res, parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros.datosUsuario;
            const nuevoRol = new RolEsquema_1.default(parametros);
            nuevoRol.save()
                .then((objRol) => {
                res.status(200).json({
                    "Mensaje": "Rol creado",
                    "objeto": objRol
                });
            }).catch((miErrorsito) => {
                console.log(miErrorsito);
                res.status(400).json({ "respuesta": "Fallo el rol" });
            });
        });
    }
    static actualizar(res, identificador, parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            const existe = yield RolEsquema_1.default.findById(identificador).exec();
            if (existe) {
                yield RolEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: parametros })
                    .then((objeto) => {
                    res.status(200).json({ antiguo: objeto, nuevo: parametros });
                }).catch((miErrosito) => {
                    console.log(miErrosito);
                    res.status(400).json({ respuesta: "Error al actualizar el  Rol" });
                });
            }
            else {
                res.status(400).json({ respuesta: "el Rol que desea editar no existe" });
            }
        });
    }
    static borrar(res, identificador) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield RolEsquema_1.default.findById(identificador).exec();
            if (existe) {
                const llave = { _id: identificador };
                const cantidad = yield UsuarioEsquema_1.default.find({ codRol: llave }).count();
                if (cantidad == 0) {
                    RolEsquema_1.default.findByIdAndDelete(identificador)
                        .then((objeto) => {
                        res.status(200).json({ eliminado: objeto });
                    }).catch((miErrorsito) => {
                        console.log(miErrorsito);
                        res.status(400).json({ respuesta: "Error al eliminar el  Rol" });
                    });
                }
                else {
                    res.status(400).json({ respuesta: "el Rol con Usuarios" });
                }
            }
            else {
                res.status(400).json({ respuesta: "el Rol no existe" });
            }
        });
    }
}
exports.default = RolDAO;
