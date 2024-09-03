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
const Producto_1 = __importDefault(require("../../../compartido/entidad/Producto"));
const ProductoEsquema_1 = __importDefault(require("../../../compartido/esquema/ProductoEsquema"));
const ProductoControladorVerficar_1 = __importDefault(require("../controlador/ProductoControladorVerficar"));
const nanoid_1 = require("nanoid");
class ProductoDAO {
    static consultar(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductoEsquema_1.default.find().then((productos) => {
                const arregloProductos = [];
                productos.map((objProducto) => {
                    const base64 = ProductoControladorVerficar_1.default.obtenerBase64(objProducto.privadoFotoProducto, 300);
                    arregloProductos.push(new Producto_1.default(objProducto._id, objProducto.nombreProducto, objProducto.detalleProducto, objProducto.valorProducto, objProducto.publicoFotoProducto, "", base64));
                });
                res.status(200).json(arregloProductos);
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Fallo al consultar los Productos" });
            });
        });
    }
    static productosPaginar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductoEsquema_1.default.find().skip(parametros[0]).limit(parametros[1])
                .then((productos) => {
                const arregloProductos = [];
                productos.map((objProducto) => {
                    const base64 = ProductoControladorVerficar_1.default.obtenerBase64(objProducto.privadoFotoProducto, 300);
                    arregloProductos.push(new Producto_1.default(objProducto._id, objProducto.nombreProducto, objProducto.detalleProducto, objProducto.valorProducto, objProducto.publicoFotoProducto, "", base64));
                });
                res.status(200).json(arregloProductos);
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Fallo al consultar los Productos" });
            });
        });
    }
    static consultarProducto(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                yield ProductoEsquema_1.default.findById(identificador)
                    .then((respuesta) => {
                    const base64 = ProductoControladorVerficar_1.default.obtenerBase64(respuesta.privadoFotoProducto, 300);
                    const objProducto = new Producto_1.default(respuesta._id, respuesta.nombreProducto, respuesta.detalleProducto, respuesta.valorProducto, respuesta.publicoFotoProducto, "", base64);
                    res.status(200).json(objProducto);
                }).catch((miError) => {
                    console.log(miError);
                    res.status(400).json({ respuesta: "fallo al consultar el producto" });
                });
            }
            else {
                res.status(400).json({ mensaje: "Indentificador no valido" });
            }
        });
    }
    static agregarProducto(res, parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            const privadoProducto = 'IMG_PROD_' + (0, nanoid_1.nanoid)(20) + "." + parametros.publicoFotoProducto.split('.')[1];
            ProductoControladorVerficar_1.default.construirBase64(privadoProducto, parametros.base64Producto);
            parametros.privadoFotoProducto = privadoProducto;
            const nuevoProducto = new ProductoEsquema_1.default(parametros);
            nuevoProducto.save()
                .then((objProducto) => {
                res.status(200).json({
                    "Mensaje": "Producto creado",
                    "objeto": objProducto
                });
            }).catch((miErrorsito) => {
                console.log(miErrorsito);
                res.status(400).json({ "respuesta": "Fallo al crear tu Producto" });
            });
        });
    }
    static actualizarProducto(res, identificador, parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                const existe = yield ProductoEsquema_1.default.findById(identificador).exec();
                if (existe) {
                    parametros.privadoFotoProducto = existe.privadoFotoProducto;
                    // parametros.publicoFotoProducto = existe.publicoFotoProducto;
                    yield ProductoEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: parametros })
                        .then((objeto) => {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    }).catch((miErrosito) => {
                        console.log(miErrosito);
                        res.status(400).json({ respuesta: "Error al actualizar el  Producto, verificar la información" });
                    });
                }
                else {
                    res.status(400).json({ respuesta: "el producto para editar no existe" });
                }
            }
            else {
                res.status(400).json({ mensaje: "Indentificador no valido" });
            }
        });
    }
    static actualizarFotoProducto(res, identificador, parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                const objProducto = yield ProductoEsquema_1.default.findById(identificador).exec();
                if (objProducto) {
                    ProductoControladorVerficar_1.default.borrarImagen(objProducto.privadoFotoProducto);
                    const privadoProducto = 'IMG_PROD_' + (0, nanoid_1.nanoid)(20) + "." + parametros.publicoFotoProducto.split('.')[1];
                    ProductoControladorVerficar_1.default.construirBase64(privadoProducto, parametros.base64Producto);
                    parametros.privadoFotoProducto = privadoProducto;
                    yield ProductoEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: parametros })
                        .then((objeto) => {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    })
                        .catch((miErrosito) => {
                        console.log(miErrosito);
                        res.status(400).json({ respuesta: "Error al actualizar la foto del producto" });
                    });
                }
                else {
                    res.status(400).json({ respuesta: "fallo al cambiar la foto del producto" });
                }
            }
            else {
                res.status(400).json({ mensaje: "Indentificador no valido" });
            }
        });
    }
    static borrarProducto(res, identificador) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield ProductoEsquema_1.default.findById(identificador).exec();
            if (existe) {
                ProductoControladorVerficar_1.default.borrarImagen(existe.privadoFotoProducto);
                ProductoEsquema_1.default.findByIdAndDelete(identificador)
                    .then((objeto) => {
                    res.status(200).json({ eliminado: objeto });
                }).catch((miErrorsito) => {
                    console.log(miErrorsito);
                    res.status(400).json({ respuesta: "Error al eliminar el  Producto" });
                });
            }
            else {
                res.status(400).json({ respuesta: "el producto no existe" });
            }
        });
    }
}
exports.default = ProductoDAO;
